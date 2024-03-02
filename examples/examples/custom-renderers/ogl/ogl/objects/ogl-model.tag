<!renderer ogl-renderer>
<!import { setPosition, setRotation, setScale, setColor, setEvents, loadImage, loadJSON } from ../utils.js>

<!state>
    x: undefined,
    y: undefined,
    z: undefined,

    scale: undefined,

    sx: undefined,
    sy: undefined,
    sz: undefined,

    rx: undefined,
    ry: undefined,
    rz: undefined,

    color: '#000000',

    events: undefined

<!class>

    async changed(attrs) {
        if(attrs.json)    this.LoadModel(attrs.json); // don't await
        if(attrs.texture) this.LoadTexture(attrs.texture); // don't await

        if(!this.Mesh) return;
        setPosition(attrs, this.scene, this.state);
        setRotation(attrs, this.scene, this.state);
        setScale(attrs, this.Mesh, this.state);
        setColor(attrs, this.Mesh, this.renderer);
        setEvents(attrs, this.Mesh, this.renderer);
    }

    async LoadTexture(texture) {
        if(!texture || !this.texture) return;
        if(typeof texture === 'string') {
            if(this.currentTexture == texture) return;
            const cached = texturesCache.get(texture);
            if(cached)
                this.texture.image = await cached;
            else {
                const promise = loadImage(texture);
                texturesCache.set(texture, promise);
                this.texture.image = await promise;
            }
        } else if(texture instanceof HTMLImageElement)
        this.texture.image  = texture;
        this.currentTexture = texture;
    }


    getGeometry(data) {
        return new this.renderer.ogl.Geometry(this.renderer.gl, {
            position:   { size: 3, data: new Float32Array(data.position) },
            uv:         { size: 2, data: new Float32Array(data.uv) },
            normal:     { size: 3, data: new Float32Array(data.normal) },
        });
    }

    async loadGeometry(json) {
        return this.getGeometry(await loadJSON(json));
    }

    async LoadModel(json) {
        if(!this.program) return;
        if(!json) { // reset model
            if(this.Mesh) this.renderer.removeMesh(this.Mesh);
            return;
        }

        if(typeof json === 'string' && json.length) {
            if(json != this.currentJSON) {
                const cached = modelsCache.get(json);
                if(cached)
                    this.geometry = await cached;
                else {
                    const promise = this.loadGeometry(json);
                    modelsCache.set(json, promise);
                    this.geometry = await promise;
                }
                this.currentJSON = json;
            }
        } else this.geometry = this.getGeometry(json);

        this.removeOldMesh();
        this.Mesh = new this.renderer.ogl.Mesh(this.renderer.gl, {
            geometry: this.geometry,
            program: this.program
        });
        setScale(this.state, this.Mesh, this.state);
        setColor(this.state, this.Mesh, this.renderer);

        if(['click','mouseover','mouseout','mousedown','mouseup','dblclick','mousemove']
            .some(e => this.hasEventHandler(e))) {
                this.state.events = true;
                setEvents(this.state, this.Mesh, this.renderer);
            };

        this.Mesh.onBeforeRender(({ mesh }) => this.program.uniforms.color.value = mesh.color );
        this.renderer.addMesh(this.Mesh, this, {
            onBeforeRender : false
        });
        this.Mesh.setParent(this.scene);
    }

    async init() {
        const { Transform, Texture, Program, Geometry, Mesh, Color } = this.renderer.ogl;

        this.texture = new Texture(this.renderer.gl);
        if(this.state.texture) this.LoadTexture(this.state.texture); // don't await

        this.program = new Program(this.renderer.gl, {
              vertex,
              fragment,
              uniforms: {
                  tMap: { value: this.texture },
                  color: { value: new Color(0, 0, 0) }
              },
          });

        if(this.state.json) this.LoadModel(this.state.json); // dont await

        setPosition(this.state, this.scene, this.state);
        setRotation(this.state, this.scene, this.state);
    }

    removeOldMesh() {
        if(this.Mesh) {
            this.state.events && this.renderer.removeEvents(this.Mesh);
            this.renderer.removeMesh(this.Mesh);
        }
    }

    disconnected() {
        this.removeOldMesh();
    }


<!static>
    const texturesCache = new Map();
    const modelsCache   = new Map();
//------------------------------------------------------------------------------

    const vertex = /* glsl */ `
        attribute vec2 uv;
        attribute vec3 position;
        attribute vec3 normal;

        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform mat3 normalMatrix;

        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragment = /* glsl */ `
        precision highp float;

        uniform float uTime;
        uniform sampler2D tMap;

        varying vec2 vUv;
        varying vec3 vNormal;

        uniform vec3 color;

        void main() {
            vec3 normal = normalize(vNormal);
            vec3 tex = texture2D(tMap, vUv).rgb;

            vec3 light = normalize(vec3(0.5, 1.0, -0.3));
            float shading = dot(normal, light) * 0.15;
            gl_FragColor.rgb = color + tex + shading;
            gl_FragColor.a = 1.0;
        }
    `;
