
Modern, concise, developer-friendly &amp; zero-config DSL for creating user interfaces.

# Why?

## 10 LOC "To Do list"

<to-do></to-do>

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i> <!----------------------------------->
        <input %value=state.default>
        <button @click({ state.todos.push({ name: state.default }) })>Add</button>
        <button @click({ state.todos = state.todos.filter(t => !t.done) })>Remove completed</button>
        <div loop(state.todos as todo | k=>k)>
            <input type="checkbox" %checked=todo.done>
            <input %value=todo.name>
        </div>
        <!state>
            default: 'Make the best UI DSL',
            todos: []
    </script> <!----------------------------------->
</body>
</html>
```

## D3.js-like Enter/Exit/Update pattern out of the box

<my-letters></my-letters>

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>
        <svg attrs(width: 400, height: 300)>
            <g loop(new Array(1).fill(0) as X, ind | d => d) attrs(transform: `translate(5, ${40+40*ind})`)>
                <text loop(state.alphabet as letter, i | d => d) text(letter)
                    enter(font: 'bold 24px monospace', fill: { to: '#FF0000', duration: 1500 })
                    update(fill: { to: '#0088FF'})
                    exit(fill: { to: '#CCCCCC', duration: 1000 })
                    #enter(
                        x: { to: (i * 15), ease: 'easeInOutQuint', duration: 1300 + i * 30 },
                        y: { to: 50, ease: 'easeInOutQuint', duration: 1300 + i * 30 }
                    )
                    #update(x: { to: i * 15 }, y: { to: 50 })
                    #exit(y: { to: 250, duration: 3000 + Math.random()*2000, ease: 'easeOutBounce' })/>
            </g>
        </svg>

        <!state>
            alphabet: []

        <!static>
            var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }

        <!class>
            connected() {
                this.state.alphabet = alphabet;
                this.render();
                setInterval(() => {
                    this.state.alphabet = shuffleArray(alphabet)
                        .slice(0, Math.floor(Math.random() * 26))
                        .sort();
                    this.render();
                }, 2000);
            }
    </script>
</body>
</html>
```

# Philosophy and Zen of <b style="color:#42a425">i.js</b>

- **Develop faster**. No dev server, no bundler, no toolchain, no bootstrap template. Starts up in 0 ms 🔥
- Declare new components right inside HTML. Try any ideas right now! 🤘
- No need for any other dependencies for building UI
- Use blazing fast virtual DOM over native Web Components
- True reactive 2-ways state exchange between components
- Concise syntax as close to HTML/CSS/JavaScript as possible
- Less superfluous language constructions to solve common tasks
- Unleash the power of WASM in JavaScript manner

**i.js** aims to provide a tool for development and application architecture out of the box.

It empowers an effortless creation of highly scalable and easily maintainable applications without Babel transpiler, Parcel, Webpack and any complicated toolchain.

All you need is **i.js** and a modern browser with <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements">customElements</a> support (AD 2020+).


# Getting started

> **i.js** at moment is a **Proof of Concept** and in the process of being rewritten to the new DSL syntax and will be moved to new renderer. Many functions are not yet ported over from the previous version.

**<b style="color:red">Do not use</b> in production until v.0.7 will be released**

**i.js** v0.5.7 pre-alpha

- [i.js](/dist/i.js) - IIFE (Default)
- [i.esm.js](/dist/i.esm.js) - ES module
- [i.cjs.js](/dist/i.cjs.js) - CommonJS

## Hello wold
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- IIFE i.js -->
    <script src="i.js"></script>
</head>
<body>
    <!-- Start of inline tag declaration -->
    <script type=i>
        Hello world
    </script>
    <!-- End of inline tag declaration -->
</body>
</html>
```

> Use this type of tag declaration for examples or tests only!
>
> In real-world projects, it is recommended to [import tags from an external file](#fetch_tag)

## Style animation when creating an element

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>
        Hello <b enter(
                    color: {
                        to: 'red'
                    },
                    'font-size': {
                        to: '400px',
                        ease: 'easeOutBounce',
                        duration: 3000
                    }
                )>i.js</b>
    </script>
</body>
</html>

```
## Adding @click event
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>
        <button @click({
            alert('Click :)')
        })>Click me!</button>
    </script>
