<!static>
    const nanoid = (t=21) => crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");

<!state>
    value: ''

<!class>
    connected() {
        this.NAME = this.nodeName + nanoid(10);
        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute('id',   this.NAME)
        this.iframe.setAttribute('name', this.NAME)
        this.iframe.setAttribute('src', 'tags/monaco-editor/editor.html')
        this.document.appendChild(this.iframe);

        this.ReadyEvent = event => this.setValue(this.state.value !== undefined ? this.state.value : '');

        this.ChangeEvent = event => {
            if(event.detail !== this._value) {
                this._value = event.detail;
                this.render({
                    value: this._value
                });
                this.emitNative('change', this._value);
                //console.log('ChangeEvent', this.NAME, event.detail)
            }
        }

        window.document.addEventListener('monaco-editor-ready-'+this.NAME, this.ReadyEvent);
        window.document.addEventListener('monaco-editor-'+this.NAME, this.ChangeEvent);
    }

    disconnected() {
        window.document.removeEventListener('monaco-editor-ready-'+this.nodeName, this.ReadyEvent);
        window.document.removeEventListener('monaco-editor-'+this.nodeName, this.ChangeEvent);
    }

    setValue(value) {
        //console.log('setValue event', value)
        this._value = value;
        this.iframe.contentWindow.document.dispatchEvent(new CustomEvent('setValue', { detail: String(value) }));
    }

    changed(state) {
        console.log('changed', state);
        if(this.iframe && state.value) {
            this.setValue(this.state.value !== undefined ? this.state.value : '');
        }
    }


<!style>
    :host {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background: black;
    }
    iframe {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: none;
    }
