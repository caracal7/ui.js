<span text(state.num1) suffix=state.num2/>

<!state>
    value: '',
    num1: 0,
    num2: 0,
    fraction: 2,

<!class>
    changed(attrs) {
        if(attrs.value) {
            const currency = new Intl.NumberFormat("ru", {
                minimumFractionDigits: this.state.fraction || 2,
                maximumFractionDigits: this.state.fraction || 2,
            });
            const _number = currency.format(parseFloat(attrs.value));
            const [num1, num2] = _number.split(',');
            this.state.num1 = num1;
            this.state.num2 = ','+num2;
            this.render();
        }
    }

<!style>
    [suffix]:after {
        --suffix-color: #888888;
        --suffix-font-size: 9px;
        --suffix-font-weight: normal;
        content: attr(suffix);
        color: var(--suffix-color);
        font-size: var(--suffix-font-size);
        font-weight: var(--suffix-font-weight);
    }
