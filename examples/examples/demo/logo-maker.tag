<!css logo-maker.css>


<!template>

<style text(`
    .char0 { font-size: ${state.fontSize}px; line-height: ${state.fontSize}px; }
    .char1 { font-size: ${state.fontSize}px; line-height: ${state.fontSize}px; }
    .char2 { font-size: ${state.fontSize}px; line-height: ${state.fontSize}px; }

    .char0 > div { transform: translate(${state.params.distance[0]}px, calc(-50% + ${state.params.shift[0]}px)); }
    .char1 > div { transform: translate(${state.params.distance[1]}px, calc(-50% + ${state.params.shift[1]}px)); }
    .char2 > div { transform: translate(${state.params.distance[2]}px, calc(-50% + ${state.params.shift[2]}px)); }

    .char0 > div > div { transform: rotate(${state.params.rotate[0]}deg) scale(${state.params.scale[0]}); transform-origin: 50% calc(50% + ${state.params.fontFix[0]}em / 2);}
    .char1 > div > div { transform: rotate(${state.params.rotate[1]}deg) scale(${state.params.scale[1]}); transform-origin: 50% calc(50% + ${state.params.fontFix[1]}em / 2);}
    .char2 > div > div { transform: rotate(${state.params.rotate[2]}deg) scale(${state.params.scale[2]}); transform-origin: 50% calc(50% + ${state.params.fontFix[2]}em / 2);}

    .char0 > div > div::after { margin-top: ${state.params.fontFix[0]}em; content: ""; display: block; }
    .char1 > div > div::after { margin-top: ${state.params.fontFix[1]}em; content: ""; display: block; }
    .char2 > div > div::after { margin-top: ${state.params.fontFix[2]}em; content: ""; display: block; }


    .char0 > div > div, .char1 > div > div, .char2 > div > div  {
        font-weight: ${state.fontWeight};
    }

    .char0 > div, .char1 > div, .char2 > div  {
        position: absolute;
        width:auto;
        border: ${state.rulerLines ? '1px dashed gray' : 'none'};
    }
`)/>

<div class="globals">
    <input loop([0,1,2] as i|d=>d) type="range" %value=state.params.fontFix[i] caption=(`fontFix: ${state.params.fontFix[i]}`) min= 0.1 max=0.2  step=0.005>
    <input type="checkbox" %checked=state.rulerLines caption="Bounding boxes">
    <input type="range" %value=state.fontWeight caption=(`fontWeight: ${state.fontWeight}`) min=200 max=600 step=200>
    <input type="range" %value=state.fontSize   caption=(`fontSize: ${state.fontSize}`) min=50 max=400 step=1>
</div>

<div class="params" loop([0,1,2] as i|d=>d) char=state.chars[i]>
    <input type="range" %value=state.params.scale[i]      caption=(`scale: ${state.params.scale[i]}`)         min= 0.1 max=2   step=0.02>
    <input type="range" %value=state.params.rotate[i]     caption=(`rotate: ${state.params.rotate[i]}`)       min=-180 max=180 step=1>
    <input type="range" %value=state.params.shift[i]      caption=(`shift: ${state.params.shift[i]}`)         min=-100 max=100 step=1>
    <input type="range" %value=state.params.rotate2[i]    caption=(`rotate2: ${state.params.rotate2[i]}`)     min=-180 max=180 step=1>
    <input type="range" %value=state.params.distance[i]   caption=(`distance: ${state.params.distance[i]}`)   min=-150 max=150 step=1>
    <br>
</div>

<div class="db">
    <button @click=add>Add</button>
    <table if(state.logos.length)>
        <tr>
            <th/>
            <th loop(Object.keys(state.logos[0]) as param|d=>d) text(param)/>
            <th/>
        </tr>
        <tr loop(state.logos as logo, index|d=>d)>
            <td text('№ '+index+1)/>
            <td loop(Object.keys(logo) as param|d=>d) @click=this.apply(logo) text(logo[param])/>
            <td @click=this.delete(index)>Delete</td>
        </tr>
    </table>
</div>

<div class="logo">
    <div loop([0,1,2] as i|d=>d) class=state.transition>
        <div loop([-90, 30, 150] as degress|d=>d) class=(`char${i}`)
            style{
                transform: `rotate(${Number(state.params.rotate2[i])+degress}deg)`
            }>
            <div>
                <div text(state.chars[i])/>
            </div>
        </div>
    </div>
</div>



<!state>
    rulerLines: false,

    fontSize: 300,
    fontWeight: 600,
    transition: '',

    chars : ['}', '>', ')'],

    params: {
        scale: [0.24, 0.26, 0.22],
        rotate: [0, 180, 0],
        rotate2: [0, 0, 0],
        distance: [17, -47, -44],
        shift: [0, 0, 0],
        fontFix: [0.16, 0.175, 0.16],
    },

    logos: []

<!class>
    init() {
        const logos = localStorage.getItem('logos');
        logos && (this.state.logos = JSON.parse(logos));
    }
    add() {
        this.state.logos.push(JSON.parse(JSON.stringify(this.state.params)))
        this.render();
        localStorage.setItem('logos', JSON.stringify(this.state.logos));
    }
    delete(index) {
        if(!confirm('Delete №'+(index+1))) return;
        this.state.logos.splice(index, 1)
        this.render();
        localStorage.setItem('logos', JSON.stringify(this.state.logos));
    }
    apply(logo) {
        clearInterval(this.timer);
        this.state.params = JSON.parse(JSON.stringify(logo));
        this.state.transition = 'transition';
        this.render();
        this.timer = setTimeout(() => {
            this.state.transition = '';
            this.render();
        }, 350);
    }
