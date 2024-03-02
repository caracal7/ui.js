<!import { Archive, ArchiveCompression, ArchiveFormat } from ../dist/libarchive.js>

<a @click>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <path fill="currentColor" d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zm-132.9 88.7L299.3 420.7c-6.2 6.2-16.4 6.2-22.6 0L171.3 315.3c-10.1-10.1-2.9-27.3 11.3-27.3H248V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v112h65.4c14.2 0 21.4 17.2 11.3 27.3z"/>
    </svg>
    Download this example and try it youself
</a>

<!static>
    Archive.init({
        workerUrl: 'dist/worker-bundle.js'
    });

    function download(file, name) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = name;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    function String2Blob(str) {
        return new Blob([str], { type: 'text/plain;charset=utf-8' })
    }

    const README = caption => `
# ui.js example
---------------------------------------------------------
## ${caption}
---------------------------------------------------------
Just open the index.html file in your browser
---------------------------------------------------------
Copyright (C) Dmitrii Vasilev
MIT license
---------------------------------------------------------
Have a nice coding :)
`;

    const README2 = caption => `
# ui.js example
---
## ${caption}
---
This example needs to be served by the web server.
---------------------------------------------------------
1. Мake sure your system has node.js installed
2. Open project folder
3. Run 'npm install' to install dependencies
4. Run 'npm start'
---------------------------------------------------------
Or use your favorite web server
---------------------------------------------------------
Copyright (C) Dmitrii Vasilev
MIT license
---------------------------------------------------------
Have a nice coding :)
`;

    const ___WARNING_JS___ = () => `document.location.protocol == 'file:' && alert(\`
Cannot fetch external resources from a 'local' filesystem.
---------------------------------------------------------
This example needs to be served by the web server.
---------------------------------------------------------
1. Мake sure your system has node.js installed
2. Open project folder
3. Run 'npm install' to install dependencies
4. Run 'npm start'
---------------------------------------------------------
Or use your favorite web server
---------------------------------------------------------
Have a nice coding :)
\`);`;


    const INDEX = (filename, caption, isServerRequired) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ui.js examples - ${caption}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">`+
    (isServerRequired ? `
    <script type="text/javascript" src="___warning___.js"></script>` : ``)+`
    <script type="text/javascript" src="ui.js"></script>
    <style>html, body { padding: 0; margin: 0; height: 100%; }</style>
</head>
<body>
    <script type=ui example-app="${filename}"></script>
    <example-app></example-app>
</body>
</html>
`;

    const PACKAGE_JSON = () => `
{
  "name": "ui.js example",
  "scripts": {
    "start": "./node_modules/.bin/browser-sync start -s -w --directory --startPath ./index.html"
  },
  "author": "Dmitrii Vasilev",
  "license": "MIT",
  "devDependencies": {
    "browser-sync": "^2.29.1"
  }
}`;

    const addWarning = html => html.replace(`
<head>` , `
<head>
    <script type="text/javascript" src="___warning___.js"></script>`);


<!state>
    example: {}

