<div class='code'/>


<!css default.min.css>
<!import highlight from highlight.min.js>
<!import MarkdownIt from markdown-it.min.js>

<!class>
    async connected() {
        const path = this.getAttribute('url');

        const _source = await fetch(path).catch(e => false);
        if(_source === false) throw 'Error loading markdown' + path;
        const source = await _source.text();

        const md = new MarkdownIt({
            html: true,
            linkify: false,
            typographer: false,
            highlight: function (str, lang) {
                if (lang && highlight.getLanguage(lang)) {
                    try {
                        return highlight.highlight(str, { language: lang }).value;
                    } catch (__) {}
                    }
                    return ''; // use external default escaping
                }
            });

        this.$('div.code').innerHTML = md.render(source);

    }

    disconnected(){
        this._observer.disconnect();
    }

<!style>
    * {
        font-family: Arial, Helvetica, sans-serif;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    tr:nth-child(even){
        background-color: #fafafa;
    }
    thead tr {
        background-color: #f5f5f5;
    }
