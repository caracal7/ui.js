<!css button.css>

<!tag @markdown markdown-it/markdown.tag>


<aside
    if(state.open)
    @click=this.close()
    enter{
        opacity: { from: 0, to: 0.5 }
    }
    exit{
        opacity: { to: 0 }
    }/>

<b if(state.open)
    enter{
        'font-size': '60px',
        transform: { from: 360, to: -90, fn: v => `rotate(${v}deg)`, duration: 3000, ease: 'easeOutQuint' }
    }>
    ui.js <span style{ opacity: 0.5 }>API</span>
</b>

<main>
	<header>
        <@markdown url="README.md"/>
    </header>
	<footer>
        <button @click=this.close() style='background:red' text('Go back')/>
	</footer>
</main>


<!state>
	next: false,
    open: false,

<!class>

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

	disconnected() {
		this.targetElement && this.targetElement.removeEventListener('click', this.openHandler);
	}

	open() {
        this.state.open = true;
        this.render();
		this.element.style.display = 'flex';
		this.popup.classList.remove("close");
		this.popup.classList.add("open");
	}

	close() {
        this.state.open = false;
        this.render();
		this.popup.classList.add("close");
        setTimeout(() => {
			this.popup.classList.remove("open");
			this.element.style.display = 'none';
		}, 400);
	}

<!style>
	:host, * {
		box-sizing: border-box;
	}

	:host {
        --footer-height: 40px;
		display: none;
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		height: 100%;

		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;

		z-index: 10000;
	}

    :host > b {
        position: absolute;
        left: -70px;
        color: white;
        transform: rotate(-90deg);
    }

    @media only screen and (min-width: 1000px) {
    	:host > b {
            left: calc(15% - 160px);
        }
    }

	button {
		width: calc(100% - 8px);
	}

	aside {
		display: block;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: black;
	}

	main {
        position: absolute;
        width: calc(100% - 180px);
        height: calc(100% - 40px);
		background-color: #eee;
		border-radius: 8px;
		border: 10px solid white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
		z-index: 10001;
	}

    @media only screen and (min-width: 1000px) {
    	main {
            width: 70%;
            height: calc(100% - 20px);
        }
    }

    header {
        position: absolute;
        top: 0;
        width: 100%;
        height: calc(100% - var(--footer-height));
        overflow: auto;
        padding: 10px;
    }

    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: var(--footer-height);
        background: white;
    }

	main.open {
		display: flex;
		animation: open-dialog 0.4s ease-in-out;
	}

	main.close {
		animation: close-dialog 0.4s ease-in-out;
	}

	@keyframes open-dialog {
		0% {
            opacity: 0;
			transform: scale(0.3, 0.3);
		}
		33% {
            opacity: 1;
			transform: scale(0.95, 1.05);
		}
		66% {
			transform: scale(1.05, 0.95);
		}
		100% {
			transform: scale(1, 1);
		}
	}

	@keyframes close-dialog {
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
			transform: scale(0.3, 0.3);
            opacity: 0;
		}
	}
