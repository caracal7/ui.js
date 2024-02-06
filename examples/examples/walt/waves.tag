
<p enter{
    padding: '10px',
    opacity: { to: 1 }
}>

    <h2>WAVE EQUATION</h2>


    <p>Click and drag on the canvas.</p>

    <p>
        <input type='checkbox' %checked=state.useJS> Use JavaScript
    </p>


    <p text('Calculation time for 100 steps: ' + state.time + 'ms')/>


    <canvas id="canvas" width="800" height="800"></canvas>

</p>

<!state>
    useJS: false,
    time: 0

<!walt>
    import {
        getCanvasWidth: GetSizeType,
        getCanvasHeight: GetSizeType
    } from 'tag';

    type GetSizeType = () => i32;

    export const memory: Memory<{initial: 1}>;

    const HEAP_START: i32 = 65536;

    function applyCap(x: i32) : i32 {
        if (x < -0x40000000) {
            return -0x40000000;
        }
        if (x > 0x3FFFFFFF) {
            return 0x3FFFFFFF;
        }
        return x;
    }

    function toRGB(x: i32) : i32 {
        const val: i32 = x >> 22;
        if (val < 0) {
            return ((-(val + 1)) | 0xFF000000); //red
        }
        return (((val << 8) | (val << 16)) | 0xFF000000); // cyan
    }

    export function step(): void {

        const width: i32 = getCanvasWidth();
        const height: i32 = getCanvasHeight();
        const wh: i32 = width * height;

        const image: i32[] = HEAP_START;
        const force: i32[] = HEAP_START + 4 * wh;
        const status: i32[] = HEAP_START + 8 * wh;
        const u: i32[] = HEAP_START + 12 * wh;
        const vel: i32[] = HEAP_START + 16 * wh;

        // Draw walls
        let i: i32 = 0;
        for (i = 0; i < height; i += 1) {
            status[i * width] = 1;
            status[i * width + width - 1] = 1;
        }
        for (i = 0; i < width; i += 1) {
            status[i] = 1;
            status[width * height - width + i] = 1;
        }

        // Calculate velocity change
        for (i = 0; i < wh; i += 1) {
            if (status[i] == 0) {
                const uCen: i32 = u[i];
                const uNorth: i32 = u[i - width];
                const uSouth: i32 = u[i + width];
                const uEast: i32 = u[i + 1];
                const uWest: i32 = u[i - 1];
                const uxx: i32 = (((uWest + uEast) >> 1) - uCen);
                const uyy: i32 = (((uNorth + uSouth) >> 1) - uCen);
                vel[i] = applyCap(vel[i] + (uxx >> 1) + (uyy >> 1));
            }
        }

        // Apply forces
        for (i = 0; i < wh; i += 1) {
            if (status[i] == 0) {
                const f: i32 = force[i];
                u[i] = applyCap(f + applyCap(u[i] + vel[i]));
                force[i] = f >> 1;
            }
        }

        // Generate image
        for (i = 0; i < wh; i += 1) {
            if (status[i] == 1) {
                image[i] = 0xFFFF0000;
            } else {
                image[i] = toRGB(u[i]);
            }
        }
    }


