<!tag @fly fly.tag>
<!tag @state state.tag>
<!css button.css>

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
    ui.js <span style{ opacity: 0.5 }>project status</span>
</b>

<main>
	<header>
        <h1>Misson</h1>

        Reduce <a href="https://en.wikipedia.org/wiki/Time_to_market">time-to-market</a> for new applications by using a simple and unified architecture for the most common visualisation tasks

        <h1>Goals</h1>

        To develop a versatile and high performance thin layer between a user-friendly DSL and various renderers with a focus on data-driven visualisation where state transitions are first class citizens.

        <h1>Implementation roadmap</h1>

        <h2>Stage 1: Research <@state x='Done'/></h2>

        <@fly>
            <table>
            <tr>
                <th width='36%'>Goal</th>
                <th width='32%'>Stage 1 status</th>
                <th width='32%'>Stage 2 proposal</th>
            </tr>
            <tr>
                <td>Declare components inside HTML</td>
                <td>Done</td>
                <td>Refactor or rewrite from scratch</td>
            </tr>
            <tr>
                <td>Parsing and compiling components in the browser</td>
                <td>Done</td>
                <td>Refactor or rewrite from scratch</td>
            </tr>
            <tr>
                <td>Reactive proxy-based component update</td>
                <td>Removed from early prototype. Manual component update only for better component lifecycle control and performance</td>
                <td>Manual update. Optional proxy based reactivity</td>
            </tr>
            <tr>
                <td>Calling functions from other languages/DSLs</td>
                <td>Statically included WALT compiler</td>
                <td>Plugable compilers/preprocessors</td>
            </tr>
            <tr>
                <td>Direct interface for GPU computing as with the WALT compiler</td>
                <td>Removed from early prototype</td>
                <td>Keep in mind. Waiting for better WebGPU support</td>
            </tr>
            <tr>
                <td>Explore the possibilities and limitations of the virtual DOM</td>
                <td>Moved from a modified lightningDOM to a custom virtual DOM implementation due to integration with the EUE pattern</td>
                <td>No more virtual DOM. Svelte/Imba-style generation of optimised components with separate create and update pipelines, but completely in the browser
                    <@state x='In-progress'/>
                </td>
            </tr>
            <tr>
                <td>Enter /Exit / Update pattern</td>
                <td>Moved from d3.js to a custom implementation due to d3.js is more DOM focused and adds unnecessary overhead for non-DOM based components</td>
                <td>Refactored custom high performance non-DOM focused implementation
                    <@state x='Done'/>
                </td>
            </tr>
            <tr>
                <td>Using different component formats besides the native one, e.g. React or Vue</td>
                <td>Removed from early prototype due to the inconvenience of supporting different templates during the research process</td>
                <td>Plugable component parsers. Possible template format changes. 100% support of ui.js Stage-1 components with an old to new converter</td>
            </tr>
            <tr>
                <td>Algorithms for state/DOM diff and array diff reconciliation</td>
                <td>Only keyed arrays are supported with fast array diff. Slow and not optimised array diff for non DOM renderers</td>
                <td>Three selectable array processing algorithms, depending on the needs of the renderer: <br>
                    1. Non-keyed array diff with component reuse<br>
                    2. Mikado-based reconciliation for ordered keyed arrays<br>
                    3. Fast diff for unordered keyed arrays
                    <@state x='Done'/>
                </td>
            </tr>
            <tr>
                <td>customElements support</td>
                <td>Every component is created as native customElement except non-DOM components.</td>
                <td>There is no reason to use customElements extensively, even for DOM components. Create a customElement only for the root element, or when the developer needs it.</td>
            </tr>
            <tr>
                <td>ES modules support</td>
                <td>Partial support. Does not resolve the paths for nested imports. Temporary workaround is to import pre-bundled ES modules</td>
                <td>Full ES modules support</td>
            </tr>
            <tr>
                <td>State transition engine</td>
                <td>CSS transition engine for colours and tiny JS transition engine for attributes. Partially integrated spring animation engine</td>
                <td>Animation chaining. Pre-cached easing functions. Transitions pool to reduce the number of function calls.
                    <@state x='In-progress'/>
                </td>
            </tr>
            <tr>
                <td>Using different renderers in addition to traditional DOM</td>
                <td><@state x='Stay in touch. Under construction'/></td>
                <td></td>
            </tr>
            </table>
        </@fly>

        <h2>Stage 2: Core development <@state x='In-progress'/></h2>

        <table>
        <tr>
            <th width='36%'>Module</th>
            <th width='32%'>Nested tasks</th>
            <th width='32%'>Progress</th>
        </tr>
        <tr>
            <td rowspan=4>Compiler / run-time</td>
            <td>State diff engine</td>
            <td><@state x='Done'/></td>
        </tr>
        <tr>
            <td>Enter/exit/update/restore run-time</td>
            <td><@state x='Done'/></td>
        </tr>
        <tr>
            <td>Transition engine</td>
            <td><@state x='In-progress'/></td>
        </tr>
        <tr>
            <td>Component compiler</td>
            <td></td>
        </tr>
        <tr>
            <th colspan=3 style='text-align:center; background: #59a1f5'>At this point, we are ready to release Stage-2 prototype with the full source code</th>
        </tr>
        <tr>
            <th width='36%'>Module</th>
            <th width='32%'>Nested tasks</th>
            <th width='32%'>Progress</th>
        </tr>
        <tr>
            <td rowspan=4>Parser</td>
            <td>Tokenizer</td>
            <td></td>
        </tr>
        <tr>
            <td>Attributes parser</td>
            <td></td>
        </tr>
        <tr>
            <td>Paths resolving</td>
            <td></td>
        </tr>
        <tr>
            <td><@state x='Stay in touch. Under construction'/></td>
            <td></td>
        </tr>
        <tr>
            <td><@state x='Stay in touch. Under construction'/></td>
            <td></td>
            <td></td>
        </tr>
        </table>

        <h2>Stage 3: Ecosystem</h2>

        <h3>Toolchain</h3>

        <ul>
            <li>REPL</li>
            <li>Starter generator</li>
            <li>ESBuild integration</li>
            <li>Webpack integration</li>
        </ul>

        <h3>Renderers</h3>
        <ul>
            <li>OGL</li>
            <li>Babylon</li>
            <li>Three.js</li>
            <li>Regl</li>
            <li>Two.js</li>
            <li>Sprite.js</li>
            <li>Pixi.js</li>
            <li>SVG.js</li>
        </ul>

        <h3>Migration</h3>

        <ul>
            <li>Example of using ui.s components in React projects</li>
            <li>Example of using ui.s components in Vue projects</li>
            <li>Example of using ui.s components in Svelte projects</li>
        </ul>

        <h3>Business components pack with examples</h3>
        <ul>
            <li>Forms</li>
            <li>Charting</li>
            <li>CRUD</li>
            <li>Crossfilters</li>
            <li>Pivot tables</li>
            <li>Tree management with database example</li>
            <li>PDF reports generation</li>
            <li>User authentication with JWT example</li>
            <li>Client/server app starter</li>
            <li>Serverless app starter</li>
            <li>Mobile app starter</li>
            <li>Static site generator</li>
        </ul>

        <h3>Gamedev components pack with examples</h3>
        <ul>
            <li>State management</li>
            <li>Entity Component System (ECS)</li>
            <li>Behavior trees</li>
            <li>Pathfinding</li>
            <li>Arcade game starter</li>
            <li>Turn based game starter</li>
            <li>Farm game starter with AI</li>
        </ul>

        <h1>Risks and challenges</h1>

        <p text(`
As with all software projects, we're exploring new territory.
There may be unexpected hard problems along the way. And often we have a rough idea of how much work it's going to take.
        `)/>
        <p text(`
But... We have come a long way. And there is a clear understanding of how to solve most of the challenges.
In fact, the main work at the moment is refactoring the core part of the framework.
Also, all the parts related to the ecosystem have already been implemented by our team using various similar frameworks.
A lot of things just need to be ported.

This significantly reduces the risks. 😺

        `)/>




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
        left: -220px;
        color: white;
        transform: rotate(-90deg);
    }



    @media only screen and (min-width: 1000px) {
    	:host > b {
            left: calc(15% - 315px);
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

    @media only screen and (max-width: 600px) {
    	main {
            width: 100%;
            height: 100%;
            border: 4px solid white;
        }
    }
    header {
        position: absolute;
        top: 0;
        width: 100%;
        height: calc(100% - var(--footer-height));
        overflow: auto;
        padding: 10px;
        font-size: 14px;
    }

    @media only screen and (max-width: 600px) {
    	header {
            font-size: 11px;
        }
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


    table {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    table td, table th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    table tr:nth-child(even) td {
        background-color: #f2f2f2;
    }

    table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04AA6D;
        color: white;
    }

    a, a:active {
        color: #3782d0;
    }
