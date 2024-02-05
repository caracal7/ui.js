<table @mount=recalc>
    <tr loop([...Array(10).keys()] as i|d => d)>
        <td loop([...Array(5).keys()] as j|d => d)>
            <input if(i&&j) id=cell(j,i) placeholder=cell(j,i) @focus=save @blur=restore>
        </td>
    </tr>
</table>

<!static>
    const cell = (j, i) => String.fromCharCode(j + 64) + (i || '');
    const evaluate = (expr, context) => Function('c,v', `with (c) return eval(v)`)(context, expr);
    const normalize = value => value != +value ? value : +value || '';

<!class>
    recalc() {
        Array.from(this.$$("input"))
            .forEach(input => {
                const cell = input.id;
                const value = localStorage[cell] || '';
                input.value = this.store[cell] = this.store[cell.toLowerCase()] = value[0] == "="
                        ? evaluate(value.slice(1), this.store)
                        : normalize(value);
            });
        this.render();
    }
    save(e) {
        e.target.value = localStorage[e.target.id] || '';
    }
    restore(e) {
        localStorage[e.target.id] = e.target.value;
        this.recalc();
    }
    connected() {
        this.store = {};
        this.recalc();
    }
