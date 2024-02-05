/******************************************************************************/
// The MIT Licence (MIT)
// Copyright (C) 2021 Dmitry Vasilev
/******************************************************************************/

const Axon = function() {
    const state = {};
    const functions = {};
    const edges = {};
    const args = {};
    const scripts = {};

    const invoke = property => functions[property]();

    const Arguments = func => {
        const noComments = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, ''); // strip comments
        const args = noComments.split('=>',1)[0].trim();
        return args.charAt(0) == '(' && args[args.length - 1] == ')'
            ? args.substr(1, args.length - 2).match(/([^\s,]+)/g)
            : [args];
    }

    const depthFirstSearch = property => {
        const visited = {};
        const nodeList = [];

        const search = node => {
            if (!visited[node]) {
                visit(node);
                nodeList.push(node);
            }
        };

        const visit = node => (visited[node] = true) && edges[node] && edges[node].forEach(search);

        visit(property);

        return nodeList;
    }

    //  Удаляем все edges для inputs заданного property
    const clearInputEdges = property => args[property] && args[property].forEach(p => {
        if(!edges[p]) return;
        const index = edges[p].indexOf(property);
        index !== -1 && edges[p].splice(index, 1);
    });

    //  Очищаем все зависимые от удаляемой переменные
    const clearEdges = property => edges[property] && edges[property].forEach(p =>{
        delete state[p];
        clearEdges(p)
    });

    const findEdges = property => (edges[property] = []) && Object.keys(args).forEach(item => {
        if(args[item].includes(property)) edges[property].push(item)
    })

    const setValue = (property, value) => {
        if (!state.hasOwnProperty(property) || typeof value === 'object' || state[property] !== value) {
            state[property] = value;
            clearInputEdges(property);

            delete args[property];
            delete functions[property];
            delete scripts[property];

            findEdges(property)

            depthFirstSearch(property).reverse().forEach(invoke);
        }
    }

    const allDefined = dependencies => {
        const args = [];
        return dependencies.every(property => {
            if (state.hasOwnProperty(property)){//state[property] !== undefined) {
                args.push(state[property]);
                return true;
            }
        }) ? args : undefined;
    };

    const setFn = (property, func) => {
        const ARGS = Arguments(func);
        if(!ARGS) return console.error(`Can't create function without dependecies`);

        //  удаляем зависимости (edges)
        clearInputEdges(property);

        scripts[property] = func;
        args[property] = ARGS;

        args[property].forEach(input => {
            edges[input] = edges[input] || [];
            if(!edges[input].includes(property)) edges[input].push(property)
        });

        findEdges(property);

        functions[property] = () => {
            const a = allDefined(args[property]);
            if (a) state[property] = func(...a);
            else delete state[property];//  Обнуляем стейт на случай, если функция не выполнилась
        };

        invoke(property);
        if (!state.hasOwnProperty(property)) return clearEdges(property);

        depthFirstSearch(property).reverse().forEach(invoke);
    }
    //--------------------------------------------------------------------------
    let afterSet = undefined;
    let afterDelete = undefined;
    let beforeDestroy = undefined;

    const set = (target, property, value, receiver) => {
        typeof value === 'function' ? setFn(property, value) : setValue(property, value);
        if(target && afterSet) afterSet(property, value);
        return true;
    };

    const get = (target, name) => {
        return state[name];
    };

    const apply = (target, thisArg, argumentsList) => target(...argumentsList);

    const deleteProperty = (target, property) => {
        if(!state.hasOwnProperty(property) && !functions.hasOwnProperty(property)) return true;

        clearInputEdges(property);
        clearEdges(property)

        delete functions[property];
        delete scripts[property];
        delete args[property];
        delete state[property];
        delete edges[property];
        if(target && afterDelete) afterDelete(property);
        return true;
    }

    const run = (...params) => {
        if(!params.length) return {
            debug: {
                functions: scripts,
                state,
                edges,
                args,
            },
            has: property => state.hasOwnProperty(property),
            isFunction: property => functions.hasOwnProperty(property),
            patch: patch => Object.keys(patch).forEach(property => set(null, property, patch[property])),
            destroy: () => beforeDestroy && beforeDestroy(),
            afterSet: fn => afterSet = fn,
            afterDelete: fn => afterDelete = fn,
            beforeDestroy: fn => beforeDestroy = fn,
            fnFromString: str => new Function('return '+str)(),
            silentSet: (property, value) => set(null, property, value),
            silentDelete: (property, value) => deleteProperty(null, property),
            setAsValue: (property, value) => setValue(property, value),
        };
    }

    return new Proxy(run, { get, set, apply, deleteProperty });
};

export default Axon;