</body>
</html>
```

## Adding state

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>
        <h1 text(state.x)/>

        <button @click({
            alert(state.message);
            state.x = Math.random();
        })>Click me!</button>

        <!state>
            message: 'This is message',
            x: 123
    </script>
</body>
</html>
```

## Conditions

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>
        <h1 if(state.x > 50)>Meow</h1>
        <h2 text(state.x)/>

        <button @click({state.x = 10})>X = 10</button>
        <button @click({state.x = 100})>X = 100</button>

        <!state>
            x: 10
    </script>
</body>
</html>
```

## Loops

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>
        <button @click({
            var words = Object.keys(window);
            state.todos.push({
                id: Math.random(),
                name: words[Math.floor(Math.random() * words.length)]
            });
        })>Add</button>
        <button @click({ state.todos = [] })>Clear</button>

        <ul>
            <li loop(state.todos as todo | key => key.id) text(todo.name)/>
        </ul>


        <!state>
         todos: [
             { id:1, name: 'Todo 1'},
             { id:2, name: 'Todo 2'},
             { id:3, name: 'Todo 3'},
             { id:4, name: 'Todo 4'},
             { id:5, name: 'Todo 5'},
         ]
    </script>
</body>
</html>
```

## Adding styles

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>
        Hello <b>i.js</b>

        <!style>
            :host {
                border: 1px dashed gray;
            }

            b {
                background: green;
            }
    </script>
</body>
</html>
```

## Inline styles

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>
        Hello <b style(background: 'green', color: 'white', padding: '0 20px')>i.js</b>
    </script>
</body>
</html>
```

## External CSS

### my.css

```css
:host {
    border: 1px dashed gray;
}

b {
    background: rgb(231, 194, 84);
    padding: 0 20px;
}
```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>
        <!css my.css>

        Hello <b>i.js</b>
    </script>
</body>
</html>
```

## Modularity and aliases

### colored.tag

```html
<h1
    enter(color: { to: state.color })
    update(color: { to: state.color })
    text(state.color)
/>

<!state>
    color: 'black'
```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>
        <!tag @colored colored.tag>

        <@colored color=state.color></@colored>

        <button @click({
            state.color = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
        })>Click me!</button>

        <!state>
            color: '...'
    </script>
</body>
</html>
```

## Using i.js tags inside regular HTML

### colored.tag

```html
<h1
    enter(color: { to: state.color })
    update(color: { to: state.color })
    text(state.color)
/>

<!state>
    color: 'black'
```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i colored-h1=colored.tag></script>

    <colored-h1 color="red"></colored-h1>
    <colored-h1 color="green"></colored-h1>
    <colored-h1 color="blue"></colored-h1>
</body>
</html>
```

## Import ES modules

### example.js

```javascript
function Add(x, y) {
    return x + y;
}

const Num = 42;

export { Add, Num }
```

### example2.js

```javascript
function Sub(x, y) {
    return x - y;
}

export default Sub;

```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>
        <!import { Add, Num } from example.js>
        <!import * as myModule from example.js>
        <!import Sub from example2.js>

        <h1 text(Num)/>

        3 + 9 = <b text( Add(3,9) )/><br>
        13 + 9 = <b text( myModule.Add(13,9) )/><br>
        3 - 9 = <b text( Sub(3,9) )/>

        <!class>
            connected() {
                alert('Hello from class! 2+7=' + Add(2,7));
            }

        <!static>

            alert('Hello from static block! 2-7=' + Sub(2,7));

    </script>
</body>
</html>
```

# Comparison with others

## Key differences

### i.js template and HTML

- Undocumented yet

### i.js and React

- Undocumented yet

### i.js and Vue 3.x

- Undocumented yet

### i.js and Svelte

- Undocumented yet

