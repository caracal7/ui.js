<!renderer ogl-renderer>

<!state>
    count: 10,
    cell: 10,
    x: undefined,
    y: undefined,
    z: undefined

<!class>

    changed(attrs) {
        if(this.mesh) {
            if(
                attrs.hasOwnProperty('x') ||
                attrs.hasOwnProperty('y') ||
                attrs.hasOwnProperty('z')
            ) this.scene.position.set(this.state.x || 0, this.state.y || 0, this.state.z || 0);
        }
    }

    async init() {
        const Color = this.renderer.ogl.Color;

        const gridSize = this.state.cell * this.state.count;
        const cellSize = gridSize / this.state.count;

        this.grid  = new this.renderer.ogl.GridHelper(this.renderer.gl, { size: gridSize, divisions: gridSize / cellSize, color: new Color(0.5, 0.5, 0.5) });
        this.grid2 = new this.renderer.ogl.GridHelper(this.renderer.gl, { size: gridSize, divisions: gridSize / cellSize, color: new Color(0.3, 0.3, 0.3) });
        this.grid2.position.x = cellSize / 2;
        this.grid2.position.z = cellSize / 2;
        this.grid.setParent(this.scene);
        this.grid2.setParent(this.scene);
        this.scene.position.set(this.state.x || 0, this.state.y || 0, this.state.z || 0);
    }

    disconnected() {
        if(this.mesh && this.renderer) {
            this.grid.setParent(null);
            this.grid2.setParent(null);
        }
    }
