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
        if(!this.Cylinder) return;
        setPosition(attrs, this.scene, this.state);
        setRotation(attrs, this.scene, this.state);
        setScale(attrs, this.Cylinder, this.state);
        setColor(attrs, this.Cylinder, this.renderer);
        setEvents(attrs, this.Cylinder, this.renderer);
    }

    async init() {
        const { Color, Cylinder } = this.renderer.ogl;
        this.Cylinder = new this.renderer.ogl.Mesh(this.renderer.gl, {
            geometry: new Cylinder(this.renderer.gl, { radialSegments: 32 }),
            program: this.renderer.program
        });

        setPosition(this.state, this.scene, this.state);
        setRotation(this.state, this.scene, this.state);
        setScale(this.state, this.Cylinder, this.state);
        setColor(this.state, this.Cylinder, this.renderer);

        if(['click','mouseover','mouseout','mousedown','mouseup','dblclick','mousemove']
            .some(e => this.hasEventHandler(e))) {
                this.state.events = true;
                setEvents(this.state, this.Cylinder, this.renderer);
            };

        this.Cylinder.setParent(this.scene);
        this.renderer.addMesh(this.Cylinder, this);
    }

    disconnected() {
        if(this.Cylinder) {
            this.state.events && this.renderer.removeEvents(this.Cylinder);
            this.renderer.removeMesh(this.Cylinder);
        }
    }