### i.js and d3.js

- Undocumented yet

# API

## Tags declaration

> There are several ways to declare **i.js** tags

#### Inline anonymous tag

A tag is created with a random name and added to the DOM in place of the `<script>`. The `<script>` itself is immediately removed from the DOM.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- IIFE i.js -->
    <script src="i.js"></script>
</head>
<body>
    <!-- Start of inline tag declaration -->
    <script type=i>
        Hello world
    </script>
    <!-- End of inline tag declaration -->
</body>
</html>
```
> Use it for examples, tests, benchmarks and rapid prototyping.
>
> Do not use this method in real-world applications

#### Inline anonymous tag with rendering to target

In this case, the component is not inherited from `HTMLElement`, `customElement` is not created and many built-in methods are not available. The component is rendered into a target. The target must be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).
This method can be useful for tests and benchmarks. In the future, it may be possible to use this method for integration with other libraries.

```html
<!DOCTYPE html>
<html>
<body>
    <div id='test1'></div>

    <!-- Start of inline tag declaration -->
    <script type=i target='#test1'>
        Hello world
    </script>
    <!-- End of inline tag declaration -->
</body>
</html>
```

<a name="fetch_tag" id="fetch_tag"></a>

### Fetch tag from url

```html
    <!DOCTYPE html>
    <html>
    <body>
        <script type=i name-of-tag="/path/to/my.tag"></script>

        <name-of-tag></name-of-tag>
        <name-of-tag></name-of-tag>
        <name-of-tag></name-of-tag>
        <name-of-tag></name-of-tag>
        <name-of-tag></name-of-tag>
    </body>
    </html>
```

The name of the first argument with a hyphen is the name of the component, and the value is the path to the component source code.

> Because **i.js** is based on native [Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) the naming convention must respect the ones from the standards(lowercase, with a dash in the name, starting with a letter and etc).

## Initial state

```html
    <!DOCTYPE html>
    <html>
    <body>
        <script type=i>
            <p text(state.x)/>
            <p text(state.x * 2)/>
            <p text(state.a.b.c[3].a)/>

            <!state>
                x: 125,
                a: {
                    b: {
                        c: [1,2,3, { a: 5}]
                    }
                }

        </script>
    </body>
    </html>
```
Top level properties of the `this.state` object will be observed and accessible as arguments of component


## Component class

```html
    <!DOCTYPE html>
    <html>
    <body>
        <script type=i>
            <h1 text(state.x)/>

            <!class>
                init() {
                    console.log('Before component is mounted to the DOM');
                    // Here we can fill in the initial state
                    // before component is mounted to the DOM
                    this.state.x = 123;
                }
                // Probably will be renamed to enter()
                // in the future versions
                connected() {
                    console.log('After component is mounted to the DOM');
                    setTimeout(() => {
                        this.state.x = 777;
                        this.render();
                    }, 100);
                }
                // Probably will be renamed to exit()
                // in the future versions
                disconnected() {
                    console.log('After component is unmounted from the DOM');
                }            
        </script>
    </body>
    </html>
```

## Static javascript


```html
    <!DOCTYPE html>
    <html>
    <body>
        <script type=i>
            <h1 text(MyFunc(5))/>

            <!static>
                console.log('This code will be executed only once');

                function MyFunc(x) {
                    return `x = ` + x;
                }
        </script>
    </body>
    </html>
```

## Template syntax

- Undocumented yet

## Component life-cycle

- Undocumented yet

## Conditions

- Undocumented yet

## Loops

- Undocumented yet

## Events

### Inline event callback

```html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <script src="i.js"></script>
    </head>
    <body>
        <script type=i>

            <h1 @click({
                // Any JavaScript code here
                console.log('click', state, event); // "state" and "event" is reserved
            })>Click me</h1>

            <p loop([1,3,4,5] as X| key => key) @click({
                console.log('In this context, we also have X', state, X, event);
            }) text('Click me ' + X)/>

            <p loop([1,3,4,5] as X| key => key)>
                <p loop([9,8,7] as Y, ind1| key=>key) @click({
                    console.log(`In this context, we also have X=${X}, Y=${Y} and ind1=${ind1}(second loop element index)`, state, event);
                }) text('Click me! X=' + X + ' Y=' + Y + ' ind1=' + ind1)/>
            </p>

            <!state>
                msg: "Hi :)"
        </script>
    </body>
    </html>
