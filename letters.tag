<svg attrs(width: 800, height: 300)>
    <text loop(state.alphabet as letter, i | d => d) text(letter)
        enter(font: 'bold 48px monospace', fill: { to: '#0088FF', duration: 1500 })
        update(fill: { to: '#42a425'})
        exit(fill: { to: '#CCCCCC', duration: 1000 })
        #enter(
            x: { to: (i * 30), ease: 'easeInOutQuint', duration: 1300 + i * 30 },
            y: { to: 50, ease: 'easeInOutQuint', duration: 1300 + i * 30 }
        )
        #update(x: { to: i * 30 }, y: { to: 50 })
        #exit(y: { to: 250, duration: 3000 + Math.random()*2000, ease: 'easeOutBounce' })/>
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
