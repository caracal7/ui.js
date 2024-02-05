<!css ../../assets/button.css>

<aside @click=this.close()></aside>
<main>
	<table cellspacing=0 cellpadding=0>
	<tr>
		<td colspan=2 style=state.css><slot/></td>
	</tr>
	<tr>
		<td width='50%'>
			<button @click=this.close() style='background:red' text(state.cancel)/>
		</td>
		<td width='50%' align='right' style='padding-right:3px'>
			<button @click=ok disabled=state.disabled text(state.submit)/>
		</td>
	</tr>
	</table>
</main>


<!state>
	next: false,
	css: '',
	disabled: false,
	cancel: 'Cancel',
	submit: 'Submit'

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
		this.element.style.display = 'flex';
		this.aside.style.display = 'block';
		this.popup.classList.remove("close");
		this.popup.classList.add("open");
	}

	ok() {
		this.emit('submit');
		this.close(true);
	}

	close(noEvent) {
		if(!noEvent) this.emit('close');
		this.aside.style.display = 'none';
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

	button {
		min-width: 100px;
	}

	aside {
		display: none;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0.3;
		background: black;
	}

	main {
		display: none;
		margin: 20px;
		background-color: #eee;
		border-radius: 8px;
		border: 1px solid white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
		z-index: 10001;
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
			transform: scale(0, 0);
		}
	}
