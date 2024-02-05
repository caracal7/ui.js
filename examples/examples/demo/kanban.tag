

<main>
    <section loop(state.columns as column|d=>d.id) @drop @dragenter @dragleave @dragover id=column.id key=column.id class=column.class>
        <h2 text(column.caption)/>
        <article loop(state.todos.filter(t => t.column == column.id) as todo|d=>d.id)
            draggable=true
            @dragstart
            @dragend class=todo.class id=todo.id key=todo.id>
            <h3 text(todo.caption)/>
        </article>
    </section>
</main>


<!class>
    //  Cards
    dragstart(event) {
        this.state.todos.find(todo => todo.id == event.currentTarget.id).class = 'dragging';
        this.render();
        event.dataTransfer.setData('text/plain', event.currentTarget.id);
    }

    dragend(event) {
        this.state.todos.find(todo => todo.id == event.currentTarget.id).class = undefined;
        this.render();
    }
    //  Columns
    dragenter(event) {
        this.state.columns.find(column => column.id == event.currentTarget.id).class = 'drop';
        this.render();
    };

    dragleave(event) {
        this.state.columns.find(column => column.id == event.currentTarget.id).class = undefined;
        this.render();
    };

    drop(event) {
        this.state.columns.forEach(column => column.class = undefined);

        const drop_id = event.dataTransfer.getData('text/plain')
        const column_id = event.currentTarget.id;
        const todo = this.state.todos.find(todo => todo.id == drop_id);
        todo.column = column_id;
        this.render();
    }

    dragover(event) {
        event.preventDefault();
    }

    init() {
        this.state.columns.forEach(column => column.id = Math.random()/*<--replace to UUID()*/);
        this.state.todos.forEach(todo => {
            todo.column = this.state.columns[todo.column].id;
            todo.id = Math.random();/*<--replace to UUID()*/
        });
    }

<!state>
    columns: [
        { caption: 'Todo' },
        { caption: 'In Progress' },
        { caption: 'Done' }
    ],
    todos: [
        { caption: 'Todo #1', column: 0},
        { caption: 'Todo #2', column: 0},
        { caption: 'Todo #3', column: 0},
        { caption: 'Todo #4', column: 1},
        { caption: 'Todo #5', column: 1},
        { caption: 'Todo #6', column: 1},
        { caption: 'Todo #7', column: 2},
        { caption: 'Todo #8', column: 2},
        { caption: 'Todo #9', column: 2},
    ]

<!style>
    :host {
        background: #222;
        color: #FFF;
    }

    main {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }

    article {
        background: #3F4447;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 3px;
        cursor: pointer;
        width: 150px;
        height: 60px;
        cursor: grab;
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    article:active {
        cursor: grabbing;
    }

    article.dragging {
        opacity: .5;
        transform: scale(.8);
    }

    article:last-child {
        margin-bottom: 0;
    }

    section {
        min-width: 170px;
        padding: 10px;
        background: #2c2c2c;
        border: 2px solid #2c2c2c;
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        margin: 0 5px;
    }

    section.drop {
        border: 2px dashed #FFF;
    }

    section.drop article {
        pointer-events: none;
    }

    section:nth-child(8n+1) h2 { background: #75c181; }
    section:nth-child(8n+2) h2 { background: #B5222D; }
    section:nth-child(8n+3) h2 { background: #F88C30; }
    section:nth-child(8n+4) h2 { background: #58bbee; }
    section:nth-child(8n+5) h2 { background: #8A40A7; }
    section:nth-child(8n+6) h2 { background: #D4953C; }
    section:nth-child(8n+7) h2 { background: #948160; }
    section:nth-child(8n+8) h2 { background: #339496; }

    h3 {
        font-size: 21px;
        font-family: Helvetica;
        margin: 0;
    }

    h2 {
        background: green;
        margin: -10px -10px 10px;
        padding: 4px 10px;
        font-family: Helvetica;
        font-size: 21px;
    }
