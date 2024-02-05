<!import chemicalElements from chemicalElements.js>

<main
    update{
        '--rotate-y': state.rotateY
    }>
    <section loop(state.elements as E, i | d => d.symbol)
        enter{
            '--x':  { to: E.x,  duration: 1000 + i*10, ease: 'easeInOutQuart' },
            '--y':  { to: E.y,  duration: 1000 + i*20, ease: 'easeInOutQuart' },
            '--z':  { to: E.z,  duration: 1000 + i*30, ease: 'easeInOutQuart' },
            '--rx': { to: E.rx, duration: 1000 + i*40, ease: 'easeInQuart', from: 1 },
            '--rz': { to: E.rz, duration: 1000 + i*50, ease: 'easeInQuart' },
            background: 'hsla('+(i)+', 60%, 50%, 0.5)'
        }
        update{
            '--x':  { to: E.x,  duration: 100 + i*10, ease: 'easeOutBounce' },
            '--y':  { to: E.y,  duration: 100 + i*10, ease: 'easeOutBounce' },
            '--z':  { to: E.z,  duration: 100 + i*10, ease: 'easeOutBounce' },
            '--rx': { to: E.rx, duration: 100 + i*10, ease: 'easeOutBounce' },
            '--rz': { to: E.rz, duration: 100 + i*10, ease: 'easeOutBounce' },
        }>
        <b text(E.symbol)/>
        <span text(E.name)/>
    </section>
</main>

<p>Based on <a href="https://daniel-lundin.github.io/snabbt.js/periodic.html">snabbt.js periodic table example</a></p>

<footer>
    <button @click=tableFormation>Table</button>
    <button @click=spiralFormation>Spiral</button>
    <button @click=gridFormation>Grid</button>
</footer>

<!state>
    elements: [],
    rotateY: '50deg'

<!class>

    tableFormation() {
        const [columns, rows, spacing] = [17, 10, 60];
        const baseXOffset = -Math.floor(columns / 2) * spacing;
        const baseYOffset = -Math.floor(rows / 2)    * spacing;
        this.state.elements.forEach(e => {
            e.x  = baseXOffset + (e.group - 1) * spacing;
            e.y  = baseYOffset +  e.period     * spacing;
            e.z  = e.period * spacing / 3;
            e.rx = 1;
            e.rz = 0;
        });
        this.render();
    }

    spiralFormation() {
        const [rots, yStep,radius, len] = [5, 3, 300, this.state.elements.length];
        const baseYOffset = len / 2 * yStep;
        this.state.elements.forEach((e, i) => {
            const x = Math.sin(rots * 2 * Math.PI * i / len);
            const z = Math.cos(rots * 2 * Math.PI * i / len);
            var rotation = -(i / len) * rots * Math.PI * 2;
            while (rotation < -2 * Math.PI) rotation += 2 * Math.PI;
            e.x  = radius * x;
            e.y  =-baseYOffset + i * yStep;
            e.z  = radius * z;
            e.rx = Math.cos(rotation);
            e.rz = Math.sin(rotation);
        });
        this.render();
    }

    gridFormation() {
        const spacing = 120;
        const layerSpacing = 120;
        const cols = 5;
        const elementsPerLayer = 5 * 5;
        const baseXOffset = -Math.floor(cols / 2) * spacing;
        const baseYOffset = -Math.floor(cols / 2) * spacing;
        const layerOffset =  Math.floor(5 / 2) * layerSpacing;

        this.state.elements.forEach((e, i) => {
            const layerIndex = Math.floor(i / elementsPerLayer);
            const indexWithinLayer = i - layerIndex * elementsPerLayer;
            const row = Math.floor(indexWithinLayer / cols);
            const col = indexWithinLayer % cols;
            e.x  = baseXOffset + col * spacing;
            e.y  = baseYOffset + row * spacing;
            e.z  = layerOffset - layerIndex * layerSpacing;
            e.rx = 1;
            e.rz = 0;
        });
        this.render();
    }

    connected() {
        this.state.elements = chemicalElements;
        this.tableFormation();

        const step = 0.05;
        var r = 0;
        const turn = () => {
            r = r == 360 - step ? 0 : r + step;
            this.state.rotateY = r + 'deg';
            this.render();
            this.frameId = requestAnimationFrame(turn);
        };
        turn();
    }

    disconnected() {
        cancelAnimationFrame(this.frameId);
    }

<!style>
    :host {
        background: #111;
        display: block;
        width: 100%;
        height: 100%;
        font-family: 'Raleway', Arial, sans-serif;
    }

    main {
        --rotate-y: 0deg;
        position: relative;
        width: 100%;
        height: 90vh;
        transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;
        pointer-events: none;
        transform: perspective(1000px) translateZ(-500px) rotateY(var(--rotate-y)) rotateX(10deg);
    }

    section {
        --x: 0;
        --y: 0;
        --z: 0;
        --rx: 1;
        --rz: 0;
        position: absolute;
        width: 50px;
        height: 50px;
        left: 50%;
        top: 50%;
        text-align: center;
        text-shadow: 0 0 10px white;
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 20px;
        color: white;
        transform: matrix3d(
            var(--rx), 0, var(--rz), 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            var(--x), var(--y), var(--z), 1);
    }

    b {
        line-height: 30px;
    }

    span {
        display: block;
        line-height: 20px;
        font-size: 6px;
    }

    footer {
        position: absolute;
        bottom: 35px;
        width: 100%;
    }

    button {
        width: 33%;
        height: 50px;
        background: #015E5B;
        color: white;
        box-shadow:inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
        border: 0;
        font-size: 15px;
        cursor: pointer;
    }

    button:hover {
        background: gold;
        color: black;
    }

    p {
        position: absolute;
        top: 0px;
        right: 10px;
    }

    p, a {
        color: white;
    }
