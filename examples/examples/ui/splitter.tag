<slot/>

<!state>
	width: undefined,
	height: undefined,
	separator: undefined,
	vertical: undefined,
	horisontal: undefined,
	auto: undefined,
	fixed: undefined,
	'max-width' : undefined,
	'min-width' : undefined,
	'max-height' : undefined,
	'min-height' : undefined,


<!static>

	const onPointerDown = pointerDownEvent => {
	    var _a;
	    var separator = pointerDownEvent.target;
	    var container = separator.parentElement;

	    if (!container || !pointerDownEvent.isPrimary || pointerDownEvent.button !== 0) return;

	    var vertical = container.hasAttribute('vertical');
	    var horizontal = container.hasAttribute('horizontal');
	    if (!vertical && !horizontal) return;

	    // prevent text selection
	    pointerDownEvent.preventDefault();
	    var pointerId = pointerDownEvent.pointerId;
	    var pane1 = separator.previousElementSibling;
	    var pane2 = separator.nextElementSibling;
	    var containerStyle = getComputedStyle(container);
	    if ((containerStyle.flexDirection.indexOf('reverse') !== -1 ? -1 : 1) * (horizontal && containerStyle.direction === 'rtl' ? -1 : 1) === -1) {
	        _a = [pane2, pane1], pane1 = _a[0], pane2 = _a[1];
	    }
	    var pane1ComputedStyle = getComputedStyle(pane1);
	    var pane2ComputedStyle = getComputedStyle(pane2);
	    var pane1Rect = pane1.getBoundingClientRect();
	    var onPointerMove;

	    if (vertical) {
	        var pane1Pos_1 = pane1Rect.top + pointerDownEvent.offsetY;
	        var totalSize_1 = pane1.offsetHeight + pane2.offsetHeight;
	        var pane1MinSize_1 = Math.max(parseInt(pane1ComputedStyle.minHeight, 10) || 0, totalSize_1 - (parseInt(pane2ComputedStyle.maxHeight, 10) || totalSize_1));
	        var pane1MaxSize_1 = Math.min(parseInt(pane1ComputedStyle.maxHeight, 10) || totalSize_1, totalSize_1 - (parseInt(pane2ComputedStyle.minHeight, 10) || 0));
	        onPointerMove = function (event) {
	            if (event.pointerId === pointerId) {
	                var pane1Size = Math.round(Math.min(Math.max(event.clientY - pane1Pos_1, pane1MinSize_1), pane1MaxSize_1));
	                pane1.style.height = pane1Size + 'px';
	                pane2.style.height = totalSize_1 - pane1Size + 'px';
					window.dispatchEvent(new Event('resize'));
	            }
	        };
	    }
	    else {
	        var pane1Pos_2 = pane1Rect.left + pointerDownEvent.offsetX;
	        var totalSize_2 = pane1.offsetWidth + pane2.clientWidth;
	        var pane1MinSize_2 = Math.max(parseInt(pane1ComputedStyle.minWidth, 10) || 0, totalSize_2 - (parseInt(pane2ComputedStyle.maxWidth, 10) || totalSize_2));
	        var pane1MaxSize_2 = Math.min(parseInt(pane1ComputedStyle.maxWidth, 10) || totalSize_2, totalSize_2 - (parseInt(pane2ComputedStyle.minWidth, 10) || 0));
	        onPointerMove = function (event) {
	            if (event.pointerId === pointerId) {
	                var pane1Size = Math.round(Math.min(Math.max(event.clientX - pane1Pos_2, pane1MinSize_2), pane1MaxSize_2));
	                pane1.style.width = pane1Size + 'px';
	                pane2.style.width = totalSize_2 - pane1Size + 'px';
					window.dispatchEvent(new Event('resize'));
	            }
	        };
	    }

	    var onPointerUp = function (event) {
	        if (event.pointerId === pointerId) {
	            separator.releasePointerCapture(pointerId);
	            separator.removeEventListener('pointercancel', onPointerUp);
	            separator.removeEventListener('pointermove',   onPointerMove);
	            separator.removeEventListener('pointerup',     onPointerUp);
	        }
	    };
	    onPointerMove(pointerDownEvent);
	    pane1.style.flexShrink = pane2.style.flexShrink = 1;
	    separator.addEventListener('pointercancel', onPointerUp);
	    separator.addEventListener('pointermove',   onPointerMove);
	    separator.addEventListener('pointerup',     onPointerUp);
	    separator.setPointerCapture(pointerId);
	}


