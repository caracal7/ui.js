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

    color: '#FFFFFF',

    events: undefined,

    billboard: false,

    text: '',

    width: Infinity,
    align: 'center',
    letterSpacing: -0.05,
    size: 1,
    lineHeight: 1.1,

    font: undefined,
    texture: undefined,

<!class>
    /*
        Instructions to generate necessary MSDF assets

        Install msdf-bmfont https://github.com/soimy/msdf-bmfont-xml
        `npm install msdf-bmfont-xml -g`

        Then, using a font .ttf file, run the following (using 'FiraSans-Bold.ttf' as example)

        `msdf-bmfont -f json -m 512,512 -d 2 --pot --smart-size FiraSans-Bold.ttf`

        Outputs a .png bitmap spritesheet and a .json with character parameters.
    */
    changed(attrs) {
        if(attrs.texture)   this.LoadTexture(attrs.texture); // don't await

        if(!this.Mesh) return;

        setPosition(attrs, this.scene, this.state);
        setRotation(attrs, this.scene, this.state);

        if(attrs.font) this.loadFont();  // don't await
        else if(['text','width','align','letterSpacing','size','lineHeight'].some(_ => attrs[_])) {
            this.rebuildMesh(); // scale, color & events inside // TODO: check for changes
        } else {
            setScale(attrs, this.Mesh, this.state);
            setColor(attrs, this.Mesh, this.renderer);
            setEvents(attrs, this.Mesh, this.renderer);
        }
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

    async loadFont() {
        if(typeof this.state.font === 'string' && this.state.font.length) {
            if(this.state.font != this.currentFont) {
                const cached = fontsCache.get(this.state.font);
                if(cached)
                    this.font = await cached;
                else {
                    const promise = loadJSON(this.state.font);
                    fontsCache.set(this.state.font, promise);
                    this.font = await promise;
                }
                this.currentFont = this.state.font;
            }
        } else this.font = this.state.font;
        this.rebuildMesh(); // don't await
    }

    async init() {
        const { Texture, Program, Color } = this.renderer.ogl;
        this.Text               = this.renderer.ogl.Text;
        this.Geometry           = this.renderer.ogl.Geometry;
        this.MeshConstructor    = this.renderer.ogl.Mesh;

        this.texture = new Texture(this.renderer.gl, { generateMipmaps: false });
        if(this.state.texture) this.LoadTexture(this.state.texture); // don't await


        this.program = new Program(this.renderer.gl, {
            // Get fallback shader for WebGL1 - needed for OES_standard_derivatives ext
            vertex:   this.renderer.renderer.isWebgl2 ? vertex300   : vertex100,
            fragment: this.renderer.renderer.isWebgl2 ? fragment300 : fragment100,
            uniforms: {
                tMap:      { value: this.texture },
                tColor:    { value: new Color(this.state.color) },
                billboard: { value: this.state.billboard }
            },
            transparent: true,
            cullFace: false,
            depthWrite: false,
        });

        setPosition(this.state, this.scene, this.state);
        setRotation(this.state, this.scene, this.state);

        if(this.state.font) this.loadFont(); // don't await
    }



    async rebuildMesh() {
        if(!this.font) return;
        const _text = new this.Text({
            ...this.state,
            font: this.font,
            text: String(this.state.text)
        });
        // Pass the generated buffers into a geometry
        const geometry = new this.Geometry(this.renderer.gl, {
            position:   { size: 3, data: _text.buffers.position },
            uv:         { size: 2, data: _text.buffers.uv },
            // id provides a per-character index, for effects that may require it
            id:         { size: 1, data: _text.buffers.id },
            index:      {          data: _text.buffers.index },
        });
        this.removeOldMesh()
        this.Mesh = new this.MeshConstructor(this.renderer.gl, { geometry, program: this.program });
        setScale(this.state,  this.Mesh, this.state);
        setColor(this.state,  this.Mesh, this.renderer);

        if(['click','mouseover','mouseout','mousedown','mouseup','dblclick','mousemove']
            .some(e => this.hasEventHandler(e))) {
                this.state.events = true;
                setEvents(this.state, this.Mesh, this.renderer);
            };

        this.Mesh.onBeforeRender(({ mesh }) => {
            this.program.uniforms.tColor.value = mesh.color;
            this.program.uniforms.billboard.value = this.state.billboard;
        });
        this.renderer.addMesh(this.Mesh, this, {
            onBeforeRender : false
        });

        this.Mesh.setParent(this.scene);
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
    var _text;
    const texturesCache = new Map();
    const fontsCache    = new Map();
    //------------------------------------------------------------------------------

    const vertex = /* glsl */ `
        attribute vec2 uv;
        attribute vec3 position;

        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;

        uniform bool billboard;

        varying vec2 vUv;

        void main() {
            vUv         = uv;
            if(billboard)
                gl_Position = projectionMatrix * (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0) + vec4(position.x, position.y, 0.0, 0.0));
            else
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragment = /* glsl */ `
        uniform sampler2D tMap;

        uniform vec3 tColor;

        varying vec2 vUv;

        void main() {
            vec3 tex         = texture2D(tMap, vUv).rgb;
            float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
            float d          = fwidth(signedDist);
            float alpha      = smoothstep(-d, d, signedDist);

            if (alpha < 0.01) discard;

            gl_FragColor.rgb = tColor;
            gl_FragColor.a   = alpha;
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
