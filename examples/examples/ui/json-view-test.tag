<!tag @json-view json-view>


<@json-view id="json-view" object=state.example/>

<!state>
    example: {
        number: 123,
        hello: 'world',
        bool: true,
        'some-array': [ 123, 'String', undefined, false, NaN, -Infinity],
        abc: Error('my error')
    }

<!class>
    connected() {
        this.Timer = setInterval(() => {
            this.state.example.rnd = Math.random();
            this.$('#json-view').refresh(); // Update json-view
        }, 1000);
    }

    disconnected() {
        clearTimeout(this.Timer);
    }
