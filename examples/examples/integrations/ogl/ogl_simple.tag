<!import * as ogl from 'ogl.esm.js'>

<!state>
    slow: false

<!class>
    connected() {
        const { Renderer, Camera, Transform, Box, Program, Mesh } = ogl;

        const renderer = new Renderer();
        const gl = renderer.gl;
        this.document.appendChild(gl.canvas);

        const camera = new Camera(gl);
        camera.position.z = 5;

        const resize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({
                aspect: gl.canvas.width / gl.canvas.height,
            });
        }

        this.on('resize', resize);
        resize();

        const scene = new Transform();

        const geometry = new Box(gl);

        const program = new Program(gl, {
        vertex: /* glsl */ `
            attribute vec3 position;

            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;

            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragment: /* glsl */ `
            void main() {
                gl_FragColor = vec4(1.0);
            }
        `,
        });

       const mesh = new Mesh(gl, { geometry, program });
       mesh.setParent(scene);

       function update(t) {
           requestAnimationFrame(update);

           mesh.rotation.y -= 0.04;
           mesh.rotation.x += 0.03;

           renderer.render({ scene, camera });
       }

       requestAnimationFrame(update);
    }

<!style>
    :host {
        position:absolute;
        top:0;
        left:0;
    }
