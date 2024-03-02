<!tag @shadertoy shadertoy>
<!import shaders from shaders.examples.js>
<!tag @window ../../ui/window.tag>

<!tag @split ../../ui/splitter.tag>



<@split horizontal>
    <@split auto>
        <@split vertical>
            <@split auto>
                <@shadertoy fragment=state.fragment/>
            </@split>
            <@split height="30px" style="background: lightgreen">
                <button text((state.examples ? 'Hide' : 'Show' )+' examples')        @click{
                    state.examples = !state.examples
                }/>
                <button text((state.source   ? 'Hide' : 'Show' )+' shader source')   @click{
                    state.source = !state.source;
                    setTimeout(() => window.dispatchEvent(new Event('resize'), 0));
                }/>
            </@split>
        </@split>
    </@split>
    <@split separator   if(state.source)/>
    <@split width="40%" if(state.source)>
        <pre text(state.fragment)/>
    </@split>
</@split>

<@window caption='Shadertoys' top='15px' left='15px' width='250px' height='300px' overflow='auto' if(state.examples) @close{ state.examples = !state.examples }>
    <div
        loop(state.shaders as shader | d => d)
        text(shader.name)
        class=(state.selected == shader.name && 'selected')
        @click{
            state.selected = shader.name;
            state.fragment = shader.source;
        }/>
</@window>


<!state>
    selected: 'Truchet Tentacles',
    fragment: "",
    shaders: [],
    examples: true,
    source: false

<!class>
    connected() {
        this.state.shaders = Object.entries(shaders)
            .map(([ name, source ])=>({ name, source }))
            .sort((a,b) => a.name > b.name ? 1 : -1);
        this.state.fragment = shaders[this.state.selected];
        this.render();
    }


<!style>

    div {
        padding-left: 10px;
        white-space: nowrap;
        line-height: 20px;
        font-size: 14px;
        border-radius: 4px;
    }

    div:hover {
        background: gold;
        cursor: pointer;
    }

    .selected {
        background: lightgreen;
    }

    pre {
        user-select: auto;
        -webkit-user-select: auto;
    }

    button {
        width: 50%;
        height: 30px;
        background: #015E5B;
        color: white;
        box-shadow:inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
        border: 0;
        font-size: 15px;
        cursor: pointer;
    }

    button:hover {
        background: #009a95;
    }
