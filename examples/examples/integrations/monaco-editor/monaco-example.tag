<!tag @monaco-editor ui-monaco/monaco-editor.tag>
<!tag @window ../../ui/window.tag>


<@window caption='Read only' width='400px' height='335px' left='10px' top='130px'>
    <@monaco-editor value=state.CSS read-only language='css'/>
</@window>

<@window caption='Monaco' left='430px' width='500px' height='500px' top='40px'>
    <@monaco-editor value=state.SOURCE language='ui.js' @ready{} @change{ console.log( event.detail) }/>
</@window>


<!state>
    SOURCE: `
<input %value=state.default>
<button @click{ state.todos.push({ name: state.default }) }>Add</button>
<button @click{ state.todos = state.todos.filter(t => !t.done) }>Remove completed</button>
<div loop(state.todos as todo | k=>k)>
    <input %checked=todo.done type="checkbox">
    <input %value=todo.name>
</div>
<!`+`state>
    default: 'Make the best UI DSL',
    todos: []
`,
    CSS: `
    button {
        font-size: 12px;
        line-height: normal;
        -webkit-font-smoothing: inherit;
        -moz-osx-font-smoothing: inherit;
        -webkit-appearance: none;
        border: 0;
        display:inline-block;
        padding:0.7em 1.7em;
        margin:0.3em 0 0.3em 0.3em;
        border-radius:0.4em;
        box-sizing: border-box;
        text-decoration:none; 
        font-family:'Roboto',sans-serif;
        font-weight:400;
        color:#FFFFFF;
        background-color:#2ECC71;
        box-shadow:inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
        text-align:center;
        position:relative;
    }
    button:active:enabled {
        box-shadow:inset 0 0.6em 2em -0.3em rgba(0,0,0,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
    }
    button:disabled {
        background-color: #ffffff!important;
        background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ececec' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")!important;
        color:#ddd!important;
    }
`
<!style>
    :host {
        display: block;
        width: 100%;
        height: 100%;
        background:
            radial-gradient(#aaaaaa 15%, transparent 16%) 0 0,
            radial-gradient(#aaaaaa 15%, transparent 16%) 8px 8px,
            radial-gradient(rgba(0, 0, 0, .1) 15%, transparent 20%) 0 1px,
            radial-gradient(rgba(0, 0, 0, .1) 15%, transparent 20%) 8px 9px;
        background-color: #898989;
        background-size: 16px 16px;
    }
    input, button {
        box-sizing: border-box;
        width: 100%;
        background: #eeffff;
        padding: 5px 10px;
        margin: 5px 0!important;
    }
