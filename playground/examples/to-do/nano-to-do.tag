<input %value=state.default>
<button @click({ state.todos.push({ name: state.default }) })>Add to-do</button>
<button @click({ state.todos = state.todos.filter(t => !t.done) })>Remove completed</button>
<div loop(state.todos as todo | k=>k)>
    <input type="checkbox" %checked=todo.done>
    <input %value=todo.name>
</div>

<!state>
    default: 'Make the best UI DSL',
    todos: []
