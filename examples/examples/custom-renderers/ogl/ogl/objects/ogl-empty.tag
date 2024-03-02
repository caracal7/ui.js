<!renderer ogl-renderer>
<!import { setPosition, setRotation, setScale } from ../utils.js>

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
    rz: undefined

<!class>

    changed(attrs) {
        if(!this.scene) return;
        setPosition(attrs, this.scene, this.state);
        setRotation(attrs, this.scene, this.state);
        setScale(attrs,    this.scene, this.state);
    }

    async init() {
        setPosition(this.state, this.scene, this.state);
        setRotation(this.state, this.scene, this.state);
        setScale(this.state,    this.scene, this.state);
    }
