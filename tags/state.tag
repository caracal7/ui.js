
<div text(state.x)/>


<style>
    :host {
        position: relative;
        display: inline-block;
        bottom: 0;
        right: 0;
        font-family: arial;
        font-size: 12px;
        font-weight: bold;
        z-index: 10;
    }

    div {
        transition: all 0.4s ease-in-out;
        padding: 2px 7px;
        border: 1px solid transparent;

        user-select: none;
        white-space: nowrap;

        border-radius: 3px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
        animation: rotate-shake infinite 4s;
    }


    @keyframes rotate-shake {
        0% {
            transform: rotate(0deg);
        }
        20% {
            transform: rotate(4deg);
        }
        25% {
            transform: rotate(-4deg);
        }
        30% {
            transform: rotate(4deg);
        }
        35% {
            transform: rotate(0deg);
        }
        65% {
            transform: rotate(0deg);
        }
        80% {
            transform: rotate(350deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>

<style text(`
    div {
        background: ${this.color()}55;
        border: 2px solid ${this.color()};
        color: ${this.color()};
    }
`)/>

<!class>
    color() {
        if(this.state.x === 'Done') return '#48d037';
        if(this.state.x === 'In-progress') return '#3782d0';
        else return '#d03837';
    }