<!class>

    connected() {
        const canvas = this.canvas = this.document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const imgData = ctx.createImageData(canvas.width, canvas.height);

        const brushMatrix = [];
        const brushMatrixRadius = 28;
        for (let p = -brushMatrixRadius; p <= brushMatrixRadius; p++) {
            const row = [];
            brushMatrix.push(row);
            for (let q = -brushMatrixRadius; q <= brushMatrixRadius; q++) {
                const element = Math.floor(0x3FFFFFFF * Math.exp(-0.05 * ((p * p) + (q * q))));
                row.push(element);
            }
        }

        const memory = this.walt.memory;

        const {
            width,
            height
        } = canvas;
        const wh = width * height;
        const pages = 1 + ((20 * wh) >> 16);
        memory.grow(pages);
        const heap = memory.buffer;
        const HEAP_START = 65536;

        const imageArray = new Uint8ClampedArray(heap, HEAP_START, 4 * wh);
        const forceArray = new Int32Array(heap, HEAP_START + 4 * wh, wh);

        let lastMouseX = null;
        let lastMouseY = null;

        function applyBrush(x, y) {
            const applyCap = (x) => (x < -0x40000000 ? -0x40000000 : (x > 0x3FFFFFFF ? 0x3FFFFFFF : x));
            const {
                width,
                height
            } = canvas;
            for (let p = -brushMatrixRadius; p <= brushMatrixRadius; p++) {
                const targetY = y + p;
                if (targetY <= 0 || targetY >= height - 1) {
                    continue;
                }
                for (let q = -brushMatrixRadius; q <= brushMatrixRadius; q++) {
                    const targetX = x + q;
                    if (targetX <= 0 || targetX >= width - 1) {
                        continue;
                    }
                    const brushValue = brushMatrix[p + brushMatrixRadius][q + brushMatrixRadius];
                    const targetIndex = targetY * width + targetX;
                    forceArray[targetIndex] += brushValue;
                    forceArray[targetIndex] = applyCap(forceArray[targetIndex]);
                }
            }
        }

        canvas.onmousedown = (e) => {
            e.preventDefault();
            let bbox = canvas.getBoundingClientRect();
            const mouseX = Math.round(e.clientX - bbox.left * (width / bbox.width));
            const mouseY = Math.round(e.clientY - bbox.top * (height / bbox.height));
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            applyBrush(mouseX, mouseY);
        };

        canvas.onmousemove = (e) => {
            e.preventDefault();
            let bbox = canvas.getBoundingClientRect();
            const mouseX = Math.round(e.clientX - bbox.left * (width / bbox.width));
            const mouseY = Math.round(e.clientY - bbox.top * (height / bbox.height));
            if (lastMouseX !== null && lastMouseY !== null) {
                const r = Math.sqrt((mouseX - lastMouseX) * (mouseX - lastMouseX) + (mouseY - lastMouseY) * (mouseY - lastMouseY));
                for (let t = 0; t <= r; t += 5) {
                    const currX = Math.round(lastMouseX + ((mouseX - lastMouseX) * (t / r)));
                    const currY = Math.round(lastMouseY + ((mouseY - lastMouseY) * (t / r)));
                    applyBrush(currX, currY);
                    forceArray[currY * width + currX] = 0x3FFFFFFF;
                }
                applyBrush(mouseX);
                applyBrush(mouseY);
                lastMouseX = mouseX;
                lastMouseY = mouseY;
            }
        };

        canvas.onmouseout = canvas.onmouseup = (e) => {
            e.preventDefault();
            lastMouseX = null;
            lastMouseY = null;
        };


        const stepJS = () => {

            const statusArray = new Int32Array(heap, HEAP_START + 8 * wh, wh);
            const uArray = new Int32Array(heap, HEAP_START + 12 * wh, wh);
            const velArray = new Int32Array(heap, HEAP_START + 16 * wh, wh);

            const image32Array = new Uint32Array(heap, HEAP_START, wh);

            const applyCap = (x) => (x < -0x40000000 ? -0x40000000 : (x > 0x3FFFFFFF ? 0x3FFFFFFF : x));

            const toRGB = (x) => {
                const val = x >> 22;
                if (val < 0) {
                    return ((-(val + 1)) | 0xFF000000); // red
                }
                return (((val << 8) | (val << 16)) | 0xFF000000); // cyan
            };

            // Draw walls
            for (let i = 0; i < height; i++) {
                statusArray[i * width] = 1;
                statusArray[i * width + width - 1] = 1;
            }
            for (let i = 0; i < width; i++) {
                statusArray[i] = 1;
                statusArray[width * height - width + i] = 1;
            }

                for (let i = 0; i < wh; i += 1) {
                if (statusArray[i] === 0) {
                    const uCen = uArray[i];
                    const uNorth = uArray[i - width];
                    const uSouth = uArray[i + width];
                    const uEast = uArray[i + 1];
                    const uWest = uArray[i - 1];
                    const uxx = (((uWest + uEast) >> 1) - uCen);
                    const uyy = (((uNorth + uSouth) >> 1) - uCen);
                    velArray[i] = applyCap(velArray[i] + (uxx >> 1) + (uyy >> 1));
                }
            }
            for (let i = 0; i < wh; i += 1) {
                if (statusArray[i] === 0) {
                    const f = forceArray[i];
                    uArray[i] = applyCap(f + applyCap(uArray[i] + velArray[i]));
                    forceArray[i] = f >> 1;
                }
            }

            for (let i = 0; i < wh; i += 1) {
                if (statusArray[i] === 1) {
                    image32Array[i] = 0xFFFF0000;
                } else {
                    image32Array[i] = toRGB(uArray[i]);
                }
            }
        };

        var num = 0;
        var duration2 = 0;

        const step = () => {

            var start = performance.now();

            if (this.state.useJS) {
                stepJS();
            } else {
                this.walt.step();
            }

            var duration = performance.now() - start;
            duration2 += duration;
            num++;
            if(num > 100) {
                this.state.time = duration2;
                this.render();
                num = 0;
                duration2 = 0;
            }

            imgData.data.set(imageArray);
            ctx.putImageData(imgData, 0, 0);
            this.frameId = window.requestAnimationFrame(step);
        }

        this.frameId = window.requestAnimationFrame(step);
    }

    disconnected(){
        window.cancelAnimationFrame(this.frameId);
    }

    // this functions above is called by WALT

    getCanvasWidth() {
        return this.canvas.width;
    }

    getCanvasHeight() {
        return this.canvas.height;
    }


<!static>

/*

    let stopped = false;


    document.body.addEventListener('keydown', () => {
      useJS = true;
    });

    document.body.addEventListener('keyup', () => {
      useJS = false;
    });

    function step() {
      if (!stopped) {
        if (useJS) {
                   console.timeEnd('JS');
          stepJS();
          console.timeEnd('JS');
        } else {
          console.time('WALT');
          exports.step();
          console.timeEnd('WALT');
        }
        imgData.data.set(imageArray);
        ctx.putImageData(imgData, 0, 0);
        setTimeout(step, 0);
      }
    }
    step();
    return function() {
      stopped = true;
    }
  });

*/
