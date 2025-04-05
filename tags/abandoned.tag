
<div text(state.x)/>


<style>
    :host {
        position: absolute;
        left: 30%;
        font-family: arial;
        font-size: 50px;
        font-weight: bold;
        z-index: 100;
        top: 240px;
    }

    div {
        transition: all 0.4s ease-in-out;
        padding: 2px 7px;
        border: 1px solid transparent;

        user-select: none;
        white-space: nowrap;

        border-radius: 3px;
        box-shadow: 0 14px 18px 20px rgba(0, 0, 0, 0.3);
        animation: rotate-shake infinite 4s;

        background: #d0383788;
        border: 2px solid #d03837;
        color: #d03837;
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
