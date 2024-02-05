
<u @click><slot/></u>

<!class>
    click() {
        const href = document.baseURI.substring(0, document.baseURI.lastIndexOf('/')) + new URL(this.state.href, document.baseURI).pathname;
        const e = document.createElement('a');
        e.setAttribute('href', href);
        e.setAttribute('download', this.state.filename);
        document.body.appendChild(e);
        e.click();
        document.body.removeChild(e);
    }

<!style>
    u {
        color: #196b8f;
        cursor: pointer;
    }
    u:hover {
        color: #198f48;
    }
