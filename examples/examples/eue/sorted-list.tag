
<!css sorted-list.css>

<style text(`
    :host {
        --height:       ${state.ITEM_HEIGHT}px;
        --border:       ${state.BORDER_WIDTH}px;
        --doubleborder: ${state.BORDER_WIDTH * 2}px;
        --inner:        ${state.ITEM_HEIGHT     - state.BORDER_WIDTH * 2}px;
        --halfinner:    ${state.ITEM_HEIGHT / 2 - state.BORDER_WIDTH}px;
        --block:        ${state.ITEM_HEIGHT     - state.BORDER_WIDTH * 6}px;
        --font-size:    ${state.ITEM_HEIGHT / 2 - state.BORDER_WIDTH * 3}px;
    }
`)/>


<section loop(state.tasks as task, index | d => d.id)
    enter{
        top: {
            to:         index * this.state.ITEM_HEIGHT + 'px',
            duration:   500 + index * 50,
            ease:       'easeOutBounce'
        },
        opacity: {
            from:       0,
            to:         1,
            duration:   1000 + index * 150,
            ease:       'easeOutBounce'
        },
        background:     priorityColor(task.priority)
    }
    update{
        top: {
            to:         state.DRAG?.id == task.id ? state.DRAG.dragY + 'px' : (task.index || index) * state.ITEM_HEIGHT + 'px',
            disabled:   state.DRAG?.id == task.id,
            duration:   state.DRAG?.id ? (state.DRAG?.dragY < task.index * state.ITEM_HEIGHT ? 1000 : 3000) : (task.index ? 100 + task.index * 200 : 1000),
            ease:       state.DRAG?.id ? (state.DRAG?.dragY < task.index * state.ITEM_HEIGHT ? 'easeOutBounce' : 'easeOutElastic') : 'easeOutBack'
        },
        background:     priorityColor(task.priority),
        opacity:        this.state.DRAG?.id == task.id ? 0.8 : 1,
        'box-shadow':   this.state.DRAG?.id == task.id ? '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.5)' : 'none',
        'z-index':      this.state.DRAG?.id == task.id ? 10000 : 'auto'
    }>

    <header text(task.caption)/>
    <svg @mousedown=startDrag @touchstart=startDrag>
        <path attrs{
            d:      'M -0.016 4.08 a 4.096 4.096 90 1 1 4.096 -4.096 A 4.1 4.1 90 0 1 -0.016 4.08 Z M 4.08 -10.256 a 4.096 4.096 90 1 0 -4.096 4.096 A 4.1 4.1 90 0 0 4.08 -10.256 Z m 0 20.48 a 4.096 4.096 90 1 0 -4.096 4.096 A 4.1 4.1 90 0 0 4.08 10.224 Z',
            fill:   'rgba(255,255,255,0.4)'
        }/>
    </svg>
</section>


<footer>
    <button text('Sort by priority') @click{
        state.tasks = state.tasks
            .sort((a,b) => a.priority > b.priority ? 1 : -1)
            .map((task, index) => ({ ...task, index }));
    }/>

    <button text('Sort by caption') @click{
        state.tasks = state.tasks
            .sort((a,b) => a.caption > b.caption ? 1 : -1)
            .map((task, index) => ({ ...task, index }));
    }/>
</footer>

<!state>
    tasks: [],
    ITEM_HEIGHT: 52,
    BORDER_WIDTH: 4,

    DRAG: undefined

<!static>

    const priorityColor = priority => priority == 0 ? 'red' : priority == 1 ? '#F90' : '#62b989';

    const getXY = event => event.touches ? { x: event.touches[0].pageX, y: event.touches[0].pageY } :
                                           { x: event.pageX, y: event.pageY };

<!class>

    startDrag(event, { task, index }, element) {
        this.state.DRAG = {
            datum: task,
            id: task.id,
            index: task.index || index,
            start: getXY(event),
            task_container: element.parentNode.parentNode
        };
        this.render();
    }

    stopDrag(event) {
        if(!this.state.DRAG) return;
        if(this.state.DRAG.overIndex !== undefined && this.state.DRAG.index != this.state.DRAG.overIndex) {
            this.state.DRAG.datum.index = this.state.DRAG.overIndex;
            this.state.tasks = this.state.tasks
                .sort((a,b) => a.index > b.index ? 1 : -1)
                .map(({index, ...task}) => task); // drop index property
        }
        this.state.DRAG = undefined;
        this.render();
    }

    pointerMove(event) {
        if(!this.state.DRAG) return;

        this.state.DRAG.current = getXY(event);
        const delta = this.state.DRAG.start.y - this.state.DRAG.current.y;
        this.state.DRAG.dragY = this.state.DRAG.index * this.state.ITEM_HEIGHT - delta;
        const overIndex = this.state.DRAG.index - Math.round(delta / this.state.ITEM_HEIGHT);
        if(this.state.DRAG.overIndex != overIndex) {
            this.state.DRAG.overIndex = overIndex;
            this.state.tasks.map((task, index) => {
                     if(index > this.state.DRAG.index && index < overIndex + 1) task.index = index - 1;
                else if(index < this.state.DRAG.index && index >= overIndex)    task.index = index + 1;
                else task.index = index;
            });
        }

        this.render();
        event.preventDefault();
    }

    async connected() {
        this.on('mouseup',   this.stopDrag.bind(this),    { passive: true });
        this.on('touchend',  this.stopDrag.bind(this),    { passive: true });
        this.on('mousemove', this.pointerMove.bind(this), { passive: true });
        this.on('touchmove', this.pointerMove.bind(this), { passive: true });

        this.MOCK();
        this.render();
    }


    MOCK() {
        this.state.tasks = [
            { id:1,  caption: 'Task 1',   priority: 0 },
            { id:2,  caption: 'Task 2',   priority: 2 },
            { id:3,  caption: 'Task 3',   priority: 2 },
            { id:4,  caption: 'Task 4',   priority: 1 },
            { id:5,  caption: 'Task 5',   priority: 0 },
            { id:6,  caption: 'Task 6',   priority: 2 },
            { id:7,  caption: 'Task 7',   priority: 1 },
            { id:8,  caption: 'Task 8',   priority: 0 },
            { id:9,  caption: 'Task 9',   priority: 2 },
            { id:10, caption: 'Task 10',  priority: 1 },
            { id:11, caption: 'Task 11',  priority: 0 },
            { id:12, caption: 'Task 12',  priority: 2 },
            { id:13, caption: 'Task 13',  priority: 2 },
            { id:14, caption: 'Task 14',  priority: 1 },
            { id:15, caption: 'Task 15',  priority: 0 },
            { id:16, caption: 'Task 16',  priority: 2 },
            { id:17, caption: 'Task 17',  priority: 1 },
            { id:18, caption: 'Task 18',  priority: 0 },
        ];
    }
