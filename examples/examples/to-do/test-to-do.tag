
<header class="header">
	<h1 text(state.counter)/>
	<input class="new-todo" autofocus autocomplete="off" placeholder="What to do?" @keyup{
		if(event.keyCode === 13) {
			state.counter++;
			state.todos.push({ id: state.counter, title: state.todo, completed: false });
			state.todo = event.target.value = '';
		} else state.todo = event.target.value;
	}>
</header>
<section class="main" if(state.todos.length)>
	<ul class="todo-list">
		<li loop(filters(state) as todo| d => d.id) text(todo.title) class=({
				var s = '';
				if(todo.completed) s+= 'completed';
				if(state.editedTodo === todo) s+= ' editing';
				return s;
			})>
			<div class="view">
				<input class="toggle" type="checkbox" checked=todo.completed @input{
					todo.completed = event.target.checked
				}>
				<label @dblclick{
					this.beforeEditCache = todo.title;
					state.editedTodo = todo;
				} text(todo.title)/>
				<button class="destroy" @click{
					state.todos.splice(state.todos.findIndex(x => x.id === todo.id), 1);
				}></button>
			</div>
			<input class="edit" type="text" @blur{
				if (!state.editedTodo) return;
				state.editedTodo = null;
				todo.title = event.target.value.trim();
				if (!todo.title) state.todos.splice(state.todos.findIndex(x => x.id === todo.id), 1);
			} @keyup{
				if(event.keyCode === 27) { // escape
					state.editedTodo = null;
					event.target.value = todo.title = this.beforeEditCache;
				};
				if(event.keyCode === 13) {
					if (!state.editedTodo) return;
					state.editedTodo = null;
					todo.title = event.target.value.trim();
					if (!todo.title) state.todos.splice(state.todos.findIndex(x => x.id === todo.id), 1);
				}
			} value=todo.title>
		</li>
	</ul>
</section>
<footer class="footer" if(state.todos.length)>
	<span class="todo-count">
		<strong text(state.todos.filter(x => !x.completed).length)/>
		<span text(state.counter == 1 ? ' item ' : ' items ')/>
		left
	</span>
	<ul class="filters">
		<li><a class=(state.visibility === 'all' && 'selected')       @click{state.visibility='all'}>All</a></li>
		<li><a class=(state.visibility === 'active' && 'selected')    @click{state.visibility='active'}>Active</a></li>
		<li><a class=(state.visibility === 'completed' && 'selected') @click{state.visibility='completed'}>Completed</a></li>
	</ul>
	<button class="clear-completed" @click{
		state.todos = state.todos.filter(x => !x.completed)
	} if(state.todos.filter(x=>x.completed).length)>
		Clear completed
	</button>
</footer>

<!static>
	const filters = state => {
		if(state.visibility === 'all')       return state.todos;
		if(state.visibility === 'active')    return state.todos.filter(todo => !todo.completed);
		if(state.visibility === 'completed') return state.todos.filter(todo => todo.completed);
	}

<!css test-to-do.css>

<!state>
	todo: '',
	visibility: 'all',
	counter: 5,
	editedTodo: null,
	todos: [
        {id: 0, title: "Shave the Yak", completed: true},
        {id: 1, title: "Big Rewrite", completed: false},
        {id: 2, title: "Debug errors", completed: false},
        {id: 3, title: "Procrastinate", completed: false},
        {id: 4, title: "Argue about indentation", completed: false},
        {id: 5, title: "Indent using spaces", completed: false}
    ]

<!class>
/*
<li><a href="#/all"       class=(state.visibility === 'all' && 'selected')       @click{state.visibility='all'}>All</a></li>
<li><a href="#/active"    class=(state.visibility === 'active' && 'selected')    @click{state.visibility='active'}>Active</a></li>
<li><a href="#/completed" class=(state.visibility === 'completed' && 'selected') @click{state.visibility='completed'}>Completed</a></li>


	connected() {
		window.addEventListener('hashchange', () => {
			var visibility = window.location.hash.replace(/#\/?/, '');
			if(visibility !== this.state.visibility) {
				this.state.visibility = visibility;
				this.render();
			}
		});
	}
*/
