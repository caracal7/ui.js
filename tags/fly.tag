<slot></slot>

<!class>

    connected() {

        setTimeout(() => {
            const LEN = 30;

            this.tags = this.document.querySelectorAll('slot')[0].assignedElements();

            this.trs = Array.from(this.slotted[0].children)
            this.tds = this.trs.reduce((a, c) => a.concat(Array.from(c.children)), []);
            this.tds.forEach(td => {
                td.childNodes.forEach(node => {
                    if(node.nodeType === Node.TEXT_NODE) {
                        var newNode = document.createElement("span");
                        newNode.innerHTML = ''+node.textContent.trim().split('').map(x=>'<u>'+x+'</u>').join('')+'';
                        Array.from(newNode.children).forEach((u, i) => {
                            u.style.textDecoration = 'none';
                            u.style.position = 'relative';
                            u.onmouseenter = () => {
                                u.springX = new this.Spring({ stiffness: 500, damping: 40, mass: 8, delta: 1, current: 0, target: Math.round(Math.random()*LEN-LEN/2) });
                                u.springY = new this.Spring({ stiffness: 500, damping: 40, mass: 8, delta: 1, current: 0, target: Math.round(Math.random()*LEN-LEN/2) });
                                u.springX.callback = value => u.style.left = value+'px';
                                u.springY.callback = value => u.style.top = value+'px';
                                u.style.opacity = '0.2';
                                setTimeout(() => {
                                    u.springX.mass = 3;
                                    u.springY.mass = 3;
                                    u.springX.set(0);
                                    u.springY.set(0);
                                    u.style.opacity = 1;
                                },
                                1000);
                            }
                        });
                        node.replaceWith(newNode);
                    }
                });
            });
        }, 0);

    }
