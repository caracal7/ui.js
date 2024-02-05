<svg preserveAspectRatio="xMidYMid meet" viewBox='0 0 250 250'>
<circle cx='50%' cy='50%' r='100' fill='#222222' stroke='white' stroke-width='10px'/>
    <line style{ transform: `rotate(${state.hour}deg)`}   x1='50%' y1='50%' x2='50%' y2='25%' stroke='skyblue'    stroke-width='15px' />
    <line style{ transform: `rotate(${state.minute}deg)`} x1='50%' y1='50%' x2='50%' y2='17%' stroke='lightgreen' stroke-width='8px' />
    <line style{ transform: `rotate(${state.second}deg)`} x1='50%' y1='50%' x2='50%' y2='15%' stroke='red'        stroke-width='2px' />
    <circle cx='50%' cy='50%' r='10' fill='white' stroke='white' stroke-width='0px'/>
    <p text(state.second)/>
</svg>

<!state>
    hour: 0,
    minute: 0,
    second: 0

<!class>
    connected() {
        const closestAngle = (from, to) => from + ((((to - from) % 360) + 540) % 360) - 180;   // https://stackoverflow.com/a/53416030/3062525

        const updateTime = () => {
        	const date = new Date();
            this.state.minute = closestAngle(this.state.hour,   date.getHours()   * 30);
            this.state.minute = closestAngle(this.state.minute, date.getMinutes() * 6);
            this.state.second = closestAngle(this.state.second, date.getSeconds() * 6);
            this.render();
        }
        updateTime();
        setInterval(updateTime, 1000);
    }

<!style>

    :host, svg {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    :host {
        background: linear-gradient(#222222, #4e6e79);
        margin: 0;
        padding: 0;
    }

    line {
        transform-origin: center center;
        transition: transform 0.4s ease-in-out;
    }
