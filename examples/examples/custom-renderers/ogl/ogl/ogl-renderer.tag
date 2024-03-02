<!renderer ogl-renderer html>
<!import * as ogl from 'ogl.esm.js'>

<!static>

    const { Renderer, Camera, Program, Transform, Mesh, Color, Orbit, Vec2, Raycast }  = ogl;

    const vertex = /* glsl */ `
        attribute vec3 position;
        attribute vec3 normal;

        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform mat3 normalMatrix;

        varying vec3 vNormal;

        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragment = /* glsl */ `
        precision highp float;

        varying vec3 vNormal;
        varying vec4 vMVPos;

        uniform vec3 color;

        void main() {
            vec3 normal = normalize(vNormal);
            float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6))) * 0.2;

            gl_FragColor.rgb = color + lighting;
            gl_FragColor.a = 1.0;
        }
    `;


<!state>
    cx: -2,
    cy: 30,
    cz: 50,

<!class>

    changed(attrs) {
        if(!this.camera) return;
        if(['cx','cy','cz'].some(_ => attrs.hasOwnProperty(_)))
            this.camera.position.set(this.state.cx, this.state.cy, this.state.cz);
    }

    updateUniform({ mesh }) {
        this.program.uniforms.color.value = mesh.color;
    }

    addMesh(mesh, parent, options = {}) {
        mesh._uiParent = parent;
        if(!options.onBeforeRender ?? true) mesh.onBeforeRender(this.updateUniform.bind(this));
    }

    removeMesh(mesh) {
        mesh.setParent(null);
    }

    addEvents(mesh) {
        const index = this.meshesWithEvents.findIndex(x => x === mesh);
        index === -1 && this.meshesWithEvents.push(mesh);
    }

    removeEvents(mesh) {
        const index = this.meshesWithEvents.findIndex(x => x === mesh);
        index !== -1 && this.meshesWithEvents.splice(index, 1);
    }

    get renderer() {
        return {
            name: 'OGL renderer',
            ogl,
            gl: this.gl,
            program: this.program,
            renderer: this._renderer,
            camera: this.camera,
            controls: this.controls,
            raycast: this.raycast,
            scene: this.scene,

            insertAfter: this.insertAfter.bind(this),
            insertBefore: this.insertBefore.bind(this),
            onConnect: this.onConnect.bind(this),
            onDisconnect: this.onDisconnect.bind(this),

            addMesh: this.addMesh.bind(this),
            removeMesh: this.removeMesh.bind(this),

            addEvents: this.addEvents.bind(this),
            removeEvents: this.removeEvents.bind(this),

            onReady: this.onReady,
        }
    }
    init() {
        this._childNodes = [];
        this.onReady = new Promise(Ready => this.Ready = Ready);
    }

    insertAfter(child, element) {
        const index = child.parent._childNodes.findIndex(x => x === child);
        if(index === -1) throw "Element not found";
        child.parent._childNodes.splice(index + 1, 0, element);
    }

    insertBefore(child, element) {
        const index = child.parent._childNodes.findIndex(x => x === child);
        if(index === -1) throw "Element not found";
        child.parent._childNodes.splice(index, 0, element);
    }

    onConnect(child) {
        child.scene = new Transform();
        child.scene.setParent(child.parent.scene || this.scene);
        child.document.scene = child.parent.scene;
    }

    async onDisconnect(child) {
        await child.onReady;
        child.scene.setParent(null);
    }

    connected() {
        this.meshesWithEvents = [];
        this._renderer = new Renderer({ dpr: 2 });
        this.gl = this._renderer.gl;
        this.document.appendChild(this.gl.canvas);
        this.gl.clearColor(0.2, 0.2, 0.2, 1);

        // The Camera class extends Transform. See Below for more on Transform.
        this.camera = new Camera(this.gl, { fov: 35, far: 1000 });
        this.camera.position.set(this.state.cx, this.state.cy, this.state.cz);
        this.camera.up.set(0, 1, 0);
        this.camera.lookAt([0, 0, 0]);

        this.controls = new Orbit(this.camera);

        const resize = () => {
            this._renderer.setSize(this.clientWidth, this.clientHeight);
            this.camera.perspective({ aspect: this.gl.canvas.width / this.gl.canvas.height });
        };

        this.on('resize', resize);
        resize();

        const program = this.program = new Program(this.gl, {
            vertex,
            fragment,
            uniforms: {
                color: { value: new Color(1, 0.75, 0.5) }
            }
        });

        const mouse = new Vec2();

          // Create a raycast object
        this.raycast = new Raycast();

        this.hover = null;

        const setHover = hit => {
            if(!hit._uiParent) {
                throw '_uiParent not found';
                return;
            }
            if(!this.hover) {
                hit._uiParent.emit('mouseover', { parent: hit._uiParent, mesh: hit, ...hit.hit});
                this.hover = hit;
                return;
            }
            if(this.hover._uiParent === hit._uiParent) return this.hover._uiParent.emit('mousemove', { parent: this.hover._uiParent, mesh: this.hover, ...this.hover.hit});


            this.hover._uiParent.emit('mouseout', { parent: this.hover._uiParent, mesh: this.hover, ...this.hover.hit});

            hit._uiParent.emit('mouseover', { parent: hit._uiParent, mesh: hit, ...hit.hit});
            this.hover = hit;
        }

        const resetHover = () => {
            if(this.hover?._uiParent) {
                this.hover._uiParent.emit('mouseout', { parent: this.hover._uiParent, mesh: this.hover, ...this.hover.hit});
            }
            this.hover = null;
        }

        this.on('mousemove', e => {
            mouse.set(2.0 * (e.x / this._renderer.width) - 1.0, 2.0 * (1.0 - e.y / this._renderer.height) - 1.0);
            this.raycast.castMouse(this.camera, mouse);
            const hits = this.raycast.intersectMeshes(this.meshesWithEvents);
            if (hits.length) setHover(hits[0]);
            else if(this.hover) resetHover();
        }, false);

        ['mousedown', 'mouseup', 'click', 'dblclick'].forEach(event =>
            this.on(event, e => {
                mouse.set(2.0 * (e.x / this._renderer.width) - 1.0, 2.0 * (1.0 - e.y / this._renderer.height) - 1.0);
                this.raycast.castMouse(this.camera, mouse);
                this.hover?._uiParent && this.hover._uiParent.emit(event,  { parent: this.hover._uiParent, mesh: this.hover, ...this.hover.hit})
            }, false));

        // The scene hierarchy is controlled by the Transform class
        // To create scenes, groups, null pointers etc, use Transform
        this.scene = new Transform();


        const update = t => {
            this.controls.update();
            this._renderer.render({
                scene: this.scene,
                camera: this.camera
            });
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);

        this.Ready();
    }

<!style>
    :host, * {
        box-sizing: border-box!important;
    }
    :host {
        display: block;
        margin: 0;
        padding: 0;
    }
    :host, canvas {
        position: relative;
        width: 100%;
        height: 100%;
    }
    canvas {
        box-sizing: border-box!important;
    }
