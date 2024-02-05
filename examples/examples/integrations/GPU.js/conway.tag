<!import GPU from gpu-browser.esm.js>

<canvas id="canvas" width="600" height="600"></canvas>

<p>Based on <a href="https://observablehq.com/@brakdag/conway-game-of-life-gpu-js" target="_blank">https://observablehq.com/@brakdag/conway-game-of-life-gpu-js</a></p>


<!static>

    class Gameoflife {
        constructor(canvas, dim) {
            const gpu = new GPU({
                canvas,
                mode: 'gpu'
            });
            this.dim = dim;
            const opts = {
                useLegacyEncoder: true,
                output: [dim, dim],
                graphical: true
            };

            this.inicio = gpu.createKernel(function() {
                var val = Math.trunc(Math.random()*2);
                this.color(val,val,val);
            }, opts);


            this.kernel = gpu.createKernel(function(m, s) {
                var sum = 0;
                var h = this.thread.x
                var k =  s - 1 - this.thread.y
                var index = h * 4 + k * 4 * s
                var status=m[index] != 0 ? 1: 0;
                for(var j=-1; j<=1; j++){
                    for(var i=-1; i<=1; i++){
                        var x = (h + i + s) % s;
                        var y = (k + j + s) % s;
                        sum += m[x * 4 + y * 4 * s] != 0 ? 1 : 0;
                    }
                }
                sum -= status;
                var val = 0;
                if (status == 1 && (sum == 3 || sum == 2)) val = 1;
                if (status == 1 && (sum < 2  || sum > 3))  val = 0;
                if (status == 0 && sum == 3)               val = 1;
                this.color(val, val, val);
            }, opts);

            this.grid    = this.makegrid(dim, dim);
            this.newgrid = this.makeemptygrid(dim, dim);

            this.inicio();
            this.pixels = this.inicio.getPixels();
        }

        next(){
            this.kernel(this.pixels, this.dim);
            this.pixels = this.kernel.getPixels();
        }

        draw(){
            this.next();
        }

        makeemptygrid(cols, rows){
            var grid = new Array(cols);
            for(var i = 0; i < cols; i++)
                grid[i] = (new Array(rows)).fill(0);
            return grid;
        }


        makegrid(cols, rows){
            var grid = new Array(cols);
            for(var i = 0; i < cols; i++)
                grid[i] = (new Array(rows)).fill(0).map(a=>Math.trunc(Math.random()*2));
            return grid;
        }
    }

<!class>

connected() {
    const GOL = new Gameoflife(this.$('#canvas'), 500);


    const tick = () => {
        GOL.draw();
        this.frameId = requestAnimationFrame(tick);
    };

    tick();

}

disconnected(){
    cancelAnimationFrame(this.frameId);
}
