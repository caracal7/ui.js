<!tag @currency currency>
<!tag @knum knum>


<table if(state.columns)>
<thead>
<tr>
	<th loop(state.columns as field | d => d.id) text(field.caption)/>
</tr>
</thead>
<tbody>
<tr loop(state.data as datum | d => d.id)
	class=(state.selected && state.selected.id === datum.id && "selected")
	@click{
		state.selected = state.selected && state.selected.id === datum.id ? undefined : state.data.find(d => d.id == datum.id);
		this.emit('select', state.selected);
	}>
	<td loop(state.columns as field | d => d.id)
		style=getStyle(datum, field)
		suffix=(field?.view?.suffix || '')>

		<span if(!['knum','currency'].includes(getType(field))) html(getValue(datum, field))/>
		<@knum if(getType(field) === 'knum') value=getValue(datum, field)/>
		<@currency if(getType(field) === 'currency') fraction=(field?.view?.fraction) value=getValue(datum, field)/>

	</td>

</tr>
</tbody>
</table>


<!static>
	const currency = new Intl.NumberFormat("ru");

	function getStyle(datum, field) {
		if(field?.view?.style) {
			if(typeof field.view.style == 'function') return field.view.style(dot(datum, field), datum, field);
			if(field.view.style.trim().length) return field.view.style;
		}
		return undefined;
	}

	function getValue(datum, field) {
		const t = getType(field);
		if(t === 'date')     return formatDate( dot(datum, field) );
		if(t === 'datetime') return formatDatetime( dot(datum, field) );
		if(t === 'boolean')  return formatBoolean( dot(datum, field), field );
		// 'currency', 'knum', 'string'
		return dot(datum, field);
	}

    function getType(field) {
		if(field.type === "boolean")        return "boolean";
		if(field.type === "date")           return "date";
        if(field.type === "datetime")       return "datetime";
		if(field.type === "currency")       return "currency";
		if(field.type === "knum")       	return "knum";
        return "string";
    }

	function dot(datum, field) {
		const key = field?.view?.id ? field.view.id : field.id;
		return key.split('.').reduce((o,i) => o?.[i], datum);
	}

	function formatBoolean(value, field) {
		if(value === true  && field?.view?.hasOwnProperty('true'))  return field.view.true;
		if(value === false && field?.view?.hasOwnProperty('false')) return field.view.false;
		return value;
	}

	function formatDate(date) {
	    if(!date) return '';
	    const d = new Date(date);
	    return d.getDate().toString().padStart(2, '0') + "." + (d.getMonth()+1).toString().padStart(2, '0') + "." + d.getFullYear();
	}

    function formatDatetime(date) {
        if(!date) return '';
        const d = new Date(date);
        return d.getDate().toString().padStart(2, '0') + "." + (d.getMonth()+1).toString().padStart(2, '0') + "." + d.getFullYear()
          +' '+d.getHours().toString().padStart(2, '0')+ ':' + d.getMinutes().toString().padStart(2, '0');
    }


<!state>
	data: [],
	columns: [],
	selected: undefined

<!style>

    :host {
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;
        scroll-behavior: auto;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        color: #000000;
    }

    * {
        box-sizing: border-box;
        font-size: 12px;
        -webkit-text-size-adjust: none;
    }

	.selected, .selected > td {
		background: gold!important;
		color: black!important;
	}

    table {
        text-align: left;
        position: relative;
        border-collapse: collapse;
		table-layout: fixed;
        min-width: 100%;
    }

    table thead, table tfoot {
        position: sticky;
    }

    table thead {
        top: 0;
    }

	thead th {
		background: linear-gradient(0deg, rgba(138,153,163,1) 0%, rgba(176,182,213,1) 100%);
		color: black;
		text-align: center;
		line-height: 18px;
		font-weight: normal;
		padding: 4px 8px;
		white-space: nowrap;
	}

	tbody tr {
        cursor: pointer;
    }

	th, td {
		padding: 0.25rem;
		border-bottom: 1px solid rgba(138,153,163,0.1);
		border-right: 1px solid #f8f8f8;
		white-space: nowrap;
	}

	[suffix]:after {
		--suffix-color: gray;
		--suffix-font-size: 12px;
		content: attr(suffix);
		color: var(--suffix-color);
		font-size: var(--suffix-font-size);
	}
