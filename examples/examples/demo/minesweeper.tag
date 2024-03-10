<section loop(state.field as row, y | d => d[0].y)>
    <div loop(row as cell, x | d => d.x)
        enter{
            top:  { from: length * 15 + 'px', to: y * 30 + 'px', duration: Math.abs(x - length / 2) * Math.abs(y - length / 2) * 10 + 200 },
            left: { from: length * 15 + 'px', to: x * 30 + 'px', duration: Math.abs(x - length / 2) * Math.abs(y - length / 2) * 10 + 200 },
        }>
        <i if(cell.mine && (cell.visible || state.state == 'lose')) text('💣')/>
        <span if(cell.fail) text('❌')/>
        <b if(!cell.mine && cell.count && (cell.visible || state.state == 'lose')) text(cell.count)
            style{
                color: colors[cell.count],
                opacity: state.state == 'lose' ? 0.3 : 1,
                'font-size': state.state == 'lose' ? '10px' : '14px'
            }
            enter{
                scale: { to: 1, duration: 1500, ease: 'easeOutBounce' }
            }/>

        <u if(!cell.visible && state.state != 'lose')
            @click{
                if(state.state != 'playing') {
                    placeMines(this.state.field, x, y);
                    state.state = 'playing';
                }
                cell.visible = true;
                if(cell.mine) {
                    cell.fail = true;
                    state.state = 'lose';
                } else {
                    reveal(y, x, state.field, true);
                    if(visibleCount(state.field) == length * length - minesCount) state.state = 'win';
                }
            }
            enter{ opacity: { to: 1 } }
            exit{
                opacity: { to: 0, duration: Math.abs(x - length / 2) * Math.abs(y - length / 2) * 20 + 200 }
            }/>
    </div>
</section>

<aside if(['lose', 'win'].includes(state.state)) text('You ' + state.state) @click=reset
    style{
        width: length * 30 + 'px',
        height: length * 30 + 'px'
    }
    enter{
        'font-size': { to: '50px', duration: 1500, ease: 'easeOutBounce' }
    }
    exit{
        'font-size': { to: '5px', duration: 300 }
    }/>


<!state>
    field: [],
    state: 'idle'

<!static>
    const colors = ['', 'white','#3dc6db','#a8ec43','#0bf28e','rgb(227, 230, 147)','rgb(238, 146, 144)','rgb(132, 132, 241)','rgb(255, 0, 251)'];


    const length = 20;
    const minesCount = 50;

    const placeMine = (field, x, y) => {
        field[y][x].mine = true;
        for (const [y0, x0] of [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]])
            field[y + y0]?.[x + x0] &&
            field[y + y0][x + x0].count++;
    };

    const placeMines = (field, _x = 0, _y = 0) => {
        let placed = 0;
        while (placed < minesCount) {
            let y = Math.floor(Math.random() * length);
            let x = Math.floor(Math.random() * length);
            if (y != _y && _x != x && !field[y][x].mine) {
                placeMine(field, x, y);
                placed++;
            }
        }
    };

    const reveal = (row, col, field, numbers) => {
        for (const [r, c] of [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]]) {
//        for (const [r, c] of [[-1, 0],[0, -1],[0, 1],[1, 0]]) {
            const cell = field[row + r]?.[col + c];
            if(!cell || cell.visible || cell.mine) continue;
            if(numbers && cell.count) continue;
            cell.visible = true;
            if (cell.count === 0) reveal(row + r, col + c, field, false);
        }
    }

    const visibleCount = field => field.reduce((a, r) => a + r.reduce((a, v) => a + !!v.visible, 0), 0);

<!class>
    // Based on https://minesweeper-minimal.surge.sh/
    reset() {
        this.state.state = 'idle';
        this.state.field = Array.from({ length }).map((_, y) => Array(length).fill({}).map((_, x) => ({
            x, y, count: 0
        })));
        this.render();
    }

    connected() {
        this.reset();
    }



<!style>
    :host {
        position: absolute;
        background: #1f2937;
        width: 100%;
        height: 100%;
    }

    div {
        position: absolute;
        width: 28px;
        height: 28px;
        justify-content: center;
        display: inline-flex;
        align-items: center;
        background: #374151;
    }

    span {
        position: absolute;
        font-size: 12px;
    }

    b {
        font-family: Arial;
    }

    i {
        font-size: 25px;
        width: 28px;
        height: 28px;
        text-align: center;
        animation: blink 1s linear infinite;
    }



    @keyframes blink {
        0% { scale: 1; }
        50% { scale: 0.5; }
        100% { scale: 1; }
    }


    u {
        position: absolute;
        width: 28px;
        height: 28px;
        background: #6b7280;
        transition: background 0.8s;
        cursor: pointer;
    }

    u:hover {
        transition: none;
        background: #ffffff77;
    }

    aside {
        position: absolute;
        z-index: 100;
        color: white;
        background: #6b728022;
        font-family: Arial;

        justify-content: center;
        display: inline-flex;
        align-items: center;
    }
