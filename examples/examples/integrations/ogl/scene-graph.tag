<!import * as ogl from ogl.esm.js>

<!class>
    connected() {

        const { Renderer, Camera, Program, Transform, Mesh, Sphere, Box }  = ogl;

        const vertex = /* glsl */ `
            attribute vec3 position;
            attribute vec3 normal;

            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform mat3 normalMatrix;

            varying vec3 vNormal;
            varying vec4 vMVPos;

            void main() {
                vNormal = normalize(normalMatrix * normal);

                vMVPos = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * vMVPos;
            }
        `;

        const fragment = /* glsl */ `
            precision highp float;

            varying vec3 vNormal;
            varying vec4 vMVPos;

            void main() {
                vec3 normal = normalize(vNormal);
                float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));
                vec3 color = vec3(1.0, 0.5, 0.2) * (1.0 - 0.5 * lighting) + vMVPos.xzy * 0.1;

                float dist = length(vMVPos);
                float fog = smoothstep(4.0, 10.0, dist);
                color = mix(color, vec3(1.0), fog);

                gl_FragColor.rgb = color;
                gl_FragColor.a = 1.0;
            }
        `;


        const renderer = new Renderer({ dpr: 2 });
        const gl = renderer.gl;
        this.document.appendChild(gl.canvas);
        gl.clearColor(1, 1, 1, 1);

        // The Camera class extends Transform. See Below for more on Transform.
        const camera = new Camera(gl, { fov: 35 });
        camera.position.set(0, 1, 7);
        camera.lookAt([0, 0, 0]);

        const resize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        };

        this.on('resize', resize);
        resize();

        const sphereGeometry = new Sphere(gl, { radius: 0.15 });
        const cubeGeometry = new Box(gl, { width: 0.3, height: 0.3, depth: 0.3 });

        const program = new Program(gl, {
            vertex,
            fragment,
        });

        // The scene hierarchy is controlled by the Transform class
        // To create scenes, groups, null pointers etc, use Transform
        const scene = new Transform();

        // The Mesh class extends the Transform class, and so shares the scene graph functionality
        const sphere = new Mesh(gl, { geometry: sphereGeometry, program });
        sphere.speed = -0.5;

        // Use .setParent to add transform as a child of another transform
        sphere.setParent(scene);
        // scene.addChild(sphere); // also works

        const shapes = [sphere];

        // Create random array of shapes
        for (let i = 0; i < 50; i++) {
            const geometry = Math.random() > 0.5 ? cubeGeometry : sphereGeometry;
            const shape = new Mesh(gl, { geometry, program });
            shape.scale.set(Math.random() * 0.3 + 0.7);
            shape.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3);
            shape.speed = (Math.random() - 0.5) * 0.7;

            // Attach them to a random, previously created shape
            shape.setParent(shapes[Math.floor(Math.random() * shapes.length)]);
            shapes.push(shape);
        }

        function update(t) {
            shapes.forEach((shape) => {
                shape.rotation.y += 0.03 * shape.speed;
                shape.rotation.x += 0.04 * shape.speed;
                shape.rotation.z += 0.01 * shape.speed;
            });
            // The 'scene' property in the render call expects any Transform.
            // Therefore can be a Mesh instance as well.
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
