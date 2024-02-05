<!import GPU from gpu-browser.esm.js>

<canvas id="canvas" width="600" height="600"/>

<p>Based on <a href="https://github.com/rythta/paraplot" target="_blank">https://github.com/rythta/paraplot</a></p>

<!class>

    connected() {
        const canvas = this.$('#canvas');
        const context = canvas.getContext("2d");
        const gpu = new GPU();


        var i = 4.6;
        var j = -0.5;
        var l = 0;

        const gen_torus = gpu.createKernel(function(width, height, i, j, l) {
            var space = height / 6;

            if (width < height) space = width / 6;

            var t = this.thread.x/50;

            var x = space*((1+Math.pow(Math.sin(t/i+l),2))*cos(t)+cos(j*t+.75-l));
            var y = space*((1+Math.pow(Math.sin(t/i+l),2))*sin(t)+sin(j*t+.75+l));

            x += (width/2);
            y += (height/2);

            return 4*(Math.trunc(x)+Math.trunc(y)*width);
        })
        .setOutput([10000]);


        const frame = () => {
            const imageData = context.createImageData(canvas.width, canvas.height);

            var torus = gen_torus(canvas.width, canvas.height, i, j, l);

            for (var location = 0; location < torus.length; location++)
        	   imageData.data.set([50, 0, 0, 225], torus[location]);

            j += 0;
            l += 0.003;

            context.putImageData(imageData, 0, 0);
            this.frameId = requestAnimationFrame(frame);
        }

        this.frameId = requestAnimationFrame(frame);

    }

    disconnected(){
        cancelAnimationFrame(this.frameId);
    }
