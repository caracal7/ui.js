export default [
    { caption: 'Basics', submenu: [
        { caption: 'Hello world',           base: 'basics', urls: ['hello-world.html'] },
        { caption: 'Hey ui.js',             base: 'basics', urls: ['hey-ui.js.html'] },
        { caption: 'Add event',             base: 'basics', urls: ['add-event.html'] },
        { caption: 'Add state',             base: 'basics', urls: ['state.html'] },
        { caption: 'Conditions',            base: 'basics', urls: ['conditions.html'] },
        { caption: 'Loops',                 base: 'basics', urls: ['loops.html'] },
        { caption: 'More events',           base: 'basics', urls: ['more-events.html'] },
        { caption: 'Styles',                base: 'basics', urls: ['styles.html'] },
        { caption: 'Inline style',          base: 'basics', urls: ['inline-style.html'] },
        { caption: 'External CSS',          base: 'basics', urls: ['external-css.html', 'my.css'] },
        { caption: 'Import tags to HTML',   base: 'basics', urls: ['load-external-tags.html', 'colored.tag', 'msg.tag'] },
        { caption: 'Import tags to ui.js',  base: 'basics', urls: ['aliases.html', 'colored.tag', 'msg.tag'] },
        { caption: 'Import ES modules',     base: 'basics', urls: ['import-js.html', 'example.js','example2.js'] },
        { caption: 'Reactive attributes',   base: 'basics', urls: ['reactive.html'] },
    ]},
    { caption: 'Enter / Update / Exit / Restore', submenu: [
        { caption: 'EUER',                    base: 'euer', urls: ['euer.html'] },
        { caption: 'Letters',                base: 'euer', urls: ['letters.html'] },
        { caption: 'Drag & Drop sort list',  base: 'euer', urls: ['sorted-list.tag', 'sorted-list.css'] },
        { caption: 'CSS Matrix3d',           base: 'euer', urls: ['matrix3d.tag', 'chemicalElements.js']},
    ]},
    { caption: 'SVG', submenu: [
        { caption: 'Letters SVG',            base: 'svg', urls: ['letters.tag'] },
    ]},

    { caption: 'UI components', submenu: [
        { caption: 'Windows',               base: 'ui',         urls: ['windows.html', 'window.tag'] },
        { caption: 'Masonry',               base: 'ui',         urls: ['masonry-test.tag', 'masonry.tag'] },
        { caption: 'Splitter simple',       base: 'ui',         urls: ['splitter-simple.html', 'splitter.tag'] },
        { caption: 'Splitter advanced',     base: 'ui',         urls: ['splitter-advanced.html', 'splitter.tag'] },
        { caption: 'Table',                 base: 'ui/table',   urls: ['example.tag', 'table.tag', 'currency.tag', 'knum.tag'] },
        { caption: 'Tabs',                  base: 'ui',         urls: ['simple-tabs.html', 'tabs.tag'] },
        { caption: 'Full-height tabs',      base: 'ui',         urls: ['fullheight-tabs.html', 'tabs.tag'] },
        { caption: 'Full-height accordion', base: 'ui',         urls: ['fill-height-accordion.html'] },
        { caption: 'Side menu',             base: 'ui',         urls: ['side-menu.tag'] },
        { caption: 'Responsive cards',      base: 'ui',         urls: ['responsive-cards.html', 'flex-cards.tag'] },
        { caption: 'Simple dialog',         base: 'ui',         urls: ['dialog.html', 'dialog.tag', '../../assets/button.css'] },
        { caption: 'Popup menu',            base: 'ui',         urls: ['popup.html', 'popup-menu.tag'] },
        { caption: 'JSON view',             base: 'ui',         urls: ['json-view-test.tag', 'json-view.tag'] },
    ]},
    { caption: 'To-Do', submenu: [
        { caption: 'Minimal To-Do list',  base: 'to-do', urls: ['nano-to-do.tag'] },
        { caption: 'Bench To-Do list',     base: 'to-do', urls: ['bench-to-do.tag', 'bench-to-do.css'] },
    ]},

    { caption: 'Demo', submenu: [
        { caption: 'Minesweepper',          base: 'demo', urls: ['minesweeper.tag'] },
        { caption: 'Excel',                 base: 'demo', urls: ['excel.tag'] },
        { caption: 'Clock',                 base: 'demo', urls: ['clock.tag'] },
        { caption: 'Vanilla WebGL',         base: 'demo', urls: ['VanillaWebGL.tag'] },
        { caption: 'Vanilla 2D WebGL',      base: 'demo', urls: ['Vanilla2DWebGL.tag'] },
        { caption: 'Shadertoy',   submenu: [
            { caption: 'Simple',          base: 'demo/shadertoy', urls: ['simple.tag', 'shadertoy.tag'] },
            { caption: 'Examples',        base: 'demo/shadertoy', urls: ['examples.tag', 'shadertoy.tag', 'shaders.examples.js'], externals: {tags:['../../ui/window.tag', '../../ui/splitter.tag'] }},
        ]},
        { caption: 'Logo maker',          base: 'demo', urls: ['logo-maker.tag', 'logo-maker.css'] },
    ]},
    { caption: 'Integrations', submenu: [
        { caption: 'axon.js',                   base: 'integrations/axon.js', urls: ['axon.tag', 'axon-debug.tag'], externals: {lib:['axon.esm.js', '../../../assets/button.css','../../ui/window.tag', '../../ui/table/table.tag', '../../ui/table/currency.tag', '../../ui/table/knum.tag'] }},
        { caption: 'GPU.js',   submenu: [
            { caption: 'Fade',                  base: 'integrations/GPU.js', urls: ['fade.tag'], externals: { gpu: ['gpu-browser.esm.js']}},
            { caption: 'Julia fractal',         base: 'integrations/GPU.js', urls: ['julia.tag'], externals: { gpu: ['gpu-browser.esm.js']}},
            { caption: 'Parametric animation',  base: 'integrations/GPU.js', urls: ['paraplot.tag'], externals: { gpu: ['gpu-browser.esm.js']}},
            { caption: 'Game Of Life',          base: 'integrations/GPU.js', urls: ['conway.tag'], externals: { gpu: ['gpu-browser.esm.js']}},
        ]},
        { caption: 'JSCAD',   submenu: [
            { caption: 'Simple',   base: 'integrations/jscad', urls: ['jscad-simple.tag'], externals: {
                'tags/jscad': ['jscad.tag', 'jscad-modeling.esm.min.js', 'jscad-regl-renderer.esm.min.js', 'jscad-example.js']
            }},
            { caption: 'Editor',   base: 'integrations/jscad', urls: ['jscad-editor.tag'], externals: {
                'tags/jscad': [
                    'jscad.tag',
                    'jscad-modeling.esm.min.js',
                    'jscad-regl-renderer.esm.min.js',
                    'jscad-example.js'
                ],
                'tags/monaco-editor': [
                    '../../integrations/monaco-editor/ui-monaco/monaco-editor.tag',
                    '../../integrations/monaco-editor/ui-monaco/editor.html',
                    '../../integrations/monaco-editor/ui-monaco/main.bundle.js',
                    '../../integrations/monaco-editor/ui-monaco/editor.worker.js',
                    '../../integrations/monaco-editor/ui-monaco/css.worker.js',
                    '../../integrations/monaco-editor/ui-monaco/ts.worker.js',
                    '../../integrations/monaco-editor/ui-monaco/68664da4962ed33db33e.ttf',
                    '../../integrations/monaco-editor/ui-monaco/166.bundle.js',
                    '../../integrations/monaco-editor/ui-monaco/409.bundle.js',
                    '../../integrations/monaco-editor/ui-monaco/504.bundle.js',
                    '../../integrations/monaco-editor/ui-monaco/590.bundle.js',
                    '../../integrations/monaco-editor/ui-monaco/807.bundle.js',
                    '../../integrations/monaco-editor/ui-monaco/ts.worker.js.LICENSE.txt'
                ],
                'tags' : ['../../../assets/button.css','../../ui/window.tag']
            }},
        ]},
        { caption: 'OGL',   submenu: [
            { caption: 'Simple',            base: 'integrations/ogl', urls: ['ogl_simple.tag'], externals: { ogl: ['ogl.esm.js'] } },
            { caption: 'Base primitives',   base: 'integrations/ogl', urls: ['base-primitives.tag'], externals: { ogl: ['ogl.esm.js'] } },
            { caption: 'Scene graph',       base: 'integrations/ogl', urls: ['scene-graph.tag'], externals:{ ogl: ['ogl.esm.js'] } },
            { caption: 'MSDF text',         base: 'integrations/ogl', urls: ['ogl_text.tag'], externals: {
                ogl: [
                    'ogl.esm.js',
                ],
                assets: [
                    '../../../assets/FiraSans-Bold.json',
                    '../../../assets/FiraSans-Bold.png',
                ]
            }},
        ]},
        { caption: 'Three.js',   submenu: [
            { caption: 'Simple',   base: 'integrations/three.js', urls: ['simple.tag' , 'three.helper.js'], externals: {three:['three.module.min.js']} },
        ]},
        { caption: 'Markdown-it / Highlight.js',    base: 'integrations/markdown-it', urls: ['markdown.html', 'markdown.tag', 'test.md'], externals: {
            lib: ['markdown-it.min.js', 'highlight.min.js', 'default.min.css']
        }},
        { caption: 'Monaco editor',                 base: 'integrations/monaco-editor', urls: ['monaco-example.tag'], externals: {
                'tags': [
                    '../../ui/window.tag'
                ],
                'tags/monaco-editor': [
                    'ui-monaco/monaco-editor.tag',
                    'ui-monaco/editor.html',
                    'ui-monaco/main.bundle.js',
                    'ui-monaco/editor.worker.js',
                    'ui-monaco/css.worker.js',
                    'ui-monaco/ts.worker.js',
                    'ui-monaco/68664da4962ed33db33e.ttf',
                    'ui-monaco/166.bundle.js',
                    'ui-monaco/409.bundle.js',
                    'ui-monaco/504.bundle.js',
                    'ui-monaco/590.bundle.js',
                    'ui-monaco/807.bundle.js',
                    'ui-monaco/ts.worker.js.LICENSE.txt'
                ]
            }
        },
    ]},
    { caption: 'Custom renderers', submenu: [
        { caption: 'OGL',   submenu: [
            { caption: 'Demo',     base: 'custom-renderers/ogl', urls: ['demo.tag'], externals: {
                ogl: [
                    'ogl/ogl.esm.js',
                    'ogl/utils.js',
                    'ogl/ogl-renderer.tag',
                ],
                'ogl/helpers': [
                    'ogl/helpers/ogl-axes.tag',
                    'ogl/helpers/ogl-grid.tag',
                ],
                'ogl/objects': [
                    'ogl/objects/ogl-box.tag',
                    'ogl/objects/ogl-cylinder.tag',
                    'ogl/objects/ogl-empty.tag',
                    'ogl/objects/ogl-model.tag',
                    'ogl/objects/ogl-sphere.tag',
                    'ogl/objects/ogl-text.tag',
                ],
                assets: [
                    '../../../assets/FiraSans-Bold.json',
                    '../../../assets/FiraSans-Bold.png',

                    '../../../assets/acorn.json',
                    '../../../assets/croissant.json',
                    '../../../assets/goat.json',
                    '../../../assets/macaw.json',
                    '../../../assets/octopus.json',
                    '../../../assets/fox.json',
                    '../../../assets/airplane.json',
                    '../../../assets/forest.json',

                    '../../../assets/acorn.jpg',
                    '../../../assets/croissant.jpg',
                    '../../../assets/goat.jpg',
                    '../../../assets/macaw.jpg',
                    '../../../assets/octopus.jpg',
                    '../../../assets/fox.jpg',
                    '../../../assets/airplane.jpg',
                    '../../../assets/forest.jpg',
                ]
            }},
            { caption: 'EUER',     base: 'custom-renderers/ogl', urls: ['euer.tag'], externals: {
                ogl: [
                    'ogl/ogl.esm.js',
                    'ogl/utils.js',
                    'ogl/ogl-renderer.tag',
                ],
                'ogl/helpers': [
                    'ogl/helpers/ogl-axes.tag',
                    'ogl/helpers/ogl-grid.tag',
                ],
                'ogl/objects': [
                    'ogl/objects/ogl-box.tag',
                    'ogl/objects/ogl-model.tag',
                ],
                assets: [
                    '../../../assets/fox.json',
                    '../../../assets/fox.jpg',
                ]
            }},
            { caption: 'Letters',  base: 'custom-renderers/ogl', urls: ['letters.tag'], externals: {
                ogl: [
                    'ogl/ogl.esm.js',
                    'ogl/utils.js',
                    'ogl/ogl-renderer.tag',
                ],
                'ogl/helpers': [
                    'ogl/helpers/ogl-axes.tag',
                    'ogl/helpers/ogl-grid.tag',
                ],
                'ogl/objects': [
                    'ogl/objects/ogl-box.tag',
                    'ogl/objects/ogl-model.tag',
                    'ogl/objects/ogl-text.tag',
                ],
                assets: [
                    '../../../assets/FiraSans-Bold.json',
                    '../../../assets/FiraSans-Bold.png',
                    '../../../assets/fox.json',
                    '../../../assets/fox.jpg',
                ]
            } },
        ]},
    ]},
    { caption: 'Walt plugin', submenu: [
        { caption: 'Counter',         base: 'walt', urls: ['counter.html'] },
        { caption: 'Fibonacci',       base: 'walt', urls: ['fibonacci.tag', '../../assets/button.css'] },
        { caption: 'Object literals', base: 'walt', urls: ['ObjectLiterals.tag'] },
        { caption: 'Walt <--> JS',    base: 'walt', urls: ['interop.tag'] },
        { caption: 'Simple canvas',   base: 'walt', urls: ['canvas.tag'] },
        { caption: 'Bounce',          base: 'walt', urls: ['bounce.tag'] },
        { caption: 'Waves',           base: 'walt', urls: ['waves.tag'] },

    ]},
    { caption: 'Other', submenu: [
        { caption: 'Direct HTML mount', base: 'other', urls: ['HTMLmount.html'] },
    ]},
]
