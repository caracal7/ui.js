<!tag @ogl          ogl/ogl-renderer>
<!tag @axes         ogl/helpers/ogl-axes>
<!tag @grid         ogl/helpers/ogl-grid>

<!tag @model        ogl/objects/ogl-model>




<@ogl id="OGL host">
    <@axes/>
    <@grid/>




    <@model json='assets/fox.json' texture='assets/fox.jpg' loop(state.alphabet as letter, i | d => d)
        #enter{
            color:  '#0088FF',
            scale:  { from: 0.2, to: 0.7 },
            x:      { to: i * 1.5 - state.alphabet.length * 1.5 / 2,  duration: 1300 + i * 30, ease: 'easeInOutQuint' },
            y:      { to: 10,  default: 5,                            duration: 1300 + i * 30, ease: 'easeInOutQuint' },
            z:      { to: 0,   default: -25,                          duration: 1300 + i * 30, ease: 'easeInOutQuint' }
        }
        #update{
            color:  '#000000',
            x:      { to: i * 1.5 - state.alphabet.length * 1.5 / 2 },
            y:      { to: 10 }
        }
        #exit{
            color:  '#ff0000',
            scale:  { to: 0.2 },
            y:      { to: 0,       duration: 3000 + Math.random() * 2000, ease: 'easeOutBounce' }
        }/>


</@ogl>

<!state>
    alphabet: []

<!class>
    async connected() {


        // LETTERS
        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        this.state.alphabet = alphabet;
        this.render();
        setInterval(() => {
            this.state.alphabet = shuffleArray(alphabet)
                .slice(0, Math.floor(Math.random() * 26))
                .sort();
            this.render();
        }, 2000);
    }
