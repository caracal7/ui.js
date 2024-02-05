<div/>


<!state>
	'font-size': '12px',
    object: {},
    highlighted: undefined


<!static>
    // https://stackoverflow.com/a/49544338/3062525
    function getArguments(func) {
        const ARROW = true;
        const FUNC_ARGS = ARROW ? /^(function)?\s*[^\(]*\(\s*([^\)]*)\)/m : /^(function)\s*[^\(]*\(\s*([^\)]*)\)/m;
        const FUNC_ARG_SPLIT = /,/;
        const FUNC_ARG = /^\s*(_?)(.+?)\1\s*$/;
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

        return ((func || '').toString().replace(STRIP_COMMENTS, '').match(FUNC_ARGS) || ['', '', ''])[2]
            .split(FUNC_ARG_SPLIT)
            .map(function(arg) {
                return arg.replace(FUNC_ARG, function(all, underscore, name) {
                    return name.split('=')[0].trim();
                });
            })
            .filter(String);
    }

<!class>
	init() {
		this.checkStateObjectChanges.object = true; // track object changes
	}

    isDate(date) {
        const s = date.split('.');
        const d = new Date(+s[2], s[1] - 1, +s[0]);
        return (
            Object.prototype.toString.call(d) === "[object Date]" &&
            !isNaN(d.getTime()) &&
            d.getDate() == s[0] &&
            d.getMonth() == (s[1] - 1)
        ) ? 'date':'string';
    }

    Value(value) {
        // console.log(value, typeof value, Array.isArray(value), value === null, !isNaN(value))
        if(value === undefined)
            return `<span class=undefined>undefined</span>`;

        if(value === null)
            return `<span class=null>null</span>`;
        if(typeof value === "function")
            return `<span class=function>function(<span class=arguments>${getArguments(value).join(`<span class=comma>, </span>`)}</span>){<span class=comma>...</span>}</span>`;
        if((typeof value === "boolean") || (value instanceof Boolean))
            return `<span class=boolean>${value}</span>`;
        if(!isNaN(value) && !Array.isArray(value) && typeof value !== "string")
            return `<span class=number>${value}</span>`;
        if(value instanceof Error)
            return `<span><span class=error>Error(</span><span class=string>${value.message}</span><span class=error>)</span></span>`;
        if(typeof value === "object")
            return this.Object(value);
        if(typeof value === "string" )
            return `<span class=quote>"<span class=${this.isDate(value)}>${value}</span>"</span>`;
        if(isNaN(value))
            return `<span class=null>NaN</span>`;
        return '🤦🏼‍♂️';
    }

    Object(object) {
        const isArray = Array.isArray(object);
        let result = `<span class=bracket>${isArray ? '[' : '{'}</span>`;
        const keys = Object.keys(object);
        keys.map((key, index) => {
            const value = object[key];
            result += `<div class=key style="padding-left:15px">`+ (isArray ? '' : `${key}: `);
            result += this.Value(value);
            result += (index == keys.length-1 ? '' : `<span class=comma>,</span>`)+`</div>`;
        })
        return result + `<span class=bracket>${isArray ? ']' : '}'}</span>`;
    }
	
    changed() {
		this.refresh();
	}

    refresh() {
        this.document.innerHTML = `
<style>
    :host {
        font-family: Arial, Courier New;
		font-size: ${this.state['font-size']};
        display: block;
        color: gray;
        white-space: pre;
        user-select: text;
        -webkit-user-select: text;
        background: black;
        overflow-x: auto;
    }
    .undefined  { color:gray; }
    .key        { color:#ddd; }
    .string     { color:rgb(46, 204, 113); }
    .number     { color:cyan; }
    .boolean    { color:yellow; }
    .date       { color:lightblue; }
    .null       { color:gray; }
    .version    { color:blue; }
    .error      { color:red; }
    .quote      { color:gray; }
    .comma      { color:gray; }
    .bracket    { color:gray; }
    .function   { color:#dd6522; font-style: italic; }
    .arguments  { color:#7dd1f0; }
</style>` + this.Value(this.state.object);
    }

    connected() {
        this.changed();
    }
