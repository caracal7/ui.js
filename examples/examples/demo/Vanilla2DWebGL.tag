

<canvas id="canvas" width="250" height="150"/>

<!class>
    connected() {
        let VERTEX_LENGTH = 1000;

        function setCanvasSize(gl, canvas) {
        	canvas.width = window.innerWidth;
        	canvas.height = window.innerHeight;
        	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }

        function initGL(canvas) {
        	const gl = canvas.getContext('webgl');
        	setCanvasSize(gl, canvas);
        	gl.clearColor(0, 0, 0, 1);
            return { gl, canvas };
        }

        function createShaders(gl) {
        	const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        	gl.shaderSource(vertexShader, `
                uniform int offset;
                uniform int count;

                attribute vec4 coords;
                attribute float pointSize;
                void main(void) {
                    float dx = float(offset * 2) / float(count);

                    gl_Position = vec4(coords.x - dx, coords.y, 0.0, 1.0);
                    gl_PointSize = pointSize;
                }
            `);
        	gl.compileShader(vertexShader);

        	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        	gl.shaderSource(fragmentShader, `
                precision mediump float;
                uniform vec4 color;
                void main(void) {
                    gl_FragColor = color;
                }
            `);
        	gl.compileShader(fragmentShader);

        	const shaderProgram = gl.createProgram();
        	gl.attachShader(shaderProgram, vertexShader);
        	gl.attachShader(shaderProgram, fragmentShader);

        	gl.linkProgram(shaderProgram);
        	gl.useProgram(shaderProgram);

            return shaderProgram;
        }

        function createVertices(gl, shaderProgram) {
        	// Feel like my function is close but I'm missing something
        	const vertices = makePoints(VERTEX_LENGTH);

            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

            const coords = gl.getAttribLocation(shaderProgram, 'coords');
            gl.enableVertexAttribArray(coords);// turn on getting data out of a buffer for this attribute
            gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0); //  attributeLocation, size, type, normalize, stride, offset
            const pointSize = gl.getAttribLocation(shaderProgram, 'pointSize');
            gl.vertexAttrib1f(pointSize, 5);
            const uniformColor = gl.getUniformLocation(shaderProgram, 'color');
            gl.uniform4f(uniformColor, 0, 0.8, 0.3, 1);

            const count = gl.getUniformLocation(shaderProgram, "count");
            gl.uniform1i(count, VERTEX_LENGTH);
            const offset = gl.getUniformLocation(shaderProgram, "offset");
            gl.uniform1i(offset, 0);


            return {
                vertices,
                pointSize,
                count,
                offset,
            };
        }

        function makePoints(count) {
            const PI2 = Math.PI * 2;
            const arr = new Float32Array(count * 2);
            for(var i = 0; i < count * 2; i += 2) {
                let val = (i / count) * PI2 / 2;
                arr[i] =  i / count-1;      // x, lerp 0..points => -1..1 range
                arr[i+1] = Math.sin(val);   // y, the sinus function...
            }
            return arr;
        }

        const { gl, canvas } = initGL(this.$('#canvas'));
        const shaderProgram = createShaders(gl);
        const { vertices, offset } = createVertices(gl, shaderProgram);

        let from = 1;

        const step = () => {
            from++;
            if(from > VERTEX_LENGTH) from = 0;

        	gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1i(offset, from);
            gl.drawArrays(gl.POINTS, from, VERTEX_LENGTH - from);
            if(from !== 0) {
                gl.uniform1i(offset, -VERTEX_LENGTH + from);
                gl.drawArrays(gl.POINTS, 0, from);
            }
            requestAnimationFrame(step);
        }

        step();

        this.on('resize', () => setCanvasSize(gl, canvas));


    }
