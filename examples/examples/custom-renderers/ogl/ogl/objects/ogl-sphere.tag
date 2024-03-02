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
        if(!this.Sphere) return;
        setPosition(attrs, this.scene, this.state);
        setRotation(attrs, this.scene, this.state);
        setScale(attrs, this.Sphere, this.state);
        setColor(attrs, this.Sphere, this.renderer);
        setEvents(attrs, this.Sphere, this.renderer);
    }

    async init() {
        const { Color, Sphere } = this.renderer.ogl
        this.Sphere = new this.renderer.ogl.Mesh(this.renderer.gl, {
            geometry: new Sphere(this.renderer.gl, { radius: 1, widthSegments: 32 }),
            program: this.renderer.program
        });

        setPosition(this.state, this.scene, this.state);
        setRotation(this.state, this.scene, this.state);
        setScale(this.state, this.Sphere, this.state);
        setColor(this.state, this.Sphere, this.renderer);

        if(['click','mouseover','mouseout','mousedown','mouseup','dblclick','mousemove']
            .some(e => this.hasEventHandler(e))) {
                this.state.events = true;
                setEvents(this.state, this.Sphere, this.renderer);
            };

        this.Sphere.setParent(this.scene);
        this.renderer.addMesh(this.Sphere, this);
    }

    disconnected() {
        if(this.Sphere) {
            this.state.events && this.renderer.removeEvents(this.Sphere);
            this.renderer.removeMesh(this.Sphere);
        }
    }
