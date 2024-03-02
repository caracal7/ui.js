<!import AXON from axon.esm.js>
<!tag @window ../../ui/window.tag>
<!tag @axon-debug axon-debug>
<!css ../../../assets/button.css>


<@window caption='About' left='230px' width='700px' height='500px' top='20px'>
    <iframe src='https://axon.js.org'/>
</@window>


<@window caption='Controls' width='300px' height='335px' left='10px' top='130px' padding='10px' resize=false>
    <h3>Key</h3> <input %value=state.key>

    <h3>Value / function</h3> <input %value=state.value>

    <br> <button @click{
        const value = this.state.value;
        this.axon[this.state.key] = isNumeric(value) ? parseFloat(value) : value;
        this.$('#debug').refresh();
    } text('Set as value')/>

    <br> <button @click{
        this.axon[this.state.key] = this.axon().fnFromString(this.state.value);
        this.$('#debug').refresh();
    } text('Set as reactive function') style{background:'blue'}/>

    <br> <button @click{
        delete this.axon[this.state.key];
        this.$('#debug').refresh();
    } text('Delete') style{background:'red'}/>

</@window>

<@window caption='Axon graph debug' left='330px' width='700px' height='500px' top='40px'>
    <@axon-debug id='debug' axon=this.axon @select{
        state.key = event.detail.key;
        state.value = event.detail.function ? this.axon().fnFromString(event.detail.function) : "";
    }/>
</@window>

<!style>
    :host {
        display: block;
        width: 100%;
        height: 100%;
        background:
            radial-gradient(black 15%, transparent 16%) 0 0,
            radial-gradient(black 15%, transparent 16%) 8px 8px,
            radial-gradient(rgba(255, 255, 255, .1) 15%, transparent 20%) 0 1px,
            radial-gradient(rgba(255, 255, 255, .1) 15%, transparent 20%) 8px 9px;
        background-color: #282828;
        background-size: 16px 16px;
    }
    input, button {
        box-sizing: border-box;
        width: 100%;
        background: #eeffff;
        padding: 5px 10px;
        margin: 5px 0!important;
    }
    iframe {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

<!state>
    key: 'c',
    value: '(a,b) => a + b'

<!static>
    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

<!class>
    connected() {
        const axon = new AXON();

        axon.a = 8;
        axon.b = 12;
        axon.d = {
            a: 100
        };
        axon.c2 = (a, d) => a + d.a;
        axon.c3 = (a2, d) => a2 + d.a;
        axon.e  = c => c * 2;
        axon.e2 = c => c * 4;
        axon.e3 = (e2, a) => e2 * 4 + a;
        axon.e4 = (e2, a) => e2 * 5 + a;
        axon.e5 = (a) => 4 + a;
        axon.f  = c => console.warn('Do everything you want on change', c) || c;
        axon.f2 = c => typeof c;
        axon.f3 = c => isNaN(c);

        this.axon = axon;
        this.render();
    }
