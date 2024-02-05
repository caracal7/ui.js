<header>
    <nav loop(state.tabs as tab, i| d => d) class=(state.active === i && 'active')
        @click{
			if(state.active === i) return;
			this.setActive(i);
		}>
        <div>
            <section/>
            <aside text(tab.getAttribute('caption'))/>
			<span if(state.close && state.active === i) @click=this.emit('close', i)>✖</span>
        </div>
    </nav>
</header>
<main>
    <slot/>
</main>
<style text(`
    .active div {
        background: linear-gradient(to top, ${state.color2} 0 50%, ${state.color} 80% 100%);
    }
    .active section {
        background: ${state.color};
    }
    aside {
        padding: 5px ${state.close ? '25' : '10'}px 5px 10px;
		font-size:   ${state['font-size']};
    }
    .active aside {
		padding-right: ${state.close ? '25' : '10'}px;
    }`)/>

<!state>
	close: false,
    color: '#3e82e4',
    color2: '#3064b0',
    'font-size': '14px',
    tabs: [],
    active: undefined

<!class>
    init() {
        this.AddAttributes = true;
        this.MutationObserverOptions.attributes = true;
        this.MutationObserverOptions.subtree = true;
    }

    setActive(index = 0) {
        if(this.state.tabs.length) {
            this.state.tabs.forEach((e, i) => i !== index && e.removeAttribute('active'));
            const _index = index < this.state.tabs.length ? index : 0;
            this.state.tabs[_index].setAttribute('active', true);
            this.state.active != _index && this.emit('select', index);
            this.state.active = _index;
            window.dispatchEvent(new Event('resize'));
        }
		this.render();
    }

    updateTabs() {
        this.state.tabs = this.slotted.filter(i => i.nodeName === 'ARTICLE');
        this.setActive(this.state.active);
    }

    slotChange(mutationRecord) {
        const articles = mutationRecord
            .filter(x =>
                (x.type == 'attributes' && x.attributeName == 'caption') ||
                (x.type == 'childList' && x.target.nodeName == this.nodeName)
            );
        if(articles.length) this.updateTabs();
    }

    connected(){
        this.updateTabs();
    }


<!style>
    :host {
        box-sizing: border-box;
        display: block;
        flex-flow: column;
    }

    :host([fullheight]) {
        position: relative;
        display: flex;
        height: 100%;
        overflow: hidden;
    }

	span {
		display: block;
		position: absolute;
		font-size: 20px;
		color: white;
		top:-2px;
		right: 3px;
	}

	span:hover {
		color: gold;
	}

    aside {
        position: relative;
        white-space: nowrap;
        transition: padding 0.2s ease;
        color: black;
	    -webkit-user-select: none;
	    user-select: none;
    }

    .active aside {
        padding-top: 0px;
        color: white;
    }

    header {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding-top: 4px;
    }

    :host([fullheight]) > main {
        position: relative;
        display: block;
        flex: 1 0 auto;
        height: 0;
        overflow: auto;
    }

    nav {
        display: inline-block;
        flex: 1 1;
        cursor: pointer;
        margin: 1px 1px 0 0;
        height: 24px;
    }

    div {
        position: relative;
        background: linear-gradient(to top, #dddddd 0 50%, #eeeeee 80% 100%);
        height: 24px;
    }


    section {
        position: absolute;
        width: 100%;
        transition: top 0.2s ease;
        top: 0px;
        height: 0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .active section {
        top: -5px;
        height: 5px;
    }


    ::slotted(article) {
        box-sizing: border-box;
		width: 100%;
    }

    :host([fullheight]) ::slotted(article) {
        height: 100%;
    }

    ::slotted(article[active=true]) {
        display: block;
    }

    ::slotted(article) {
        display: none;
    }
