verifyWebGL();

var scene,
camera, 
renderer,
element,
container,
effect,
controls,
clock,
spaceship,
numBullets
;

var bullets = [];
var cameraDirection = new THREE.Vector3();


init();

function ThreeD(){
	this.obj;
}

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 700);
	camera.position.set(0, 0, 0);
    scene.add(camera);
    renderer = new THREE.WebGLRenderer({antialias: true});
    element = renderer.domElement;
	container = document.getElementById('webglviewer');
	container.appendChild(element);
	effect = new THREE.StereoEffect(renderer);
	
	controls = new THREE.OrbitControls(camera, element);
	controls.target.set(
	  camera.position.x + 0.15,
	  camera.position.y,
	  camera.position.z
	);
	controls.disablePan = true;
	controls.disableZoom = true;
	
	function setOrientationControls(e) {
	  if (!e.alpha) {
		return;
	  }
	  controls = new THREE.DeviceOrientationControls(camera, true);
	  controls.connect();
	  controls.update();
	  element.addEventListener('click', fullscreen, false);
	  window.removeEventListener('deviceorientation', setOrientationControls, true);
	}
	
	window.addEventListener('deviceorientation', setOrientationControls, true);
	
	var ambient = new THREE.AmbientLight( 0x101030 );
	scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0, 0, 1 );
	scene.add( directionalLight );
	
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};
	
	var imgLoader = new THREE.ImageLoader(manager);
	var objLoader = new THREE.OBJLoader(manager);				
	
	spaceship = new BadGuySpaceShip(500, -100, 0, manager, imgLoader, objLoader);
			
	clock = new THREE.Clock();
    animate();
}

function animate() {
	
	if(spaceship.spaceship.obj){
		 // create once and reuse it!
		camera.getWorldDirection(cameraDirection);
		
		camera.position.add(cameraDirection.multiplyScalar(-.1));
		
		spaceship.spaceship.obj.rotation.x += 0.005;					
		spaceship.spaceship.obj.position.x -= 2;					
		// Reset the scene
		if(spaceship.spaceship.obj.position.x <= -500){						
			spaceship.spaceship.obj.position.x = 500;
		}		
		
		// 1 in 5 chance of bad guy firing
		if(Math.floor(Math.random() * 5) + 1 == 1){
			//if(bullets.length == 0){
				var bullet = spaceship.fireGun();
				bullets.push(bullet);
			//}
			
		}
		
		processWeapons();
	}
	
	var elapsedSeconds = clock.getElapsedTime()
	requestAnimationFrame(animate);
	update(clock.getDelta());
	render(clock.getDelta());
}
 
function processWeapons(){		
	processBullets();
}	 

function processBullets(){
	// Remove the old bullets, and continue processing the array
	numBullets = bullets.length;
	for(var i = numBullets-1; i >= 0; i--){  
	   // if(bullets[i].bullet.position.x > 5000){              
	   // 	bullets.splice(i,1);
	    //} else{
	    	bullets[i].moveBullet();
	    //}
	}
}

function resize() {
	var width = container.offsetWidth;
	var height = container.offsetHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
	effect.setSize(width, height);
}
function update(dt) {				
	resize();
	camera.updateProjectionMatrix();
	controls.update(dt);
}
function render(dt) {				
	effect.render(scene, camera);
}
	
function fullscreen() {
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    }
}

function verifyWebGL(){
	if (!Detector.webgl) {
		Detector.addGetWebGLMessage();	
	}
}