<!template>
    <slot></slot>

<!class>

    setFirstActive() {
        this._source = false;
        const children = this.document.querySelector('slot').assignedElements();
        const headers  = children.filter(i => i.nodeName === 'HEADER');
        const sections = children.filter(i => i.nodeName === 'SECTION');
        children.forEach(e => e.removeAttribute('active'));

        if(headers.length)  headers[0].setAttribute('active', true);
        if(sections.length) sections[0].setAttribute('active', true);
    }

    connected() {

        const click = e => {
            if(e.target.innerText === 'Result' || this._source) {
                Array.from(this.children).forEach(e => e.removeAttribute('active'));
                this._source = false;
            } else {
                this._source = true;
            }
            e.target.setAttribute('active', true);
            var el = e.target;
            do el = el.nextSibling;
            while (el && el.nodeName !== 'SECTION');
            if(el) el.setAttribute('active', true);
        };

        const attachClickEvent = () => {
            const children = this.document.querySelector('slot').assignedElements();
            const headers  = children.filter(i => i.nodeName === 'HEADER');
            headers.forEach(e => e.onclick = click);
        }

        attachClickEvent();
        this.setFirstActive();

        //  Let everithing working after slot content is changed
        this._observer = new MutationObserver(() => {
            const children = Array.from(this.children);
            const headers  = children.filter(i => i.nodeName === 'HEADER');
            headers.forEach(e => e.onclick = click);
            if(!headers.some(e => e.hasAttribute('active'))) {
                const sections = children.filter(i => i.nodeName === 'SECTION');
                if(headers.length)  headers[0].setAttribute('active', true);
                if(sections.length) sections[0].setAttribute('active', true);
            }
        });
        this._observer.observe(this, { childList: true });
    }

    disconnected(){
        this._observer.disconnect();
    }

<!style>
    :host {
        height: 100%;
        display: flex !important;
        flex-direction: column !important;
        width: 100%;
        background: white;
    }

    ::slotted(header) {
        cursor: pointer;
        border-top: 1px solid rgba(0, 0, 0, 0.25);

        background-color: #556c83;
        flex-shrink: 1 !important;
        padding: 0.3em;
        padding-left:30px;
        font-size: 15px;
        font-family: sans-serif;
        color: #fff;
    }

    ::slotted(header[active=true]) {
        background: #3e546b;
        color: white;
    }

    ::slotted(section[active=true]) {
        flex-grow: 1;
        display: block;
        overflow: hidden;
    }

    ::slotted(section) {
        display: none;
        height: 100%;
        overflow-y: auto;
        flex-grow: 0;
        transition: all 0.25s linear;
    }
