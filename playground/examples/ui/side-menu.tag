<aside>
    <ul>
        <li loop(state.menu as category | d => d.caption)
            class=(state.category === category.caption && 'active')>

            <header @click({ state.category = state.category !== category.caption ? category.caption : undefined }) text(category.caption)/>

            <ul if(category.caption === state.category)>
                <li loop(category.examples as example | d => d.caption) text(example.caption)
                    class=(state.example === example && 'active')
                    enter('padding-left': { to: '50px', ease: 'easeOutBounce' })
                    @click({ state.example = example })/>
            </ul>
        </li>
    </ul>
</aside>

<main>
    <h1 text(state.example.caption)/>
</main>

<!state>
    category: 'Basics',
    example: '',
    menu: [
        { caption: 'Basics', base: 'basics', examples: [
            { caption: 'Hello world', url: 'hello-world.html' },
            { caption: 'Hey i.js', url: 'hey-i.js.html' },
            { caption: 'Letters', url: 'letters.html.html' },

        ]},
        { caption: 'UI Elements', base: 'ui', examples: [
            { caption: 'Side menu', url: 'side-menu.html' },
        ]},
        { caption: 'SVG', base: 'svg', examples: [
            { caption: 'Letters SVG', url: 'letters.svg.html' },
        ]}
    ]

<!style>
    :host {
        font-family: sans-serif;
        padding: 0;
        margin: 0;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    main {
        position: absolute;
        width: calc(100% - 240px);
        height: 100%;
        right:0;
    }

    aside {
        color: white;
        width: 240px;
        height: 100%;
        background: #558361;
        position: absolute;
        font-size: 14px;
        user-select: none;
        -webkit-user-select: none;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        margin-left: 0;
        cursor: pointer;
        list-style-type: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    aside > ul > li > ul > li {
        padding-left: 30px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: none;
        opacity: 0.7;
        background: #3b5943;
    }



    ul > li.active {
        font-weight: bold;
    }

    aside > ul > li > ul > li.active {
        opacity: 1;
    }

    aside > ul > li > ul > li:hover {
        color: yellow;
    }

    header {
        padding-top: 15px;
        padding-bottom: 15px;
        margin-left: 15px;
    }
