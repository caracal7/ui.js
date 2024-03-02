<main class=(!state.big && 'small')>
    <slot/>
</main>


<div class='button' if(!state.big) @click{ state.opened = true }>☰</div>

<aside if(state.big || state.opened)
    enter{
        left: { from: '-100px', to: '0px', duration: 500, ease: 'easeOutQuint' }
    }>

    <h2><a href='../index.html'>ui.js</a> by example</h2>

    <ul>
        <li loop(state.menu as category | d => d.caption)
            class=(state.category === category.caption && 'active')>

            <header @click{
                state.category = state.category !== category.caption ? category.caption : undefined;
            }>
                <span class=(category.caption === state.category ? 'arrow-down' : 'arrow-right')/>
                <span text(category.caption)/>
            </header>

            <ul if(category.caption === state.category)>
                <li loop(category.submenu as example | d => d.caption)
                    class=(state.example === example.caption && 'active')
                    enter{
                        'padding-left': { to: '50px', ease: 'easeOutBounce' }
                    }>

                    <header if(example.submenu)
                        class=(state.example === example.caption ? 'submenu active' : 'submenu')
                        @click{ state.category2 = state.category2 !== example.caption ? example.caption : undefined }>
                        <span class=(example.caption === state.category2 ? 'arrow-down' : 'arrow-right')/>
                        <span text(example.caption)/>
                    </header>

                    <div class='caption' if(!example.submenu) text(example.caption) @click{
                        state.example = example.caption;
                        state.example2 = undefined;
                        this.emit('select', example);
                    }/>
                    <ul if(example.caption === state.category2)>
                        <li loop(example.submenu as submenu | d => d.caption)
                            class=(state.example2 === submenu.caption ? 'caption active' : 'caption')
                            text(submenu.caption)
                            @click{
                                state.example = undefined;
                                state.example2 = submenu.caption;
                                this.emit('select', submenu);
                            }/>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</aside>



<!state>
    category: '',
    category2: '',
    example: '',
    example2: '',
    menu: [],
    big: true,
    opened: false,

<!class>
    connected() {
        console.log('connected')
        const resize = () => {
            const mq = window.matchMedia( "(min-width: 600px)" );
            this.state.big = mq.matches;
            this.state.opened = false;
            this.render();
        };

        this.on('resize', resize);
        resize();
    }

<!style>

    h2 {
        font-weight: normal;
        text-align: center;
    }

    :host {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        font-family: sans-serif;
        padding: 0;
        margin: 0;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    .arrow-right, .arrow-down  {
        margin-left: 20px;
        margin-right: 15px;
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
    }

    .arrow-right {
        margin-top: -3px;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 6px solid rgba(255, 255, 255, 0.2);
    }

    .arrow-down {
        margin-left: 16px;
        margin-right: 13px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid white;
    }

    .button {
        position: absolute;
        bottom:0px;
        left:0px;
        width:40px;
        height:40px;
        cursor: pointer;
        background: black;
        border: 3px solid gold;
        border-radius: 8px;
        color: gold;
        font-size:30px;
        line-height: 40px;
        text-align: center;
    }

    aside {
        color: white;
        width: 240px;
        height: 100%;
        background: #293949;
        position: absolute;
        font-size: 14px;
        user-select: none;
        -webkit-user-select: none;
        overflow-y: auto;

        -ms-overflow-style: none;
        scrollbar-color: transparent transparent; /*just hides the scrollbar for firefox */
        scrollbar-width: none;
    }

    aside::-webkit-scrollbar {
        display: none;
    }
    aside::-moz-scrollbar {
        display: none;
    }

    main {
        display:block;
        width: calc(100% - 240px);
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
    }

    main.small {
        width: 100%;
    }

    header {
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .caption, .submenu  {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .submenu {
        padding-left: 0;
        margin; 0;
    }

    .submenu .arrow-right {
        margin-left: -22px;
    }

    .submenu .arrow-down {
        margin-left: -25px;
    }


    ul {
        margin: 0;
        padding: 0;
    }

    li {
        margin-left: 0;
        cursor: pointer;
        list-style-type: none;
    }




    ul > li > ul > li {
        padding-left: 30px;

        border-bottom: none;

        background: #293137;
        color:#999999;
    }

    ul > li > ul > li > ul > li {
        padding-left: 10px;
    }

    /* selection */

    .active {
        font-weight: bold;
        opacity: 1;
        color: white;
    }

    .caption:hover {
        opacity: 1;
        color: gold;
    }

    a {
        font-weight: bold;
        color: gold;

    }
