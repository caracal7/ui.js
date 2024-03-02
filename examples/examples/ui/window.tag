
<div class="Overlay" if(state.action)/>
<div class="TWindow">
    <div class="TBody" @mousedown=setActive @touchstart=setActive><slot/></div>
    <div class="THeader"
        @mousedown=this.startAction(event, "move")
        @touchstar=this.startAction(event, "move")
        text(state.caption)
    />
    <div class="TMoveText" if(state.action == "move") text(this.removePX(state.left)+'x'+this.removePX(state.top))/>
    <div if(state.resize && state.action == "resize") class="TResizeText" text(this.removePX(state.width)+'x'+this.removePX(state.height))/>
    <div if(state.close)   class="TCloseButton"  @click{ this.emit('close') }/>
    <div if(state.submit)  class="TSubmitButton" @click{ this.emit('submit') }/>
    <div if(state.resize)  class="TResizeCorner"
        @mousedown{ this.startAction(event, "resize") }
        @touchstart{ this.startAction(event, "resize") }
    ></div>
</div>
<style text(''+`
    .TWindow {
        width:  ${state.width};
        height: ${state.height};
        top:    ${state.top};
        left:   ${state.left};
        bottom: ${state.bottom};
        right:  ${state.right};
    }
    .TBody {
        background: ${state.background};
        height:     calc(100% - ${state.header});
        overflow:   ${state.overflow};
        padding:    ${state.padding};
    }
    .TMoveText {
        margin-top: ${state.header};
    }
    .THeader {
        height:      ${state.header};
        line-height: ${state.header};
    }
`)/>

