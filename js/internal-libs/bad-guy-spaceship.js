function BadGuySpaceShip(x, y, z, manager, imgLoader, objLoader){
	this.obj;
	this.spaceship = new ThreeD();
	this.gunOffset = [0,0,0];
	var textureFile = '3d-models/model1.png';
	var objFile = '3d-models/model1.obj';
	
	
	this.fireGun = function(){
		var laserBullet;
		var originZ;
		
		// Bullets can come from left or right wing.
		var useLeftWing = Math.floor(Math.random() * 2) + 1 == 1 ? true : false;
		if(useLeftWing){
			originZ = this.spaceship.obj.position.z + 10;
		}else{
			originZ = this.spaceship.obj.position.z - 10;
		}
		
		var originVector = new THREE.Vector3(		
				this.spaceship.obj.position.x, 
				this.spaceship.obj.position.y,
				originZ
				);
		
		
		var destinationVector = camera.position.clone();
		decreaseAccuracy(destinationVector);
		
		laserBullet = new LaserBullet(originVector, destinationVector, '#ff0000');
		new Audio("bleep.mp3").play();
		
		return laserBullet;
	}
	
	load3DModel(manager, imgLoader, objLoader, textureFile, objFile, this.spaceship, x, y, z);
}

// Because we don't want the bad guy to be a perfect shot
function decreaseAccuracy(vector){
	vector.x += Math.floor(Math.random() * 10) - 5;
	vector.y += Math.floor(Math.random() * 10) - 5;
	vector.z += Math.floor(Math.random() * 10) - 5;
}



