<div class="body">
    <slot></slot>
</div>

<!class>
    connected() {
        this.on('scroll', () => {
            var scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if(scrollTop >= 30) {
                this.document.querySelector(".body").className = 'body sticky-header';
            } else {
                this.document.querySelector(".body").className = 'body';
            }
        });
    }

<!style>
    * {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .body {
        font-family: helvetica, arial, sans-serif;
        padding-top: 300px;
        -moz-transition: padding-top 0.5s ease;
        -o-transition: padding-top 0.5s ease;
        -webkit-transition: padding-top 0.5s ease;
        transition: padding-top 0.5s ease;
    }

    ::slotted(main) {
        position: relative;
    }

    ::slotted(header) {
        width: 100%;
        height: 300px;
        background-color: #69A664;

        text-align: center;
        position: fixed;
        top: 0;
        overflow: hidden;

        -moz-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        -webkit-transition: all 0.5s ease;
        transition: all 0.5s ease;
        z-index: 50000;
    }

    /* Sticky Header Style */
    /* ---------------------------------------- */
    .body.sticky-header {
        padding-top: 100px;
    }
    .body.sticky-header > ::slotted(header) {
        height: 40px;
    }
