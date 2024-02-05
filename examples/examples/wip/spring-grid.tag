
Time step (DT) :
<input type="range" value=state.DT min="0.01" max="0.4" step="0.01"><br>

Damping ratio (DAMPING) :
<input type="range" value=state.DAMPING min="0.8" max="1.0" step="0.01"><br>

Delta of influence (DELTA) :
<input type="range" value=state.DELTA min="5" max="100" step="1"><br>

Spring constant k of the grid (KGrid) :
<input type="range" value=state.KGrid min="2" max="25" step="0.1"><br>

Spring constant k of the click (KClick) :
<input type="range" value=state.KClick min="2" max="25" step="0.1"><br>

<canvas id="canvas" width="800" height="800"></canvas>

<!state>
    DT: 0.1,
    DAMPING: 0.55,
    DELTA: 70,
    KGrid: 10.0,
    KClick: 15.0,

<!class>

    connected() {
        this.canvas = this.document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");


        /**************************************************
         * Spring grid distortion by Etienne Jacob, 2018
         * ************************************************/

        var N = 50;
        var SP = 20;
        var EPS = 0.00000001;

        var canvas = this.canvas;
        var ctx = this.context;
        var _width = canvas.width;
        var _height = canvas.height;

        var isMouseDown = false;
        var mouseXY = {x:0, y:0};

        //const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

        // linearly maps value from the range (a..b) to (c..d)
        const mapRange = (value, a, b, c, d) => c + (value - a) / (b - a) * (d - c);

        function spring_force(ax, ay, bx, by, k) {
            var xx = ax - bx;
            var yy = ay - by;
            var d = Math.hypot(-xx, -yy);    //var d = distance(xx, yy, 0, 0);
            var nx = xx / (d + EPS);
            var ny = yy / (d + EPS);
            var f = k * d;
            var x = f * nx;
            var y = f * ny;
            return {
                x,
                y,
            };
        }


        class Dot{
            constructor(i, j){
                this.vx = 0;
                this.vy = 0;

                this.x = mapRange(i, 0, N-1, SP, _width - SP);
                this.y = mapRange(j, 0, N-1, SP, _height - SP);

                this.x0 = this.x;
                this.y0 = this.y;
            }

            update(DT, DAMPING, DELTA, KGrid, KClick){
                let res = {
                    x: 0,
                    y: 0
                };

                let F = spring_force(this.x0, this.y0, this.x, this.y, KGrid)
                res.x += F.x;
                res.y += F.y;

                if(isMouseDown){
                    let d = Math.hypot(this.x - mouseXY.x, this.y - mouseXY.y);
                    //let d = distance(mouseXY.x, mouseXY.y, this.x, this.y);
                    let delta = DELTA;

                    let intensity = KClick * Math.exp(-d * d / (delta * delta));
                    //float interp = 15*exp(-d/delta);
                    let F = spring_force(mouseXY.x, mouseXY.y, this.x, this.y, intensity);
                    res.x += F.x;
                    res.y += F.y;
                }

                this.vx += DT * res.x;
                this.vy += DT * res.y;

                this.vx *= DAMPING;
                this.vy *= DAMPING;

                this.x += DT * this.vx;
                this.y += DT * this.vy;
            }
        }

        var array;

        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: (evt.clientX - rect.left) / (rect.right - rect.left) * _width,
                y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * _height
            };
        }

        function setup() {

            window.addEventListener('mousemove', e => mouseXY = getMousePos(canvas, e), false);
            document.addEventListener('mousedown', e => e.which && (isMouseDown = true), true);
            document.addEventListener('mouseup', e => e.which && (isMouseDown = false), true);

            array = new Array(N);
            for(let i = 0; i < N; i++) array[i] = new Array(N);

            for(let i = 0 ; i < N; i++)
                for(let j = 0; j < N; j++)
                    array[i][j] = new Dot(i, j);

        }

        function draw_connection(d1, d2){
            ctx.beginPath();
            ctx.moveTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.stroke();
        }

        const step = () => {

            ctx.clearRect(0, 0, _width, _height);

            for(let i = 0; i < N; i++)
                for(let j = 0; j < N; j++)
                    array[i][j].update(
                        this.state.DT,
                        this.state.DAMPING,
                        this.state.DELTA,
                        this.state.KGrid,
                        this.state.KClick,
                    );

            for(let i = 0; i < N-1; i++)
                for(let j = 0; j < N-1; j++) {
                    let d1 = array[i][j];
                    let d2 = array[i+1][j];
                    let d3 = array[i][j+1];
                    draw_connection(d1, d2);
                    draw_connection(d1, d3);
                }

            for(let i = 0; i < N-1; i++) {
                let d1 = array[N-1][i];
                let d2 = array[N-1][i+1];
                let d3 = array[i][N-1];
                let d4 = array[i+1][N-1];
                draw_connection(d1, d2);
                draw_connection(d3, d4);
            }

            this.frameId = window.requestAnimationFrame(step);
        }

        setup();

        this.frameId = window.requestAnimationFrame(step);
    }

    disconnected(){
        window.cancelAnimationFrame(this.frameId);
    }
