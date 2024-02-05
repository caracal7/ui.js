<!tag @masonry masonry>


<@masonry
    width=state.width
    animation=state.animation
    padding=state.padding

    stiffness=state.stiffness
    damping=state.damping
    mass=state.mass

    enter_stiffness=state.enter_stiffness
    enter_damping=state.enter_damping
    enter_mass=state.enter_mass
>
    <section>
        <button @click{ state.animation = !state.animation } text("Animation: "+state.animation)/><br>
        <button @click{ state.flag = !state.flag }>Toggle #3</button><br>
        <button @click{
            [ state.mysec[0], state.mysec[1] ] = [ state.mysec[1], state.mysec[0] ];
        }>Swap sections 1</button><br>
        <button @click{
            [ state.mysec[0], state.mysec[2] ] = [ state.mysec[2], state.mysec[0] ];
        }>Swap sections 2</button><br>
        <button @click{ state.width = state.width == 200 ? 250 : 200 } text("Width: "+state.width)/><br>


        <input type="range" min=1 max=4 %value=state.size><span text('#2 height = '+state.size)/><br>
        <input type="range" min=0 max=20 %value=state.padding step=10><span text('padding = '+state.padding)/>

    </section>
    <section w=2 h=state.size style{ 'text-align': 'left'}>
            <b>Update animation settings</b><br>
            <input type="range" min=1 max=10 step=1 %value=state.stiffness><span text('Stiffness = '+state.stiffness)/><br>
            <input type="range" min=0.1 max=2 step=0.1 %value=state.damping><span text('Damping = '+state.damping)/><br>
            <input type="range" min=0.05 max=0.5 step=0.05 %value=state.mass><span text('Mass = '+state.mass)/><br>
            <b>Enter animation settings</b> <button @click{ state.flag = !state.flag }>Enter/exit #3</button><br>
            <input type="range" min=1 max=10 step=1 %value=state.enter_stiffness><span text('Stiffness = '+state.enter_stiffness)/><br>
            <input type="range" min=0.1 max=2 step=0.1 %value=state.enter_damping><span text('Damping = '+state.enter_damping)/><br>
            <input type="range" min=0.05 max=0.5 step=0.05 %value=state.enter_mass><span text('Mass = '+state.enter_mass)/><br>

    </section>
    <section w=3 h=2 if(state.flag)>
        #3
    </section>
    <section w=4>
        #4
    </section>
    <section w=2>
        #5
    </section>
    <section h=2>
        #6
    </section>
    <section loop(state.mysec as item,i | d => d.name)
        text(item.name)
        style{
            background: item.color,
            border: item.width+'px dashed #00000033'
        }/>
    <section h=2>
        #8
    </section>
    <section w=2 h=2>
        #9
    </section>
    <section>
        #10
    </section>
    <section>
        #11
    </section>
    <section h=2>
        #12
    </section>
    <section>
        #13
    </section>
</@masonry>

<!static>

<!state>
    padding: 10,
    width: 200,
    animation: true,
    flag: true,
    size: 1,
    mysec: [
        { name: 'Swap 1', width: 10,  color: '#4be96e' },
        { name: 'Swap 2', width: 20, color: '#d78d2f' },
        { name: 'Swap 3', width: 40, color: '#319dba' },
    ],

    stiffness: 4,
    damping: 0.7,
    mass: 0.1,

    enter_stiffness: 10,
    enter_damping: 0.8,
    enter_mass: 0.05,


<!style>


    :host {
        display: block;
        position: relative;
        width: 100%;
        min-height: 100%;
        height: fit-content;
        box-sizing: border-box;
        font: 12px arial;
    }

    section {
        padding: 5px;
        text-align: center;
        border-color: #00000033;
        border-style: solid;
        border-width: 10px;
    }

    input[type="range"] {
        width: 70px;
    }

    button {
        width: 100%;
    }

    section:nth-child(8n+1) { background-color: #75c18177; }
    section:nth-child(8n+2) { background-color: #B5222D77; }
    section:nth-child(8n+3) { background-color: #F88C3077; }
    section:nth-child(8n+4) { background-color: #58bbee77; }
    section:nth-child(8n+5) { background-color: #8A40A777; }
    section:nth-child(8n+6) { background-color: #D4953C77; }
    section:nth-child(8n+7) { background-color: #94816077; }
    section:nth-child(8n+8) { background-color: #33949677; }
