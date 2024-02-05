<!static>
    //  https://github.com/ai/nanoid
    const nanoid = (t=21) => crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");

<!state>
    value: '',
    filename: '',
    language: 'javascript',
    'read-only': false

<!class>
    connected() {
        this.NAME = this.nodeName + nanoid(10);
        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute('id',   this.NAME);
        this.iframe.setAttribute('name', this.NAME);
        this.iframe.setAttribute('src', this.__src.substring(0, this.__src.lastIndexOf('/'))+'/editor.html');
        this.document.appendChild(this.iframe);

        this.ReadyEvent = event => {
            this.setValue(this.state.value !== undefined ? this.state.value : '');
            this.setLanguage(this.state.language);
            this.setReadOnly(this.state['read-only']);
            this.emit('ready');
        }

        this.ChangeEvent = event => {
            if(event.detail !== this._value) {
                this.state.value = this._value = event.detail;
                this.render();
                this.emit('change', this._value);
            }
        }

        window.document.addEventListener('monaco-editor-ready-'+this.NAME, this.ReadyEvent);
        window.document.addEventListener('monaco-editor-'+this.NAME, this.ChangeEvent);
    }

    disconnected() {
        window.document.removeEventListener('monaco-editor-ready-'+this.NAME, this.ReadyEvent);
        window.document.removeEventListener('monaco-editor-'+this.NAME, this.ChangeEvent);
    }

    setValue(value) {
        this.state.value = this._value = value;
        if(!this.iframe) return;
        this.iframe.contentWindow.document.dispatchEvent(new CustomEvent('setValue', { detail: String(value) }));
    }

    setReadOnly(value) {
        this.state['read-only'] = !(value === false || value === 'false');
        if(!this.iframe) return;
        this.iframe.contentWindow.document.dispatchEvent(new CustomEvent('setReadOnly', { detail: String(this.state['read-only']) }));
    }

    setLanguage(value) {
        this.state.language = value || 'javascript';
        if(!this.iframe) return;
        this.iframe.contentWindow.document.dispatchEvent(new CustomEvent('setLanguage', { detail: this.state.language }));
    }

    setFilename(value) {
        this.state.language =
            value.endsWith('.tag') ? 'ui.js' :
            value.endsWith('.html') ? 'ui.js' :
            value.endsWith('.css') ? 'css' :
            'javascript';
        if(!this.iframe) return;
        this.iframe.contentWindow.document.dispatchEvent(new CustomEvent('setLanguage', { detail: this.state.language }));
    }

    changed(attrs) {
        if(attrs.value) {
            this.setValue(attrs.value !== undefined ? attrs.value : '');
        }

        if(attrs.filename) {
            this.setFilename(attrs.filename !== undefined ? attrs.filename : '.tag');
        }

        if(attrs.language) {
            this.setLanguage(attrs.language);
        }

        if(attrs.hasOwnProperty('read-only')) {
            this.setReadOnly(attrs['read-only']);
        }
    }

<!style>
    :host {
        display: block;
        position: absolute;
		overflow: hidden;
    }
    :host, iframe {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background: black;
    }
