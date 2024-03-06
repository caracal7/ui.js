<!tag @download-example ../examples/tags/download-example>


<@download-example id='download'
    style{
        position: 'relative'
    }/>

<!class>

    async loadExample(example) {
        const ex = example.base + '/' + example.urls[0];
        if(!example.sources) example.sources = [];
        for (const [index, file] of example.urls.entries()) {
            if(example.sources[index]) continue;
            const src = await fetch('examples/examples/' + example.base + '/' + file).catch(e => false);
            if(src === false) throw 'Error loading ' + url;
            const source = (await src.text()).trim()
                .replaceAll(/<script id="__bs_script__.*\/\/]]><\/script>/gs, "") // remove browserSync
                .replaceAll(/<script type="module" src="\.\.\/\.\.\/\.\.\/src\/index\.js"><\/script>/gs, '<'+'script src="ui.js"></'+'script>')
                .replaceAll(/<script type="module" src="\.\.\/\.\.\/src\/index\.js"><\/script>/gs, '<'+'script src="ui.js"></'+'script>');
            example.sources.push(source);
        }
    }

    connected() {
        setTimeout(async () => {
            const example = {
                caption: 'Minimal To-Do list',
                base: 'to-do',
                urls: ['minimal-to-do.html']
            }
            await this.loadExample(example);

            this.$('#download').state.example = example;
            this.$('#download').render();
        }, 0);
    }
