<!import GPU from gpu-browser.esm.js>

<canvas id="canvas" width="600" height="600"/>



<!class>

    connected() {
        const canvas = this.$('#canvas');
        const gpu = new GPU({ canvas });

        const width = 600;

        const renderJulia = gpu.createKernel(function (SCALE, MAX_ITER, CR, CI, HUE_OFFSET, size) {

            let ar = 1 / SCALE * (size / 2 - this.thread.x) / (size / 2);
            let ai = 1 / SCALE * (size / 2 - this.thread.y) / (size / 2);
            let i = 0;
            while (i < MAX_ITER) {
                let t = ai * ar * 2;
                ar = ar * ar - ai * ai + CR;
                ai = t + CI;
                if (ar * ar + ai * ai > 1000) break;
                i++;
            }

            if (i == MAX_ITER) {
                this.color(0, 0, 0);
            } else {
                // hsl to rgb
                let c=0, x=0, m=0, r=0, g=0, b=0;
                let h = (HUE_OFFSET + i) % 360, s = 0.75, l = 0.5;
                c = (1 - Math.abs(2 * l - 1)) * s;
                x = c * (1 - Math.abs(((h / 60) % 2) - 1));
                m = l - c / 2;
                if(h >= 0 && h < 60) {
                    r = c; g = x; b = 0;
                } else if(h >= 60 && h < 120) {
                    r = x; g = c; b = 0;
                } else if(h >= 120 && h < 180) {
                    r = 0; g = c; b = x;
                } else if(h >= 180 && h < 240) {
                    r = 0; g = x; b = c;
                } else if(h >= 240 && h < 300) {
                    r = x; g = 0; b = c;
                } else if(h >= 300 && h < 360) {
                    r = c; g = 0; b = x;
                }
                this.color(r + m, g + m, b + m);
            }
        })
        .setOutput([ width, width ])
        .setGraphical(true);

        renderJulia(1.2, 180, 0.15, 0.59, 200, width);
    }
