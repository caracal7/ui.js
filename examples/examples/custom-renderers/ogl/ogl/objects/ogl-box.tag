<!renderer ogl-renderer>
<!import { setPosition, setRotation, setScale, setColor, setEvents } from ../utils.js>

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

    color: '#'+(Math.random()*0x00FFFF<<0).toString(16).padStart(6, "0"),

    events: undefined

<!class>

    changed(attrs) {
        if(!this.Box) return;
        setPosition(attrs, this.scene, this.state);
        setRotation(attrs, this.scene, this.state);
        setScale(attrs,    this.Box,   this.state);
        setColor(attrs,    this.Box,   this.renderer);
        setEvents(attrs,   this.Box,   this.renderer);
    }

    async init() {
        const { Color, Box } = this.renderer.ogl;
        this.Box = new this.renderer.ogl.Mesh(this.renderer.gl, {
            geometry: new Box(this.renderer.gl),
            program: this.renderer.program
        });

        setPosition(this.state, this.scene, this.state);
        setRotation(this.state, this.scene, this.state);
        setScale(this.state,  this.Box, this.state);
        setColor(this.state,  this.Box, this.renderer);

        if(['click','mouseover','mouseout','mousedown','mouseup','dblclick','mousemove']
            .some(e => this.hasEventHandler(e))) {
                this.state.events = true;
                setEvents(this.state, this.Box, this.renderer);
            };

        this.Box.setParent(this.scene);
        this.renderer.addMesh(this.Box, this);
    }

    async disconnected() {
        if(this.Box) {
            this.state.events && this.renderer.removeEvents(this.Cylinder);
            this.renderer.removeMesh(this.Box);
        }
    }