<!class>



    async click() {
        const ui = await (await fetch('../dist/ui.js')).text();

        const caption = this.state.example.caption;
        const firstFile = this.state.example.urls[0];
        const isHTMLexample = firstFile.endsWith('.html');
        const isServerRequired = this.state.example.urls.length > 1 || !isHTMLexample; // external resources

        //  replace relational links
        this.state.example.urls.forEach((url, i) => {
            if(url.includes('/')) {
                const new_name = url.slice(url.lastIndexOf('/') + 1);
                const escaped = url.split('.').join('\\.').split('/').join('\\/');

                this.state.example.sources.forEach((src, k) => {
                    if(k == i) return;

                    if(new_name.endsWith('.css'))
                        this.state.example.sources[k] = src.replace(new RegExp("(^\\s*<!css\\s+)("+escaped+"\\s*)(>\\s*$)",'im'), `$1${new_name}$3`);

                    if(new_name.endsWith('.tag'))
                        this.state.example.sources[k] = src.replace(new RegExp("(^\\s*<!tag\\s+@[^\\s]+\\s*)("+escaped+"\\s*)(>\\s*$)",'im'), `$1${new_name}$3`);

                });
            }
        });


        const files = [
            {
                file: String2Blob(isServerRequired ? README2(caption) : README(caption)),
                pathname: 'README.md'
            },
            {
                file: String2Blob(isHTMLexample ?
                    (this.state.example.urls.length > 1 ? addWarning(this.state.example.sources[0]) : this.state.example.sources[0]) :
                    INDEX(firstFile, caption, isServerRequired)),
                pathname: 'index.html'
            },
            {
                file: String2Blob(ui),
                pathname: 'ui.js'
            }
        ];


        const processExternal = async (i, url, _path) => {
            if(url.endsWith('.jpg') || url.endsWith('.png')) {
                var src = await (await fetch('examples/' + this.state.example.base + '/' + url).catch(e => false)).blob();
            } else {
                var src = (await (await fetch('examples/' + this.state.example.base + '/' + url).catch(e => false)).text()).trim();
            }

            const new_name = _path + '/' + url.slice(url.lastIndexOf('/') + 1);
            const escaped  = url.split('.').join('\\.').split('/').join('\\/');

            if(typeof src === 'string') this.state.example.sources.forEach((src, k) => {
                if(new_name.endsWith('.css'))
                    this.state.example.sources[k] = src.replace(new RegExp("(^\\s*<!css\\s+)("+escaped+"\\s*)(>\\s*$)",'im'), `$1${new_name}$3`);

                if(new_name.endsWith('.tag'))
                    this.state.example.sources[k] = src.replace(new RegExp("(^\\s*<!tag\\s+@[^\\s]+\\s*)("+escaped+"\\s*)(>\\s*$)",'im'), `$1${new_name}$3`);

                if(new_name.endsWith('.js'))
                    this.state.example.sources[k] = src.replace(new RegExp("(^\\s*<!import\\s+.*\\s+from\\s+)("+escaped+"\\s*)(>\\s*$)",'im'), `$1${new_name}$3`);
            });

            files.push({
                file: typeof src === 'string' ? String2Blob(src) : src,
                pathname: new_name
            });
        }

        //  fetch externals
        if(this.state.example.externals) {
            if(Array.isArray(this.state.example.externals)) {
                for (const [i, url] of this.state.example.externals.entries()) {
                    await processExternal(i, url, 'lib');
                }
            } else {
                for (const [_path, urls_arr] of Object.entries(this.state.example.externals)) {
                    for (const [i, url] of urls_arr.entries()) {
                        await processExternal(i, url, _path);
                    }
                }
            }
        }


        if(isServerRequired) {
            files.push({
                file: String2Blob(___WARNING_JS___()),
                pathname: '___warning___.js'
            });
            files.push({
                file: String2Blob(PACKAGE_JSON()),
                pathname: 'package.json'
            });
        }

        this.state.example.sources.forEach((src, i) => {
            if(isHTMLexample && i == 0) return;
            files.push({
                file: String2Blob(src),
                pathname: this.state.example.urls[i].slice(this.state.example.urls[i].lastIndexOf('/') + 1)
            });
        });

        //console.log(files);


        const archiveFile = await Archive.write({
            files,
            outputFileName: caption + ".zip",
            compression: ArchiveCompression.GZIP,
            format: ArchiveFormat.ZIP,
            passphrase: null,
        });

        download(archiveFile, caption + ".zip");

    }

<!style>
    :host {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 10000;
        font-family: arial;
        font-size: 12px;
    }

    svg {
        position: absolute;
        top:10px;
        left:12px;
        width: 19px;
    }
    a {
        text-decoration: none;
        position: relative;
        display: inline-block;
        color: black;
        cursor: pointer;

        transition: all 0.4s ease-in-out;
        line-height: 1.5;

        margin: 0 0;
        padding: 7px 15px 7px 38px;
        border: 1px solid transparent;
        border-radius: 4px;

        user-select: none;
        white-space: nowrap;
        background: #48d037;
        border: 1px solid #3daf2e;
        animation: rotate-shake infinite 2s;
    }

    a:after {
        content: "☝️"
    }
    a:hover:after {
        content: "👻"
    }
    a:hover {
        background: gold;
        border: 1px solid gold;
    }


    @keyframes rotate-shake {
        0% {
            transform: translateY(0);
        }
        20% {
            transform: translateY(-15px) rotate(2deg);
        }
        25% {
            transform: translateY(-15px) rotate(-2deg);
        }
        30% {
            transform: translateY(-15px) rotate(2deg);
        }
        35% {
            transform: translateY(-15px) rotate(0deg);
        }
        100% {
            transform: translateY(0);
        }

    }
