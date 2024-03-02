<!tag @ogl          ogl/ogl-renderer>
<!tag @axes-helper  ogl/helpers/ogl-axes>
<!tag @grid-helper  ogl/helpers/ogl-grid>

<!tag @empty        ogl/objects/ogl-empty>
<!tag @model        ogl/objects/ogl-model>
<!tag @text         ogl/objects/ogl-text>
<!tag @sphere       ogl/objects/ogl-sphere>
<!tag @box          ogl/objects/ogl-box>
<!tag @cylinder     ogl/objects/ogl-cylinder>


<@ogl id="OGL"
    @contextmenu=unselectModel

    cx = 40
    cy = 35
    cz = 18
    style{ cursor: state.modelPicked ? 'move' : state.modelHovered ? 'pointer' : 'auto' }>
    <@grid-helper/>
    <@axes-helper/>



    <@box x=-20 color="red" scale=3 ry=state.cubeRotation
        @click{ state.boxes = [{ key: performance.now() }] /* remove old and add new element */ }>
        <@text text='Click me' ry=state.cylinderRotation y=4 color="green" font='assets/FiraSans-Bold.json' texture='assets/FiraSans-Bold.png'/>


        <@sphere x=-10 scale=3 ry=state.sphereRotation
            @mouseover{ state.eventMessage = 'mouseover' }
            @mouseout{  state.eventMessage = 'mouseout' }
            @mousedown{ state.eventMessage = 'mousedown' }
            @mouseup{   state.eventMessage = 'mouseup' }
            @click{     state.eventMessage = 'click' }
            @dblclick{  state.eventMessage = 'dblclick' }>
            <@text
                billboard = true
                text      = state.eventMessage
                font      = 'assets/FiraSans-Bold.json'
                texture   = 'assets/FiraSans-Bold.png'
                x         = 0
                y         = 5/>
            <@cylinder x=-5 sx=3 sy=8 sz=3 rx=state.cylinderRotation>
                <@box
                    loop(state.boxes as box, index | d => d.key)
                    y = 4
                    #exit{
                        color:  '#'+(Math.random()*0x00FFFF<<0).toString(16).padStart(6, "0"),
                        scale: { from: 0.2, to: Math.random()*2+0.2, ease: 'easeOutElastic', duration: 3000  },
                        rx:    { to: Math.random() * 10, duration: 3000 },
                        ry:    { to: Math.random() * 10, duration: 3000 },
                        rz:    { to: Math.random() * 10, duration: 3000 },
                        x:     { to: Math.random() * 4 - 2 },
                        y:     { to: 20, duration: 3000, ease: 'easeOutBounce' },
                        z:     { to: Math.random() * 4 - 2 }
                    }/>
            </@cylinder>
        </@sphere>

    </@box>











    <@model ry=0.5
        json = state.json
        texture = state.texture
        color = (state.modelPicked ? 'red' : state.modelHovered ? '#444444' : 'black')
        x = state.modelPos.x
        z = state.modelPos.z
        #update{
            scale: { from: 0.5, to: state.modelSize, ease: 'easeOutElastic', duration: 1500 }
        }
        @mousedown=selectModel
        @mouseover{ state.modelHovered = true }
        @mouseout{  state.modelHovered = false }>
        <@text text='Move me' billboard=true y=-1 font='assets/FiraSans-Bold.json' texture='assets/FiraSans-Bold.png'/>
    </@model>

    <@model json='assets/airplane.json' texture='assets/airplane.jpg' y=7 z=-10 scale=3
        #update{
            x: { to: state.planeX, ease: state.planeEase, duration: state.planeDuration }
        }
        @mouseover{
            state.planeX = -state.planeX;
            state.planeEase = 'easeOutElastic';
            state.planeDuration = 1500;
        }/>

    <@model json='assets/forest.json' texture='assets/forest.jpg' scale=8 x=5 z=-10/>

</@ogl>





<!state>
    cubeRotation: 0,
    sphereRotation: 0,
    cylinderRotation: 0,

    planeX: 20,
    planeEase: 'easeInOutCubic',
    planeDuration: 5000,

    eventMessage: '',
    boxes: [{ key: 0 }],

    modelSize: 1,
    modelHovered: false,
    modelPicked: false,
    modelPos: {
        x: 5,
        z: 5
    },

    updown: -1,

    json: 'assets/fox.json',
    texture: 'assets/fox.jpg'


<!class>

    selectModel(){
        const dot = this.OGL.raycast.intersectPlane({ origin: [0,0,0], normal: [0,1,0] });
        if(!dot) return; // parallel to the plane as intersecting
        this.model_x_offset = this.state.modelPos.x - dot[0];
        this.model_z_offset = this.state.modelPos.z - dot[2];
        this.state.modelHovered = false;
        this.state.modelPicked = true;
        this.render();
        this.OGL.controls.enabled = false;
    }

    unselectModel(){
        this.state.modelPicked = false;
        this.render();
        this.OGL.controls.enabled = true;
    }

    moveModel(){
        if(!this.state.modelPicked) return;
        const dot = this.OGL.raycast.intersectPlane({ origin: [0,0,0], normal: [0,1,0] });
        if(!dot) return; // parallel to the plane as intersecting
        this.state.modelPos.x = dot[0] + this.model_x_offset;
        this.state.modelPos.z = dot[2] + this.model_z_offset;
        this.render();
    }

    connected() {
        this.OGL = this.$('#OGL');

        this.on('mouseup', this.unselectModel);
        this.on('mousemove', this.moveModel)

        // modelSize of each model in this example must be different to trigger the UPDATE from 0.5 to new modelSize
        const models = [
            { json: 'assets/acorn.json',    texture: 'assets/acorn.jpg',    modelSize: 12 },
            { json: 'assets/croissant.json',texture: 'assets/croissant.jpg',modelSize: 2 },
            { json: 'assets/goat.json',     texture: 'assets/goat.jpg',     modelSize: 3 },
            { json: 'assets/macaw.json',    texture: 'assets/macaw.jpg',    modelSize: 6 },
            { json: 'assets/octopus.json',  texture: 'assets/octopus.jpg',  modelSize: 5},
            { json: 'assets/fox.json',      texture: 'assets/fox.jpg',      modelSize: 1.5 },
            { json: 'assets/airplane.json', texture: 'assets/airplane.jpg', modelSize: 2.1 },
        ]


        const update = (t) => {
            this.state.cubeRotation += 0.005;
            this.state.sphereRotation += 0.02;
            this.state.cylinderRotation += 0.03;
            this.render();
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);



        setInterval(() => {
            if(this.state.modelPicked) return; // not to change the model if it is selected
            const model = models[Math.floor(Math.random() * models.length)];
            this.state = {...this.state, ...model };
            this.render();
        }, 1500);

        setInterval(() => {
            this.state.planeX = -this.state.planeX;
            this.state.planeEase = 'easeInOutCubic';
            this.state.planeDuration = 5000;
            this.render();
        }, 6000);
    }
