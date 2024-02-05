<h2>Walt <--> JS interoperation</h2>

<h3>(console output)</h3>

<button @click=callWalt>
    Call WALT function from i.js class
</button>
<br>

<button @click{
    this.walt.test_console();
}>Call WALT function from ui.js template</button>
<br>

<button @click{
    this.walt.call_component_function();
}>Call ui.js class method from WALT</button>
<br>

<!class>
    mylog(num) {
        console.log('This is mylog() :)', num)
    }

    callWalt() {
        this.walt.test_console();
    }

<!walt>
    import { log: MyInteger, info: MyInteger } from 'console';  // import global javascript console
    import { mylog: MyInteger } from 'tag';   // import iris omponent methods

    type MyInteger = (i32) => void;

    let counter: i32 = 20;

    export function call_component_function(): i32 {
        mylog(counter);
        return counter;
    }


    export function test_console(): i32 {
        counter += 10;
        log(counter);
        info(counter * counter);
        return counter;
    }