<!class>
    init() {
        this.minWidth = 70;
        this.minHeight = 40;

        Object.entries({
            header:     '20px',
            caption:    'Untitled',
            width:      '300px',
            height:     '150px',
            left:       'auto',
            right:      'auto',
            top:        'auto',
            bottom:     'auto',
            background: 'white',
            overflow:   'hidden',
            padding:    'inherit'
        }).map(([ key, value]) => this.state[key] = this.getAttribute(key) || value);

        this.state.resize = !['false', false, undefined].includes(this.getAttribute('resize'));

        if(this.state.left === 'auto' && this.state.right === 'auto') this.state.left = '0px';
        if(this.state.top  === 'auto' && this.state.bottom === 'auto') this.state.top = '0px';

        this.mouse = { action: undefined, x: undefined, y: undefined };

        this.mouseMove = event => this.onMove(event.clientX, event.clientY);
        this.touchMove = event => this.onMove(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        this.mouseUp   = event => {
            this.state.action = this.mouse.action = undefined;
            this.render();
        };
    }

    connected() {
        this.state.close   = this.hasEventHandler('close');
        this.state.submit  = this.hasEventHandler('submit');
        this.render();

        this.on('mousemove', this.mouseMove);
        this.on('touchmove', this.touchMove);
        this.on('mouseup',   this.mouseUp);
        this.on('touchend',  this.mouseUp);
        this.setActive();
    }

    setActive() {
        this.document.host.style.zIndex = 10000;
        Array.from(this.parentNode.querySelectorAll(this.tagName))
             .sort((a, b) => (Number(a.style.zIndex) > Number(b.style.zIndex)) ? 1 : -1)
             .forEach((win, i) => win.style.zIndex = i);
    }

    startAction(event, action) {
        const e = 'ontouchstart' in document.documentElement ? event.changedTouches[0] : event;
        this.setActive();
        this.mouse = { action: this.state.action = action, x: e.clientX, y: e.clientY };
        this.render();
        event.preventDefault();
    }

    onMove(x,y) {
        if(!this.mouse.action) return;
        let dx = this.mouse.x - x;
        let dy = this.mouse.y - y;
        if(dx !== 0 || dy !== 0)
            this.mouse.action == 'move' ? this.moveWindow(dx, dy) : this.resizeWindow(dx, dy);
        this.mouse.x = x;
        this.mouse.y = y;
    }

    removePX(x) {
        return parseInt(x.substr(0, x.length-2));
    }

    resizeWindow(dx, dy) {
        let width  = this.removePX(this.state.width) - dx;
        let height = this.removePX(this.state.height) - dy;
        const left = this.removePX(this.state.left);
        const top  = this.removePX(this.state.top);
        if(width  < this.minWidth)  width  = this.minWidth;
        if(height < this.minHeight) height = this.minHeight;
        if(left + width > document.documentElement.clientWidth)  width  = document.documentElement.clientWidth - left;
        if(top + height > document.documentElement.clientHeight) height = document.documentElement.clientHeight - top;
        this.state.width  = width  + 'px';
        this.state.height = height + 'px';
        this.render();
    }

    moveWindow(dx, dy) {
        const width  = this.removePX(this.state.width);
        const height = this.removePX(this.state.height);
        const rightMargin  = document.documentElement.clientWidth;
        const bottomMargin = document.documentElement.clientHeight;
        if(this.state.left != 'auto') {
            let left = this.removePX(this.state.left) - dx;
            if( left + width > rightMargin + width - this.minWidth ) left = rightMargin - this.minWidth;
            if( left < 0 ) left = 0;
            this.state.left = left + 'px';
        } else {
            let right = this.removePX(this.state.right) + dx;
            if( right + width > rightMargin ) right = rightMargin - width;
            if( right  < this.minWidth - width ) right = (this.minWidth-width);
            this.state.right = right + 'px';
        }
        if(this.state.top != 'auto') {
            let top = this.removePX(this.state.top) - dy;
            if( top < 0 ) top = 0;
            if( top > bottomMargin - this.minHeight ) top = bottomMargin - this.minHeight;
            this.state.top = top + 'px';
        } else {
            let bottom = this.removePX(this.state.bottom) + dy;
            if( bottom < this.minHeight - height) bottom = this.minHeight-height;
            if( bottom > bottomMargin - height) bottom = bottomMargin - height;
            this.state.bottom = bottom + 'px';
        }
        this.render();
    };

<!style>
    :host {
        position: absolute;
        top: 0;
    }
    .TWindow {
        position:               absolute;
        box-sizing:             border-box;
        -webkit-user-select:    none;
        user-select:            none;
        pointer-events:         all;
         border:                 1px solid rgba(0,0,0,0.2);
        font-size:              13px;
        font-family:            arial;
        overflow:               hidden;
        box-shadow:             0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
        border-radius:          5px;
    }

    .Overlay {
        top:                    0;
        left:                   0;
        position:               absolute;
        width:                  100%;
        height:                 100%;
        background:             black;
        opacity:                0;
        user-select:            none;
    }

    .TBody {
        color:                  black;
        bottom:                 0px;
        position:               absolute;
        box-sizing:             border-box;
        bottom:                 0px;
        width:                  100%;
    }

    .TResizeCorner {
        position:                 absolute;
        box-sizing:               border-box;
        -webkit-user-select:      none;
        user-select:              none;
        pointer-events:           all;
        right:                    0px;
        bottom:                   0px;
        width:                    0;
        height:                   0;
        border-top:               0px solid transparent;
        border-bottom:            14px solid #103252;
        border-left:              14px solid transparent;
        cursor:                   se-resize;
        opacity:                  0.5;
    }
    .TResizeText, .TMoveText {
        background:               linear-gradient(to bottom, #eda 1%, #dd9 100%);
        color:                    black;
        position:                 absolute;
        box-sizing:               border-box;
        -webkit-user-select:      none;
        user-select:              none;
        padding:                  0px 20px;
        pointer-events:           all;
    }

    .TResizeText {
        border-top-left-radius:   10px;
        right:                    0px;
        bottom:                   0px;
    }

    .TMoveText {
        border-bottom-right-radius: 10px;
        left:                       0px;
        top:                        0px;
    }

    .THeader {
        color:                  white;
        position:               absolute;
        box-sizing:             border-box;
        background:             #4d8f71;
        top:                    0px;
        width:                  100%;
        overflow:               hidden;
        padding-left:           10px;
        -webkit-user-select:    none;
        user-select:            none;
        cursor:                 move;
    }

    .TCloseButton {
        position:                 absolute;
        box-sizing:               border-box;
        -webkit-user-select:      none;
        user-select:              none;
        pointer-events:           all;
        width:                    14px;
        height:                   14px;
        top:                      3px;
        right:                    4px;
        background-image:         linear-gradient(to bottom, #dd3333 0%, #ff5555 100%);
        cursor:                   pointer;
        border:                   1px solid rgba(0, 0, 0, 0.5);
        border-radius:            8px;
    }

    .TCloseButton:hover {
        background-image:         linear-gradient(to bottom, #f26767 0%, #ff8888 100%);
    }


    .TSubmitButton {
        position:                 absolute;
        box-sizing:               border-box;
        -webkit-user-select:      none;
        user-select:              none;
        pointer-events:           all;
        width:                    14px;
        height:                   14px;
        top:                      3px;
        right:                    24px;
        background-image:         linear-gradient(to bottom, #c0dd33 0%, #f1ff55 100%);
        cursor:                   pointer;
        border:                   1px solid rgba(0, 0, 0, 0.5);
        border-radius:            8px;
    }

    .TSubmitButton:hover {
        background-image:         linear-gradient(to bottom, #d9f25e 0%, #f8ffaf 100%);
    }
