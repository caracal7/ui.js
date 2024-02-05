<h2>Walt Object literals</h2>
<h3>(console output)</h3>

<button @click{
    console.log(
        this.walt.test()
    );
}>test()</button>

<!walt>
    // Memory is required. This could also be imported
    const memory: Memory<{ initial: 1 }>;

    // Object type. This has no side-effects on the final WebAssembly output
    // It is only used as a compiler hint
    type TestObjectType = { foo: i32, bar: i32, answer: i32 };

    export function test(): i32 {
        // An object must be defined with the appropriate type
        // Because objects are complex types, we need to initialize it with an
        // address of zero. This address can come from any malloc-like function
        const obj: TestObjectType = 0;
        // Objects are compiled to i32 pointers, every property lookup is simply
        // a memory operation from the i32 pointer offset matching the property
        obj.foo = 22;
        // Or a dot-operator
        obj.bar = 20;
        // Properties can be looked-up just like array keys and can be used in math
        // operations.
        obj.answer = obj.foo + obj.bar;
        return obj.answer;
    }
