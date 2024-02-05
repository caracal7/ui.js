<!import * as THREE from three.module.min.js>
<!import ThreeHelper from three.helper.js>

<div id='ThreeJS'
     style{
         position: 'absolute',
         'box-sizing': 'border-box',
         width: '100%',
         height: '100%',
         overflow: 'hidden',
     }/>


<!class>

    connected() {
        this.container = this.$('#ThreeJS');
        const deps = new ThreeHelper(THREE, this.container, {
            sRGBEncoding: true,
            toneMapping: true,
        });
        this.scene = deps.scene;
        this.update = deps.update;


//-------------------------------------------------------------------
        this.update((delta, time) => {

        });
//-------------------------------------------------------------------



        const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    	let geometries = [
    		new THREE.SphereGeometry( 1, 64, 64 ),
    		new THREE.BoxGeometry( 1, 1, 1 ),
    		new THREE.ConeGeometry( 1, 1, 32 ),
    		new THREE.TetrahedronGeometry( 1 ),
    	];

    	const group = new THREE.Group();

    	for (let i = 0; i < 15; i ++) {
    		const geometry = geometries[randomInt(0, geometries.length-1)];
            const material = new THREE.MeshLambertMaterial( { color: '#'+Math.floor(Math.random()*16777215).toString(16) } );
    		const mesh = new THREE.Mesh( geometry, material );
    		const size = randomInt(2, 4);
    		mesh.scale.set( size, size, size );
    		mesh.position.set(randomInt(-20,20), -10, randomInt(-20,20));
    		mesh.rotation.set(randomInt(0,2), randomInt(0,2), randomInt(0,2));
    		group.add(mesh);
    	}

    	this.scene.add(group);
    }
