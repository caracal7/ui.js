

function setupCamera(THREE, container) {
	const camera = new THREE.PerspectiveCamera( 70, container.clientWidth / container.clientHeight, 1, 5000 );
	camera.position.set( 0, 15, 0 );
    camera.up = new THREE.Vector3(0,1,0);
	const lookAt = new THREE.Vector3(0,0,0);
	camera.lookAt( lookAt );
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
	return camera;
}

function setupRenderer(THREE, container, options) {
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setClearColor( 0x000000, 1 );
/*
	renderer.outputColorSpace = options.sRGBEncoding ? THREE.sRGBEncoding : THREE.LinearEncoding;
	renderer.toneMapping = options.toneMapping ? THREE.Uncharted2ToneMapping : THREE.NoToneMapping;
	renderer.toneMappingExposure = 3.0;
	renderer.toneMappingWhitePoint = 5.0
*/
	container.appendChild(renderer.domElement);
	return renderer;
}


function setupLights(THREE, scene) {
    const HerLight = new THREE.HemisphereLight( 0xfceafc, 0x000000, .8 );
	const dirLight1 = new THREE.DirectionalLight( 0xffffff, .5 );
	const dirLight2 = new THREE.DirectionalLight( 0xffffff, .2 );
	const dirLight3 = new THREE.DirectionalLight( 0xffffff, .1 );
	dirLight1.position.set( 150, -150, 75 );
	dirLight2.position.set( - 150, - 150, 75 );
	dirLight3.position.set( 0, 0, 125 );
	scene.add( HerLight );
	scene.add( dirLight1 );
	scene.add( dirLight2 );
	scene.add( dirLight3 );
}

export default function Three(THREE, container, options) {
	const clock = new THREE.Clock();
    const scene = new THREE.Scene();
	const camera = setupCamera(THREE, container);
	const renderer = setupRenderer(THREE, container, options);

    setupLights(THREE, scene);

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
	    camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

	var update = (delta, time) => {};

	let time = 0;

	const frame = () => {
        const delta = clock.getDelta();
		time += delta;
		update(delta, time);
		renderer.render(scene, camera);
        requestAnimationFrame(frame);
    };

    frame();



    return {
		scene,
		camera,
		renderer,
		update: fn => update = fn
	}

    return {
		scene,
		camera,
		renderer
	}
}
