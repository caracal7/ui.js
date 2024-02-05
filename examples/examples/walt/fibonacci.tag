<p enter{ opacity: { to: 1 } }>
    <h2>Naive fibonacci - WASM vs JavaScript</h2>

    <blockquote>Close console for max perfomance. Less is better!</blockquote>

    <h4>WASM</h4>

    <button loop([32,33,34,35,36,37,38,39,40,41,42] as N| d => d) text('N = ' + N)
        style{background:'hsl('+((N-32)*25)+', 60%, 50%)'}
        @click=this.test(this.walt.fibonacci, N, 'WASM')/>

    <h4>JavaScript</h4>

    <button loop([32,33,34,35,36,37,38,39,40,41,42] as N| d => d) text('N = ' + N)
        style{background:'hsl('+((N-32)*25)+', 60%, 50%)'}
        @click=this.test(fibonacci, N, 'JavaScript')/>


    <h4>Results </h4>



    <table cellspacing=1 cellpadding=0>
        <tr loop(state.stat as item, i| d => d.date) exit{ opacity: { from:1, to: 0, duration: 30+i*50 } }>
            <td text(item.engine) class=item.engine/>
            <td text('N = '+item.n) style(background: 'hsl('+((item.n-32)*25)+', 60%, 50%)', color: 'white')/>
            <td text(Math.round(item.time)+' ms')/>
            <td>
                <div class=item.engine text(Math.round(item.time)) enter{
                    opacity: { to: 1 },
                    width: { to: Math.round(item.time / 2)+'px', ease: 'easeOutBounce' }
                }></div>
            </td>
        </tr>
    </table>

    <p text('Total tests: '+state.stat.length) if(state.stat.length) enter{opacity: { to: 1 }}/>

    <button @click{ this.state.stat = [] } if(state.stat.length) style(background:'red')>
        Clear
    </button>
</p>

<!state>
    stat: []

<!class>
    test(fn, n, engine) {
        var start = window.performance.now();
        const result = fn(n);
        var now = window.performance.now();
        this.state.stat.unshift({ date: +new Date(), n, engine, result, time: now - start });
        this.render();
    }

<!static>
    function fibonacci(n) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

<!walt>
    export function fibonacci(n: i32): i32 {
        if (n == 0) return 0;
        if (n == 1) return 1;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

<!css ../../assets/button.css>

<!style>
    td { padding-left: 10px; padding-right: 10px; white-space: nowrap }
    div { height: 15px; font-size: 13px; text-align: right;padding: 3px; margin: 1px; }
    .JavaScript { background-color: gold; color: black; }
    .WASM { background-color: steelblue; color: white; }
