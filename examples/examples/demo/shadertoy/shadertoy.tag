<canvas/>

<!class>
    init() {
        this.uniforms = {};
    }

    connected() {
        const canvas = this.$('canvas');
        const gl = this.gl = initWebGL(canvas, this);

        this.setupProgram(this.fragment);
        //----------------------------------------------------------------------

        let mouseX = 0;
        let mouseY = 0;

        function setMousePosition(e) {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = rect.height - (e.clientY - rect.top) - 1;
        }

        canvas.addEventListener('mousemove', setMousePosition);

        let then = 0;
        let time = 0;
        const Render = now => {
            now *= 0.001;  // convert to seconds
            const elapsedTime = Math.min(now - then, 0.1);
            time += elapsedTime;
            then = now;


            gl.uniform2f(this.iResolution, gl.canvas.width, gl.canvas.height);
            gl.uniform2f(this.iMouse, mouseX, mouseY);
            gl.uniform1f(this.iTime, time);
            let dt = new Date;
            gl.uniform4f(this.iDate,  dt.getFullYear(), dt.getMonth(), dt.getDay(), dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours()));
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(Render);
        }

        requestAnimationFrame(Render);

        this.on('resize', () => resizeCanvas(gl, canvas, this));
    }

    setupProgram(shader) {
        if(!shader) return;

        if(!this.gl) return;
        const gl = this.gl;
        // setup GLSL program
        const program = createShaders(gl, shader);
        // look up where the vertex data needs to go.
        const positionAttributeLocation = gl.getAttribLocation(program, "position");
        // look up uniform locations
        this.iResolution = gl.getUniformLocation(program, "iResolution");
        this.iMouse = gl.getUniformLocation(program, "iMouse");
        this.iTime = gl.getUniformLocation(program, "iTime");
        this.iDate = gl.getUniformLocation(program, "iDate");

        //----------------------------------------------------------------------
        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);
        // Create a buffer to put three 2d clip space points in
        const positionBuffer = gl.createBuffer();
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // fill it with a 2 triangles that cover clip space
        const quad = new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]);
        gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

        // Turn on the attribute
        gl.enableVertexAttribArray(positionAttributeLocation);
        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        gl.vertexAttribPointer(
            positionAttributeLocation,
            2,          // 2 components per iteration
            gl.FLOAT,   // the data is 32bit floats
            false,      // don't normalize the data
            0,          // 0 = move forward size * sizeof(type) each iteration to get the next position
            0,          // start at the beginning of the buffer
        );
    }


    changed(attrs) {
        if(attrs.fragment && this.fragment != attrs.fragment) {
            this.fragment = attrs.fragment;
            this.setupProgram(this.fragment)
        }
    }

<!static>
    let SCALE_FACTOR = 1;

    function resizeCanvas(gl, canvas, host) {
    	canvas.width = host.offsetWidth / SCALE_FACTOR;
    	canvas.height = host.offsetHeight / SCALE_FACTOR;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }

    function initWebGL(canvas, host) {
    	const gl = canvas.getContext('webgl', { antialias: false, stencil: false, failIfMajorPerformanceCaveat: true });
        if (!gl) return console.warn('WebGL is not supperted');
    	resizeCanvas(gl, canvas, host);
    	gl.clearColor(0, 0, 0, 1);
        return gl;
    }

    function createShaders(gl, fragment = '') {
    	const vertexShader   = gl.createShader(gl.VERTEX_SHADER);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    	gl.shaderSource(vertexShader, `
            attribute vec2 position;
            void main() {
                gl_Position = vec4( position, 0.0, 1.0 );
            }
        `);
    	gl.shaderSource(fragmentShader, `
            precision highp float;
            uniform vec2 iResolution;
            uniform vec2 iMouse;
            uniform float iTime;
            uniform vec4 iDate; // year, month, day, time in seconds
            ${fragment}
            void main() {
                gl_FragColor = vec4(0.0,0.0,0.0,1.0);
                vec4 color = vec4(1e20);
                mainImage( color, gl_FragCoord.xy );
                color.w = 1.0;
                if(gl_FragColor.w<0.0) color=vec4(1.0,0.0,0.0,1.0);
                if(gl_FragColor.x<0.0) color=vec4(1.0,0.0,0.0,1.0);
                if(gl_FragColor.y<0.0) color=vec4(0.0,1.0,0.0,1.0);
                if(gl_FragColor.z<0.0) color=vec4(0.0,0.0,1.0,1.0);
                if(gl_FragColor.w<0.0) color=vec4(1.0,1.0,0.0,1.0);
                gl_FragColor = vec4(color.xyz,1.0);
            }
        `);
    	gl.compileShader(fragmentShader);
        gl.compileShader(vertexShader);

    	const shaderProgram = gl.createProgram();
    	gl.attachShader(shaderProgram, vertexShader);
    	gl.attachShader(shaderProgram, fragmentShader);
    	gl.linkProgram(shaderProgram);
    	gl.useProgram(shaderProgram);
        return shaderProgram;
    }


<!style>
    :host {
        position: absolute;
        display: block;
        background: #494d55;
        overflow: hidden;
    }

    :host, canvas {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
