<slot/>

<!static>
    //  Copyright 2023 Dmitry Vasiley
    //  MIT license

    function tryPlace(cells, columnCount, _row, _col, w, h) {
        var count = 0;
        for (let row = _row; row < _row + h; row++) {
            if(row >= cells.length) return;
            for (let col = _col; col < Math.min(columnCount, _col + w); col++) {
                if(!cells[row][col]) count++;
            }
        }
        if(count == w * h) {
            for (let row = _row; row < _row + h; row++)
                for (let col = _col; col < _col + w; col++)
                    cells[row][col] = true;
            return true;
        }
    }

    function findPlace(cells, columnCount, w, h) {
        for (let row = 0; row < cells.length; row++) {
            for (let col = 0; col < Math.min(columnCount, cells[row].length); col++) {
                if(!cells[row][col]) {
                    const x = tryPlace(cells, columnCount, row, col, w, h);
                    if(x) return {
                        row, col
                    };
                }
            }
        }
        cells.push(new Array(columnCount).fill(false));
        return findPlace(cells, columnCount, w, h);
    }

    const animate = (_this, section, prop, target, from) => {
        if(!_this.state.animation) return section.style.setProperty(prop, target + 'px');
        if(!section._spring) section._spring = {};
        if(!section._spring[prop]) {
            section._spring[prop] = new _this.Spring({
                target,
                current:    from || target,
                stiffness:  _this.state.enter_stiffness,
                damping:    _this.state.enter_damping,
                mass:       _this.state.enter_mass,
                delta:      1,
                callback:   current => section.style.setProperty(prop, current + 'px'),
                done: () => {
                    if(!section._spring[prop]) return;
                    delete section._spring[prop].done;
                    section._spring[prop].stiffness = _this.state.stiffness;
                    section._spring[prop].mass      = _this.state.mass;
                    section._spring[prop].damping   = _this.state.damping;
                }
            });
            section.style.setProperty(prop, target + 'px');
        } else {
            section._spring[prop].set(target);
        }
    }

    const updateAnimationProps = (_this) => {
        _this.sections.forEach((section, index) =>
            Object.keys(section._spring).forEach(prop => {
                section._spring[prop].stiffness = _this.state.stiffness;
                section._spring[prop].mass      = _this.state.mass;
                section._spring[prop].damping   = _this.state.damping;
            })
        );
    }


<!state>
    width: 200,
    padding: 10,
    animation: false,

    stiffness: 4,
    damping: 0.7,
    mass: 0.1,

    enter_stiffness: 10,
    enter_damping: 0.8,
    enter_mass: 0.05,


<!class>

    redraw() {
        if(!this.sections?.length) return;
        const size = Number(this.state.width);
        const padding = Number(this.state.padding);
        const offsetWidth = this.element.offsetWidth - padding;
        const cellWidth = offsetWidth > Number(this.state.width) ? offsetWidth / Math.floor(offsetWidth / size) : offsetWidth;
        const cells = [];
        const columnCount = Math.floor(offsetWidth / cellWidth);

        this.sections.forEach(section => {
            var   w = Number(section.getAttribute('w')) || 1;
            const h = Number(section.getAttribute('h')) || 1;
            w > columnCount && (w = columnCount);

            const { col, row } = findPlace(cells, columnCount, w, h);
            const width  = w   * cellWidth;
            const height = h   * cellWidth;
            const left   = col * cellWidth;
            const top    = row * cellWidth;

            const lp = left   + padding;
            const tp = top    + padding;
            const wp = width  - padding;
            const hp = height - padding;
            const w2 = (width  - padding) / 2;
            const h2 = (height - padding) / 2;

            animate(this, section, 'left',   lp, lp + w2 / 2);
            animate(this, section, 'top',    tp, tp + h2 / 2);
            animate(this, section, 'width',  wp, w2);
            animate(this, section, 'height', hp, h2);
        });

        this.lastColumnCount = columnCount;
        this.element.style.setProperty('height', (cells.length * cellWidth + padding) + 'px');
    }

    init() {
        this.MutationObserverOptions.attributes = true;
    }

    slotChange() {
        this.sections = this.slotted.filter(i => i.nodeName === 'SECTION');
        this.sections.forEach((section, index) => {
            const _setAttribute = section.setAttribute;
            section.setAttribute = (prop, value) => {
                _setAttribute.apply(section, [prop, value]);
                if(prop === 'h' || prop === 'w') this.redraw();
            }
        });
        this.redraw();
    }

    changed(attrs) {
        if(attrs.width || attrs.padding) this.redraw();
        if(['stiffness','damping','mass','enter_stiffness','enter_damping','enter_mass'].some(key => attrs[key])) updateAnimationProps(this);
    }

    connected() {
        // https://stackoverflow.com/a/65620774/3062525
        const throttle = (func, limit) => {
            let lastFunc;
            let lastRan = Date.now() - (limit + 1); //enforces a negative value on first run
            return function(...args) {
                const context = this;
                clearTimeout(lastFunc);
                lastFunc = setTimeout(() => {
                    func.apply(context, args);
                    lastRan = Date.now();
                }, limit - (Date.now() - lastRan)); //negative values execute immediately
            }
        }
        this.on('resize', throttle(this.redraw, 100));
        this.slotChange();
    }

<!style>

    :host {
        display: block;
        position: relative;
        width: 100%;
        box-sizing: border-box;
    }

    ::slotted(section) {
        position: absolute;
        box-sizing: border-box;
        background: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.02);
    }
