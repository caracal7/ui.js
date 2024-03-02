
function setPosition(attrs, scene, state) {
    if(['x','y','z'].some(_ => attrs.hasOwnProperty(_)))
        scene.position.set(
            state.x || 0,
            state.y || 0,
            state.z || 0
        );
}

function setRotation(attrs, scene, state) {
    if(['rx','ry','rz'].some(_ => attrs.hasOwnProperty(_)))
        scene.rotation.set(
            state.rx || 0,
            state.ry || 0,
            state.rz || 0
        );
}

function setScale(attrs, scene, state) {
    if(attrs.scale) return scene.scale.set(state.scale || 1); // if scale is set then sx,sy,sz is ignored
    if(['sx','sy','sz'].some(_ => attrs.hasOwnProperty(_)))
        scene.scale.set(
            state.sx || 1,
            state.sy || 1,
            state.sz || 1
        );

}

function setColor(attrs, mesh, renderer) {
    if(attrs.color) mesh.color = new renderer.ogl.Color(attrs.color);
}

function setEvents(attrs, mesh, renderer) {
    if(attrs.hasOwnProperty('events')) {
        if(attrs.events) {
            renderer.addEvents(mesh)
        } else {
            renderer.removeEvents(mesh);
        }
    }
}

function loadImage(url){
    return new Promise( resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = url;
    })
};

async function loadJSON(url) {
    return await (await fetch(url)).json();
};


export {
    setPosition,
    setRotation,
    setScale,
    setColor,
    setEvents,

    loadImage,
    loadJSON
}
