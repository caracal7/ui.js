<!tag @side-menu side-menu>


<header class="top">
    <span><b>i</b><b style='color: #448ead'>.js</b> ❤️ playground</span>
    <a href="index.html">API</a> | <a href="playground.html">Playground</a> | <a href="https://github.com/caracal7/i.js">GitHub</a>
</header>

<@side-menu menu=state.menu category=state.category example=state.example @select></@side-menu>

<playground-accordion>
    <header>Result</header>
    <section>
        <iframe sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin" frameborder="0"></iframe>
    </section>

    <header>
        Source:
        <span text(state.url) enter(opacity:{ to: 0.7, duration: 2000}) style('pointer-events':'none')/>
    </header>
    <section>
        <monaco-editor></monaco-editor>
    </section>
</playground-accordion>

<!state>
    example: 'Hey i.js',
    category: '',
    url: '',
    menu: []


<!class>
    connected() {
        //  Load default example
        setTimeout(() => {
            const category = this.state.menu.find(i => i.examples.find(e => e.caption === this.state.example));
            if(!category) throw `Example not found: "${this.state.example}"`;
            const example = category.examples.find(e => e.caption === this.state.example);
            this.state.category = category.caption;
            this.select({}, { detail: {
                caption: this.state.example,
                url: `playground/examples/${category.base}/${example.url}`
            }})
        }, 300);
    }

    async fetchSource(url) {
        const src = await fetch(url).catch(e => false);
        if(src === false) throw 'i.js playground ❤️ error loading ' + url;
        const html = (await src.text()).trim()
            .replaceAll(/<script id="__bs_script__.*\/\/]]><\/script>/gs, "") // remove browserSync
            .replaceAll(/<script type="module" src="\/src\/index\.js"><\/script>/gs, '<'+'script src="i.js"></'+'script>'); // remove dev i.js link
        this.document.querySelector('monaco-editor').setValue(html);
    }

    async select(state, event) {
        this.state.url = event.detail.url;
        this.render();
        document.title = event.detail.caption + ' | i.js playground';
        if(event.detail.url.substr(-4) === '.tag') {
            const path = window.location.pathname.split('/');
            path.pop();
            const base = path.join('/');
            this.document.querySelector('iframe').srcdoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><`+`script type="module" src="dist/i.js"></`+`script><style>html, body { padding: 0; margin: 0; height: 100%;}</style></head><body><`+`script type=i my-app="${base}/${event.detail.url}"></`+`script><my-app></my-app></body></html>`;
        } else {
            this.document.querySelector('iframe').removeAttribute('srcdoc');
            this.document.querySelector('iframe').src = event.detail.url;
        }
        this.document.querySelector('playground-accordion').setFirstActive();
        await this.fetchSource(event.detail.url);
    }

<!style>
    * {
        font-family: sans-serif;
    }

    header.top {
        background: #293949;
    }

    header.top > span {
        position: absolute;
        left:30px;
        top:3px;
        color: white;
        font-size: 25px;
        margin-right: 30px;
    }

    header.top > a {
        text-decoration: none;
        padding: 0 10px;
        color: #eeeeee;
    }

    header.top {
        height: 40px;
        line-height: 40px;
        text-align: right;
    }

    playground-accordion {
        position: absolute;
        width: calc(100% - 240px);
        height: calc(100% - 40px);
        right:0;
    }

    iframe {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
