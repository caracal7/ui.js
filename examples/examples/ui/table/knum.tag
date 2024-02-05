

<span if(state.num1 != '0' || state.num2 != ',0')>
    <span text(state.num1)/>
    <small if(state.num2 != ',0') text(state.num2)/>
    K
</span>

<!state>
    value: '',
    num1: 0,
    num2: 0

<!class>
    changed(attrs) {
        if(attrs.value) {
            const _number = parseFloat(attrs.value);
            const _num = Math.abs(_number) > 10000 ? Math.trunc(_number/1000) : Math.round(_number/100)/10;
            const num = _num.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ').split('.');
            this.state.num1 = num[0];
            this.state.num2 = ','+num[1];
            this.render();
        }
    }
