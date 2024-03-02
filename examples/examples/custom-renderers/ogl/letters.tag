<!tag @ogl          ogl/ogl-renderer>
<!tag @axes         ogl/helpers/ogl-axes>
<!tag @grid         ogl/helpers/ogl-grid>

<!tag @model        ogl/objects/ogl-model>
<!tag @text         ogl/objects/ogl-text>




<@ogl id="OGL host">
    <@axes/>
    <@grid/>


    <@text
        font='assets/FiraSans-Bold.json' texture='assets/FiraSans-Bold.png'
        loop(state.alphabet as letter, i | d => d) text=letter
        #enter{
            color:  '#0088FF',
            scale:  { from: 0.2, to: 1.7 },
            x:      { to: i * 1.5 - state.alphabet.length * 1.5 / 2,  duration: 1300 + i * 30, ease: 'easeInOutQuint' },
            y:      { to: 16,  default: 5,                            duration: 1300 + i * 30, ease: 'easeInOutQuint' },
            z:      { to: 0,   default: -25,                          duration: 1300 + i * 30, ease: 'easeInOutQuint' }
        }
        #update{
            color:  '#FFFFFF',
            x:      { to: i * 1.5 - state.alphabet.length * 1.5 / 2 },
            y:      { to: 16 }
        }
        #exit{
            color:  '#ff0000',
            scale:  { to: 0.5 },
            y:      { to: 2,       duration: 3000 + Math.random() * 2000, ease: 'easeOutBounce' }
        }/>

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
        }>
            <@text text=letter y=10
                #enter{
                    color:  '#0088FF',
                }
                #update{
                    color:  '#FFFFFF',
                }
                #exit{
                    color:  '#ff0000',
                }/>
    </@model>
</@ogl>


<!state>
    alphabet: [],

<!class>
    connected() {
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
