<!import jscadReglRenderer from jscad-regl-renderer.esm.min.js>
<!import jscadModeling from jscad-modeling.esm.min.js>

<main/>

<!style>
    main {
        width: 100%;
        height: 100%;
        margin: 0;
        outline: 1px solid black;
    }


<!static>
    // ********************
    // The design to render.
    // ********************
    function prepareSource(source) {
        const { booleans, colors, primitives } = jscadModeling; // modeling comes from the included MODELING library
        const { intersect, subtract } = booleans;
        const { colorize } = colors;
        const { cube, cuboid, line, sphere, star } = primitives;

        return (new Function(
            '{ intersect, subtract, colorize, cube, cuboid, line, sphere, star }',
            `return parameters => { ${source} }`))({
                intersect, subtract, colorize, cube, cuboid, line, sphere, star
        });
    }

<!class>

    updateSource(source, parameters = {}) {
        this.renderOptions.entities = [
            this.gridOptions,
            this.axisOptions,
            ...this.entitiesFromSolids({}, prepareSource(source)(parameters))
        ];
        this.renderer(this.renderOptions);
    }

    connected() {

        // **************************************
        // Renderer configuration and initiation.
        // **************************************

        const { prepareRender, drawCommands, cameras, controls, entitiesFromSolids } = jscadReglRenderer;

        this.entitiesFromSolids =  entitiesFromSolids;
        this.perspectiveCamera = cameras.perspective;
        const orbitControls = controls.orbit;

        const containerElement = this.$("main");

        const width = containerElement.clientWidth;
        const height = containerElement.clientHeight;

        const state = {};

        // prepare the camera
        state.camera = Object.assign({}, this.perspectiveCamera.defaults);
        this.perspectiveCamera.setProjection(state.camera, state.camera, { width, height });
        this.perspectiveCamera.update(state.camera, state.camera);

        // prepare the controls
        state.controls = orbitControls.defaults;

        // prepare the renderer
        this.renderer = prepareRender({
            glOptions: { container: containerElement },
        })

        this.gridOptions = {
            visuals: {
                drawCmd: 'drawGrid',
                show: true
            },
            size: [1000, 1000],
            ticks: [100, 25],
            color: [0, 0, 0, 1],
            subColor: [0, 0, 0, 0.2]
        }

        this.axisOptions = {
            visuals: {
                drawCmd: 'drawAxis',
                show: true
            },
            size: 300,
            // alwaysVisible: false,
            // xColor: [0, 0, 1, 1],
            // yColor: [1, 0, 1, 1],
            // zColor: [0, 0, 0, 1]
        }

        // assemble the options for rendering
        this.renderOptions = {
            camera: state.camera,
            drawCommands: {
                drawAxis:  drawCommands.drawAxis,
                drawGrid:  drawCommands.drawGrid,
                drawLines: drawCommands.drawLines,
                drawMesh:  drawCommands.drawMesh
            },

            rendering: {
                background: [0.2, 0.2, 0.2, 1],
                meshColor: [1, 0.5, 0.5, 1], // use as default face color for csgs, color for cags
                lightColor: [1, 1, 1, 1], // note: for now there is a single preset light, not an entity
                lightDirection: [0.2, 0.2, 1],
                lightPosition: [100, 200, 100],
                ambientLightAmount: 0.3,
                diffuseLightAmount: 0.89,
                specularLightAmount: 0.16,
                materialShininess: 8.0
            },
            // next few are for solids / csg / cags specifically
            overrideOriginalColors: false,


            // define the visual content
            entities: [
                this.gridOptions,
                this.axisOptions
            ]
        };

        // the heart of rendering, as themes, controls, etc change
        let updateView = true;

        const doRotatePanZoom = () => {

            if (rotateDelta[0] || rotateDelta[1]) {
                const updated = orbitControls.rotate({ controls: state.controls, camera: state.camera, speed: rotateSpeed }, rotateDelta);
                state.controls = { ...state.controls, ...updated.controls };
                updateView = true;
                rotateDelta = [0, 0];
            }

            if (panDelta[0] || panDelta[1]) {
                const updated = orbitControls.pan({ controls:state.controls, camera:state.camera, speed: panSpeed }, panDelta);
                state.controls = { ...state.controls, ...updated.controls };
                panDelta = [0, 0];
                state.camera.position = updated.camera.position;
                state.camera.target = updated.camera.target;
                updateView = true;
            }

            if (zoomDelta) {
                const updated = orbitControls.zoom({ controls:state.controls, camera:state.camera, speed: zoomSpeed }, zoomDelta);
                state.controls = { ...state.controls, ...updated.controls };
                zoomDelta = 0;
                updateView = true;
            }
        }

        const updateAndRender = timestamp => {
            doRotatePanZoom();

            if(updateView) {
                const updates = orbitControls.update({ controls: state.controls, camera: state.camera });
                state.controls = { ...state.controls, ...updates.controls };
                updateView = state.controls.changed;// for elasticity in rotate / zoom

                state.camera.position = updates.camera.position;
                this.perspectiveCamera.update(state.camera);
                this.renderer(this.renderOptions);
            }
            requestAnimationFrame(updateAndRender);
        }
        requestAnimationFrame(updateAndRender);

        // convert HTML events (mouse movement) to viewer changes
        let lastX = 0;
        let lastY = 0;

        const rotateSpeed = 0.002;
        const panSpeed = 1;
        const zoomSpeed = 0.08;
        let rotateDelta = [0, 0];
        let panDelta = [0, 0];
        let zoomDelta = 0;
        let pointerDown = false;

        const moveHandler = ev => {
            if(!pointerDown) return;
            const dx = lastX - ev.pageX;
            const dy = ev.pageY - lastY;

            const shiftKey = (ev.shiftKey === true) || (ev.touches && ev.touches.length > 2);
            if (shiftKey) {
                panDelta[0] += dx;
                panDelta[1] += dy;
            } else {
                rotateDelta[0] -= dx;
                rotateDelta[1] -= dy;
            }

            lastX = ev.pageX;
            lastY = ev.pageY;

            ev.preventDefault();
        }

        const downHandler = ev => {
            pointerDown = true;
            lastX = ev.pageX;
            lastY = ev.pageY;
            containerElement.setPointerCapture(ev.pointerId);
        }

        const upHandler = ev => {
            pointerDown = false;
            containerElement.releasePointerCapture(ev.pointerId);
        }

        const wheelHandler = ev => {
            zoomDelta += ev.deltaY;
            ev.preventDefault();
        }

        containerElement.onpointermove = moveHandler;
        containerElement.onpointerdown = downHandler;
        containerElement.onpointerup = upHandler;
        containerElement.onwheel = wheelHandler;

        this.emit('ready');
    }
