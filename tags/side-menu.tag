<aside>
    <ul>
        <li loop(state.menu as category | d => d.caption) class=(state.category === category.caption && 'active')>

            <header @click({ state.category = state.category !== category.caption ? category.caption : undefined })>
                <span class=(category.caption === state.category ? 'pic arrow-down' : 'pic arrow-right')/>
                <span text(category.caption)/>
            </header>

            <ul if(category.caption === state.category)>
                <li loop(category.examples as example | d => d.caption) text(example.caption)
                    class=(state.example === example.caption && 'active')
                    enter('padding-left': { to: '30px', ease: 'easeOutBounce' })
                    @click({
                        state.example = example.caption;
                        this.emitNative('select', {
                            caption: example.caption,
                            url: `/playground/examples/${category.base}/${example.url}`
                        });
                    })/>
            </ul>
        </li>
    </ul>
    <slot></slot>
</aside>

<!state>
    category: '',
    example: '',
    menu: []

<!style>

    :host {
        font-family: sans-serif;
        padding: 0;
        margin: 0;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    /* sidepanel menu */

    aside {
        color: white;
        width: 240px;
        height: calc(100% - 40px);
        background: #293949;
        position: absolute;
        font-size: 14px;
        user-select: none;
        -webkit-user-select: none;
        overflow-y: auto;

    }

    ul {
        margin: 0;
        padding: 0;

    }

    li {
        padding: 0 15px;
        margin-left: 0px;
        cursor: pointer;
        list-style-type: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    header {
        padding-top: 15px;
        padding-bottom: 15px;
    }

    aside > ul > li > ul > li {
        padding-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: none;
        opacity: 0.4;
        background: #556c83;
    }

    /* selection */

    aside > ul > li.active{
        font-weight: bold;
    }

    aside > ul > li > ul > li.active {
        opacity: 1;
        font-weight: bold;
    }

    aside > ul > li > ul > li:hover {
        opacity: 0.7;
    }
