<!tag @shadertoy shadertoy>
<!import shaders from shaders.examples.js>
<!tag @window ../../ui/window.tag>

<@shadertoy fragment=state.fragment/>

<@window caption='Code' width='500px' height='500px' left='500px' top='30px' overflow='auto'>
    <pre text(state.fragment)/>
</@window>

<@window caption='Shadertoys' width='250px' height='300px' overflow='auto'>
    <ul>
        <li loop(state.shaders as shader|d=>d)
            text(shader.name)
            @click{ state.fragment = shader.source }/>
    </ul>
</@window>


<!state>
    fragment: ``,
    shaders: []

<!class>
    connected() {
        this.state.shaders = Object.entries(shaders)
            .map(([ name, source ])=>({ name, source }))
            .sort((a,b) => a.name > b.name ? 1 : -1);

        this.state.fragment = shaders.Beautypi;
        this.render();
    }


<!style>

    li {
        text-align: left;
        white-space: nowrap;
        margin: 6px;
        line-height: 18px;
        font-size: 14px;
        border-radius: 4px;
    }

    li:hover {
        background: gold;
        cursor: pointer;
    }

    pre {
        user-select: auto;
        -webkit-user-select: auto;
    }