```

> The asynchronous render is automatically called after the execution of the inline event callback

### Call class method

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>

        <button @click>
            call a class method named the same as event
        </button>

        <button @click=myClick>
            call this.myClick()
        </button>

        <button @click=this.myClick2(42)>
            call this.myClick2() with arguments
        </button>

        <!state>
            msg: "Hi :)"

        <!class>
            click() {
                console.log('I`m this.click()');
            }

            myClick() {
                console.log('I`m this.myClick()');
            }

            myClick2(arg) {
                console.log('I`m this.myClick2('+arg+')');
            }

    </script>
</body>
</html>
```

### Call static function

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>

        <button @click=staticFn(42)>
            call static function with 42
        </button>

        <button @click=staticFn(state, event, 42)>
            call staticFn(state, event, 42)
        </button>

        <button @click=console.log(42)>
            call console.log(42)
        </button>

        <button @click=console.log(state, event)>
            call console.log(state, event)
        </button>

        <!state>
            msg: "Hi :)"

        <!static>
            function staticFn(...args) {
                console.log('I`m staticFn', ...args);
            }

    </script>
</body>
</html>
```

## Two-way reactive attributes

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="i.js"></script>
</head>
<body>
    <script type=i>
        <h1>Two-way reactive attributes</h1>

        <h3>Text input</h3>

            <input %value=state.message>
            <button @click({ state.message = 'Hello' })>Say hello</button>
            <span text(state.message)/>

        <h3>Checkbox</h3>

            <input type='checkbox' %checked=state.checked1><span text(state.checked1)/>
            <input type='checkbox' %checked=state.checked2><span text(state.checked2)/>
            <button @click({ state.checked1 = true })>Check</button>
            <button @click({ state.checked1 = false })>Uncheck</button>

        <h3>Radio</h3>

            <p text(state.radio)/>

            <input type="radio" id="contact1" name="contact" value="email" %checked=state.radio>
            <label for="contact1">Email</label>

            <input type="radio" id="contact2" name="contact" value="phone" %checked=state.radio>
            <label for="contact2">Phone</label>

            <input type="radio" id="contact3" name="contact" value="mail" %checked=state.radio>
            <label for="contact3">Mail</label>

            <button @click({ state.radio = 'mail' })>mail</button>

        <h3>Textarea</h3>
            <textarea rows="10" cols="45" %value=state.text/>
            <br>
            <button @click({ state.text = 'Hey i.js' })>Set text</button>
            <p text(state.text)/>

        <h3>Range</h3>

        <input type="range" min=0 max=10 %value=state.range>
        <button @click({ state.range = 5 })>Set 5</button>
        <p text(state.range)/>

        <!state>
            message: 'This is message',
            checked1: true,
            checked2: false,
            radio: 'phone',
            text: 'In i.js for textarea there is an additional attribute "value", which can be reactive or not',
            range: 3

    </script>
</body>
</html>
```

## Dynamic tags

- Undocumented yet

## Helpers

- Undocumented yet

# Known issues

- You cannot use any kinds of quotes inside a template

# Also undocumented yet

- server-side rendering
- tags bundling
- i.js helpers
- plugins

# Credits

Special thanks to these wonderful projects

- [d3.js](https://github.com/d3/d3)
- [walt](https://github.com/ballercat/walt)
- [Mikado](https://github.com/nextapps-de/mikado)
- [Peeler](https://github.com/elzup/peeler)
- [min.css](https://github.com/w3core/min.css)
- [TinyAnimate](https://github.com/branneman/TinyAnimate)
- [nanoid](https://github.com/ai/nanoid)

## Licence

MIT
