<!import demo from jscad-example.js>

<!tag @jscad jscad.tag>
<!tag @window ../../ui/window.tag>
<!tag @monaco-editor ../../integrations/monaco-editor/ui-monaco/monaco-editor.tag>

<!css ../../../assets/button.css>


<@window caption='Code' width='500px' height='500px'>
    <@monaco-editor value=state.example @change{ state.example = event.detail }/>
</@window>


<@window caption='Code' left='550px' width='100px' height='60px'>
    <button @click{ this.$('#jscad').updateSource(state.example, { scale: 1 }); } text('Redraw')/>
</@window>

<@jscad id='jscad' @ready/>


<!state>
    example: ''

<!static>
    const source = demo.toString().substring(demo.toString().indexOf('{')+1, demo.toString().lastIndexOf('}'));

<!class>
    ready() {
        this.$('#jscad').updateSource(source, { scale: 1 })
    }

    connected() {
        this.state.example = source;
        this.render();
    }
