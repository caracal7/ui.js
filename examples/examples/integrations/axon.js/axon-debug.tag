<!tag @table ../../ui/table/table.tag>

<@table data=state.data columns=state.columns @select{
    this.emit('select', event.detail)
}/>

<!state>
    columns: [
        { id: 'key', caption: 'Key', view: { style: 'text-align:center;font-weight:bold;color:#550000' } },
        { id: 'function', caption: 'Function'},
        { id: 'value', caption: 'Value', view: {
            style: (value, datum) => datum.state ? 'background:lightgreen;text-align:center' : 'text-align:center'
        }, classFn: (item, row) => row.state ? 'lightgreen' : undefined},
        { id: 'undefined', caption: 'Undefined', type: 'boolean', view: { style: 'text-align:center', true: '⚠️', false: ''}},
        { id: 'args', caption: 'Arguments', view: { style: 'text-align:center' }},
        { id: 'edges', caption: 'Dependents', view: { style: 'text-align:center' }},
    ],
    data: [],
    axon: undefined

<!class>
    refresh() {
        const axon = this.state.axon().debug;

        const data = [];
        const vars = [...new Set([...Object.keys(axon.state), ...Object.keys(axon.functions)])]; // !!! scripts

        vars.forEach(key => data.push({
            id: key,
            key,
            value: !!axon.state.hasOwnProperty(key) ? JSON.stringify(this.state.axon[key]) : '',
            state: !!axon.state.hasOwnProperty(key),
            undefined: axon.state[key] === undefined,
            args: axon.args[key] || '',
            edges: axon.edges[key] || '',
            function: axon.functions[key] || '',
        }));
        this.state.data = data.sort((a, b) => (a.key > b.key) ? 1 : -1)
        this.render(); //❌
    }

    changed(attrs) {
        if(attrs.axon) this.refresh();
    }