<!class>

    /* Based on https://github.com/luncheon/flex-splitter-directive */
    init() {
        this.AddAttributes = true;
		this.eventsIsSet = false;
	}

    connected(state) {


        const style = this.document.host.style;
        //  Transform attributes to styles
        if(this.state.separator === undefined) {

			//----------- NEED MORE TESTS
			if(this.hasAttribute('horizontal') && !this.state.height) this.state.height = '100%';
			//if(this.hasAttribute('vertical') && !this.state.width) this.state.width = '100%';
			//----------- NEED MORE TESTS

            ['width', 'height', 'max-width', 'min-width', 'max-height', 'min-height']
                .map(attr => this.state[attr] !== undefined && style.setProperty(attr, this.state[attr]));
            this.state.auto !== undefined && style.setProperty('flex', `auto`);

        }
        //  Add styles to separators
        if(this.state.separator !== undefined && this.parentNode && this.nodeName == this.parentNode.nodeName) {
            style.setProperty("flex", "none");
			style.setProperty("box-sizing", "border-box");
            if(this.parentNode.hasAttribute('horizontal')) {
                style.setProperty("--separator-width", "12px");
                style.setProperty("--separator-height", "100%");
                style.setProperty("--separator-width2", "4px");
                style.setProperty("--separator-height2", "24px");
                style.setProperty("--border-style", this.state.fixed !== undefined ? "none" : "none solid");
                style.setProperty("--separator-cursor", this.state.fixed !== undefined ? "auto" : "ew-resize");
            }
            if(this.parentNode.hasAttribute('vertical')) {
                style.setProperty("--separator-width", "100%");
                style.setProperty("--separator-height", "12px");
                style.setProperty("--separator-width2", "24px");
                style.setProperty("--separator-height2", "4px");
                style.setProperty("--border-style", this.state.fixed !== undefined ? "none" : "solid none");
                style.setProperty("--separator-cursor", this.state.fixed !== undefined ? "auto" : "ns-resize");
            }
        }
        //  Add styles to panes
        if(this.state.separator === undefined && this.parentNode && this.nodeName == this.parentNode.nodeName) {
            if(this.parentNode.hasAttribute('horizontal') || this.parentNode.hasAttribute('vertical')) {
                style.setProperty("box-sizing", "border-box");
                if(this.state.auto === undefined) style.setProperty("flex", "none");
				if(!style.getPropertyValue("overflow"))	style.setProperty("overflow", "auto");
            }
        }
        //  Handle separators
        if(this.state.separator !== undefined) {
			if(this.state.fixed === undefined) {
				if(!this.eventsIsSet) {
		            this.addEventListener('pointerdown', onPointerDown);
					this.eventsIsSet = true;
				}
			} else {
			    if(this.eventsIsSet) this.removeEventListener('pointerdown', onPointerDown);
			}
		}

    }



<!style>

	:host {
	    --separator-cursor: auto;
	    --separator-width: 8px;
	    --separator-height: 8px;
	    --separator-width2: 4px;
	    --separator-height2: 4px;
	    --border-style: none;
	    box-sizing: border-box;
		position: relative;
	}
	:host([horizontal]), :host([vertical]) {
	    display: flex;
	}
	:host([horizontal]) {
	    width: 100%;
	    flex-direction: row;
	}

	:host([vertical]) {
	    height: 100%;
	    flex-direction: column;
	}

	:host([separator]) {
	    touch-action: none;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    background-color: rgba(160,160,160,0.25);
	    cursor: var(--separator-cursor);
	    width: var(--separator-width);
	    height: var(--separator-height);
	}
	:host([separator])::before {
	    content: '';
	    box-sizing: border-box;
	    border: 1.25px rgba(160,160,160,0.8);
	    width: var(--separator-width2);
	    height: var(--separator-height2);
	    border-style: var(--border-style);
	}
