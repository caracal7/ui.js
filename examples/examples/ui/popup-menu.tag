<aside @click=close></aside>
<main>
	<slot></slot>
</main>

<!state>
	next: false

<!class>
	init() {
		this.MutationObserverOptions.attributes = true;
	}

	connected() {
		this.aside = this.$('aside');
		this.popup = this.$('main');

		this.openHandler = e => this.open();

		if(this.state.next)
			setTimeout(() => {
				this.targetElement = this.element.nextElementSibling;
				this.targetElement.addEventListener('click', this.openHandler);
			}, 0);
	}

	slotChange() {
		this.slotted.filter(i => i.nodeName === 'NAV')
			.forEach(nav => nav.onclick = [null, "false"].includes(nav.getAttribute('disabled'))
				? _ => (nav.dispatchEvent(new Event("select")), this.close())
				: undefined);
    }

	disconnected() {
		this.targetElement && this.targetElement.removeEventListener('click', this.openHandler);
	}

	open(style) {
		const { left, right, top, bottom } = typeof style === 'object' ? style : {};

		this.element.style.left   = left || 'auto';
		this.element.style.top    = top || 'auto';
		this.element.style.right  = right || 'auto';
		this.element.style.bottom = bottom || 'auto';

		this.element.style.display = 'inline-block';
		this.aside.style.display = 'block';
		this.popup.classList.remove("close");
		this.popup.classList.add("open");
	}

	close() {
		this.emit('close');
		this.aside.style.display = 'none';
		this.popup.classList.add("close");
        setTimeout(() => {
			this.popup.classList.remove("open");
			this.element.style.display = 'none';
		}, 400);
	}

<!style>
	:host {
		display: none;
		position: absolute;
		box-sizing: border-box;
	}

	aside {
		display: none;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		background: black;
	}

	main {
		position: absolute;
		box-sizing: border-box;
		background-color: #eee;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		border-radius: 8px;
		border: 1px solid white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.5);

		display: none;
		visibility: hidden;
	}

	::slotted(hr) {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 1px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
	}

  	::slotted(nav) {
		box-sizing: border-box;
		width: 100%;
		cursor: pointer;
		border-radius: 8px;
		padding:  5px 15px;
		line-height: 20px;
		margin: 0;
		white-space: nowrap;
		transition: 0.2s;
	}
	::slotted(nav:hover) {
		background-color: #fff;
		color: #000;
		border-radius: 8px;
	}

	::slotted(nav[disabled]:not([disabled="false"])) {
		color: #aaaaaa;
		cursor: not-allowed;
	}

	main.open {
		display: flex;
		animation: open-menu-anim 0.4s ease-in-out;
		visibility: visible;
	}
	main.close {
		animation: close-menu-anim 0.4s ease-in-out;
	}


	@keyframes open-menu-anim {
		0% {
			transform: scale(0, 0);
		}
		33% {
			transform: scale(0.95, 1.05);
		}
		66% {
			transform: scale(1.05, 0.95);
		}
		100% {
			transform: scale(1, 1);
		}
	}

	@keyframes close-menu-anim {
		0% {
			transform: scale(1, 1);
		}
		33% {
			transform: scale(1.05, 0.95);
		}
		66% {
			transform: scale(0.95, 1.05);
		}
		100% {
			transform: scale(0, 0);
		}
	}
