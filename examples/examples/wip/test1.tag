
<svg preserveAspectRatio="xMidYMid meet" viewBox='0 0 250 250'>
    <circle cx='50%' cy='50%' r='100' fill='transparent' stroke='white' stroke-width='7px' />
    <line id='hand-hour'   style{ transform: `rotate(${state.hour}deg)`}   x1='50%' y1='50%' x2='50%' y2='25%' stroke='skyblue' stroke-width='10px' />
    <line id='hand-minute' style{ transform: `rotate(${state.minute}deg)`} x1='50%' y1='50%' x2='50%' y2='20%' stroke='green'   stroke-width='8px' />
    <line id='hand-second' style{ transform: `rotate(${state.second}deg)`} x1='50%' y1='50%' x2='50%' y2='15%' stroke='red'     stroke-width='2px' />
    <circle cx='50%' cy='50%' r='10' fill='white' stroke='white' stroke-width='0px'/>
</svg>

<!state>
    hour: 0,
    minute: 0,
    second: 0

<!class>
    connected() {
        const updateTime = () => {
        	const date = new Date();
            this.state.hour   = date.getHours() * 30;
            this.state.minute = date.getMinutes() * 6;
            this.state.second = date.getSeconds() * 6;
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
        -webkit-transform-origin: center center;
        transform-origin: center center;
        transition: -webkit-transform 0.2s ease-in-out;
        transition: transform 0.2s ease-in-out;
        transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
    }
