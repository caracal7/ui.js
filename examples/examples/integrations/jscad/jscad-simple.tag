<!import demo from jscad-example.js>

<!tag @jscad jscad.tag>


<@jscad id='jscad' @ready/>



<!state>
    example: ''

<!class>
    ready() {
        const jscad = this.$('#jscad');

        const source = demo.toString();
        this.state.example = source.substring(source.indexOf('{')+1, source.lastIndexOf('}'));
        this.render();

        jscad.updateSource(this.state.example, { scale: 1 });

        // some live animation example

        const camera = jscad.renderOptions.camera;
        let tick = 0;
        const updateAndRender = () => {
            tick += 0.01;
            camera.position[0] = Math.cos(tick) * 800;
            jscad.perspectiveCamera.update(camera, camera);
            jscad.renderer(jscad.renderOptions);
            window.requestAnimationFrame(updateAndRender)
        }
        window.requestAnimationFrame(updateAndRender)
    }
