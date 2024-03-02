<!import * as ogl from ogl.esm.js>

<!class>
    async connected() {
        const { Renderer, Camera, Transform, Geometry, Texture, Program, Mesh, Orbit, Text } = ogl;

        const vertex = /* glsl */ `
            attribute vec2 uv;
            attribute vec3 position;

            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;

            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragment = /* glsl */ `
            uniform sampler2D tMap;

            varying vec2 vUv;

            void main() {
                vec3 tex = texture2D(tMap, vUv).rgb;
                float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
                float d = fwidth(signedDist);
                float alpha = smoothstep(-d, d, signedDist);

                if (alpha < 0.01) discard;

                gl_FragColor.rgb = vec3(0.0);
                gl_FragColor.a = alpha;
            }
        `;

        const vertex100 = /* glsl */ vertex;

        const fragment100 = /* glsl */ `#extension GL_OES_standard_derivatives : enable
            precision highp float;
            ${fragment}
        `;

        const vertex300 = /* glsl */ `#version 300 es
            #define attribute in
            #define varying out
            ${vertex}
        `;

        const fragment300 = /* glsl */ `#version 300 es
            precision highp float;
            #define varying in
            #define texture2D texture
            #define gl_FragColor FragColor
            out vec4 FragColor;
            ${fragment}
        `;

        const renderer = new Renderer({ dpr: 2 });
        const gl = renderer.gl;
        this.document.appendChild(gl.canvas);
        gl.clearColor(1, 1, 1, 1);

        const camera = new Camera(gl, { fov: 45 });
        camera.position.set(0, 0, 7);

        const controls = new Orbit(camera);

        const resize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        }

        this.on('resize', resize);
        resize();

        const scene = new Transform();

        /*

        Instructions to generate necessary MSDF assets

        Install msdf-bmfont https://github.com/soimy/msdf-bmfont-xml
        `npm install msdf-bmfont-xml -g`

        Then, using a font .ttf file, run the following (using 'FiraSans-Bold.ttf' as example)

        `msdf-bmfont -f json -m 512,512 -d 2 --pot --smart-size FiraSans-Bold.ttf`

        Outputs a .png bitmap spritesheet and a .json with character parameters.

        */

        const loadImage = url => new Promise( resolve => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = url;
        });

        const texture = new Texture(gl, { generateMipmaps: false });
        const img = await loadImage('./assets/FiraSans-Bold.png');
        texture.image = img;

        const program = new Program(gl, {
            // Get fallback shader for WebGL1 - needed for OES_standard_derivatives ext
            vertex:   renderer.isWebgl2 ? vertex300   : vertex100,
            fragment: renderer.isWebgl2 ? fragment300 : fragment100,
            uniforms: {
                tMap: { value: texture },
            },
            transparent: true,
            cullFace: false,
            depthWrite: false,
        });


        const FiraSans = await (await fetch('./assets/FiraSans-Bold.json')).json();

        async function loadText() {

            const text = new Text({
                font: FiraSans,
                text: "don't panic",
                width: 8,
                align: 'center',
                letterSpacing: -0.05,
                size: 1,
                lineHeight: 1.1,
            });

            // Pass the generated buffers into a geometry
            const geometry = new Geometry(gl, {
                position: { size: 3, data: text.buffers.position },
                uv: { size: 2, data: text.buffers.uv },
                // id provides a per-character index, for effects that may require it
                id: { size: 1, data: text.buffers.id },
                index: { data: text.buffers.index },
            });

            const mesh = new Mesh(gl, { geometry, program });

            // Use the height value to position text vertically. Here it is centered.
            mesh.position.y = text.height * 0.5;
            mesh.setParent(scene);
        }
        loadText();

        function update(t) {
            controls.update();
            renderer.render({ scene, camera });
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);

    }

<!style>
    :host {
        position:absolute;
        top:0;
        left:0;
    }
