<!import GPU from gpu-browser.esm.js>

<canvas id="canvas" width="600" height="600"/>



<!class>

    connected() {
        const canvas = this.$('#canvas');
        this.gpu = new GPU({ canvas });

        const width = 600;

        this.kernel = this.gpu.createKernel(function(x) {
            this.color(
                (x * (this.thread.y + this.thread.x)) / 1024.0,
                (x * (this.thread.y * this.thread.x)) / (1024.0 * 1024.0),
                (x * (this.thread.y * 2 * this.thread.x)) / (1024.0 * 2),
                1
            );
        },
        {
            output: [512, 512],
            graphical: true
        });

        let param = 0.0;
        let fpsTime = performance.now();

        const render = () => {
            this.kernel(param);
            param += 0.001;
            this.frameId = requestAnimationFrame(render);
        };

        this.frameId = requestAnimationFrame(render);
    }

    disconnected(){
        window.cancelAnimationFrame(this.frameId);
        this.kernel.destroy();
        this.gpu.destroy();
    }
