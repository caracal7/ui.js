
<p enter{ opacity: { to: 1 } }>
    <canvas id="canvas" width="300" height="200"></canvas>
</p>


<!walt>
    export const memory: Memory<{initial: 1}>;

    const HEAP_START: i32 = 65536;

    function getPixel(x: i32, y: i32, width: i32) : i32 {
        return x + y * width;
    }

    export function draw(width: i32, height: i32): void {

        const wh: i32 = width * height;

        const image: i32[] = HEAP_START;

        let i: i32 = 0;

        for (i = 0; i < wh; i += 1) {
            if (i % width == 0 || (i + 1) % width == 0 || i < width || i > width * (height - 1) ) {
                image[i] = 0xFF00FF00; // Draw walls
            } else {
                image[i] = 0xFF000000; // Fill background
            }
        }

        //  Draw line
        let offs: i32 = 0;

        for (i = 0; i < 50; i += 1) {
            offs = getPixel(i, i, width);
            image[offs] = 0x0000FF00;
        }
    }


<!class>

    connected() {
        const canvas = this.canvas = this.document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const imgData = ctx.createImageData(canvas.width, canvas.height);
        const memory = this.walt.memory;

        const { width, height } = canvas;

        const wh = width * height;
        const pages = 1 + ((20 * wh) >> 16);
        memory.grow(pages);
        const heap = memory.buffer;
        const HEAP_START = 65536;

        this.walt.draw(width, height);

        const imageArray = new Uint8ClampedArray(heap, HEAP_START, 4 * wh);

        imgData.data.set(imageArray);


        ctx.putImageData(imgData, 0, 0);

    }



    getCanvasWidth() {
        return this.canvas.width;
    }

    getCanvasHeight() {
        return this.canvas.height;
    }
