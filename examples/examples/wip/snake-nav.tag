
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#31c96e" stroke-width="3" fill="transparent" stroke-dasharray="0, 0, 0, 1000" stroke-linecap="round" stroke-linejoin="round" transform="translate(-10.5, -0.5)" />
</svg>

<slot></slot>

<!static>

<!class>
    connected() {
        var toc = this.document.querySelectorAll('slot')[0].assignedElements()[0];
        var tocPath = this.document.querySelector('path');
        var tocItems;

        //console.log(toc, tocPath)

        //  set NAV elements styles

        toc.querySelectorAll('a').forEach(a => {
            a.style.display = 'inline-block';
            a.style.color = '#aaa';
            a.style.textDecoration = 'none';
            a.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
        });
        toc.querySelectorAll('ul').forEach(ul => {
            ul.style.listStyle = 'none';
            ul.style.padding = '0';
            ul.style.margin = '0';
            ul.style.paddingLeft = '2em';
        });

        // Factor of screen size that the element must cross
        // before it's considered visible
        var TOP_MARGIN = 0.1, BOTTOM_MARGIN = 0.2;
        var pathLength;
        var lastPathStart,lastPathEnd;

        const drawPath = () => {
            tocItems = [].slice.call(toc.querySelectorAll('li'));
            // Cache element references and measurements
            tocItems = tocItems.map(item => {
                var anchor = item.querySelector('a');
                var target = document.getElementById(anchor.getAttribute('href').slice( 1 ));
                return {
                    listItem: item,
                    anchor: anchor,
                    target: target
                };
            });

            // Remove missing targets
            tocItems = tocItems.filter(item => !!item.target);

            var path = [];
            var pathIndent;

            tocItems.forEach((item, i) => {
                var x = item.anchor.offsetLeft - 5;
                var y = item.anchor.offsetTop;
                var height = item.anchor.offsetHeight;
                if(i === 0) {
                    path.push('M', x, y, 'L', x, y + height );
                    item.pathStart = 0;
                } else {
                    // Draw an additional line when there's a change in
                    // indent levels
                    if(pathIndent !== x) path.push('L', pathIndent, y);
                    path.push('L', x, y);
                    // Set the current path so that we can measure it
                    tocPath.setAttribute('d', path.join(' '));
                    item.pathStart = tocPath.getTotalLength() || 0;
                    path.push('L', x, y + height);
                }
                pathIndent = x;
                tocPath.setAttribute('d', path.join(' '));
                item.pathEnd = tocPath.getTotalLength();
            });

            pathLength = tocPath.getTotalLength();
            sync();
        }

        function sync() {
            var windowHeight = window.innerHeight;
            var pathStart = pathLength, pathEnd = 0;
            var visibleItems = 0;
            tocItems.forEach(item => {
                var a = item.listItem.querySelector('a')
                var targetBounds = item.target.getBoundingClientRect();
                if(targetBounds.bottom > windowHeight * TOP_MARGIN && targetBounds.top < windowHeight * (1 - BOTTOM_MARGIN)) {
                    pathStart = Math.min(item.pathStart, pathStart);
                    pathEnd = Math.max(item.pathEnd, pathEnd);
                    visibleItems += 1;
                    a.style.color = '#111';
                    a.style.transform = 'translate(5px)';
                }
                else {
                    a.style.color = '#aaa';
                    a.style.transform = 'translate(0px)';
                }
            });
            // Specify the visible path or hide the path altogether
            // if there are no visible items
            if( visibleItems > 0 && pathStart < pathEnd ) {
                if(pathStart !== lastPathStart || pathEnd !== lastPathEnd) {
                    tocPath.setAttribute('stroke-dashoffset', '1');
                    tocPath.setAttribute('stroke-dasharray', '1, '+ pathStart +', '+ (pathEnd - pathStart) +', ' + pathLength);
                    tocPath.setAttribute('opacity', 1);
                }
            }
            else {
                tocPath.setAttribute('opacity', 0);
            }
            lastPathStart = pathStart;
            lastPathEnd = pathEnd;
        }

        drawPath();

        this.on('resize', drawPath, false );
        this.on('scroll', sync, false );

        // ANIMATE FONT-WEIGHT ON HEADINGS WHEN THEY ARE IN VIEW
        const animateHeader = function(guideHeader, ratio) {
            if (ratio > 0) {
                guideHeader.classList.add('in-view');
            } else {
                guideHeader.classList.remove('in-view');
            }
        };

        // Setup the Intersection observer to watch the boxes we care about
        // and when theyre in view fire the animation function to add our
        // CSS classes
        const article = this.document.querySelectorAll('slot')[0].assignedElements()[1];
        const guideHeaders = article.querySelectorAll('p');
        const guideHeadersObserver = new IntersectionObserver(entries => entries.forEach(e => animateHeader(e.target, e.intersectionRatio)), { threshold: 0.1 });
        for (const guideHeader of guideHeaders) {
            guideHeadersObserver.observe(guideHeader);
            guideHeadersObserver.observe(guideHeader.closest('section'));
        }

    }

<!state>


<!style>
    :host {
        position: relative;
        display: block;
        padding: 2em 2em 2em 17em;
        line-height: 1.6;
        font-family: "Roboto", sans-serif;
    }

    svg {
        position: fixed;
        top: 300px;
        left: -0.7em;
        width: 100%;
        height: 100%;
    }

    path {
        transition: all 0.3s ease;
    }

    ::slotted(nav) {
        position: fixed;
        margin-left: -18.5em;
        top: 300px;
        padding: 1em;
        width: 14em;
        line-height: 2;
        height: 0px;
    }







    /**/
