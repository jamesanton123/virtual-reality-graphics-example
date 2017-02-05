
function LaserBullet(originVector, targetVector){
	LaserBullet(originVector, targetVector, 0x000fff);
}

// A laser bullet is a character agnostic bullet. That is 
// in the physical world, the bullet does not care who fired it.
// It should not be bound to any other object.
function LaserBullet(originVector, targetVector, color){
	var bulletMaterial = new THREE.MeshBasicMaterial({color: color});
	var bulletGeometry = new THREE.BoxGeometry(.1, .1, 10);
	var bulletSpeed = 50;
	this.bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
	this.originVector = originVector;
	this.targetVector = targetVector;
	
	var destinationVector = getVectorOnOtherSide(originVector, targetVector, 100);
	
	scene.add(this.bullet);
	
	// The initial position of the bullet is the origin
	this.bullet.position.x = this.originVector.x;
	this.bullet.position.y = this.originVector.y;
	this.bullet.position.z = this.originVector.z;
	
	this.moveBullet = function(){
		this.bullet.lookAt(destinationVector);
		this.bullet.translateX(0);
		this.bullet.translateY(0);
		this.bullet.translateZ(bulletSpeed);		
		//console.log(this.bullet.position.x + "," + this.bullet.position.y + "," + this.bullet.position.z);
	}
}

// Takes two vectors, and a distanceFromOrigin.
// A ray is created with the supplied origin vector and the supplied
// Returns the point on the ray, which is the supplied distance away from the origin, 
// in the direction of the destination 
function getVectorOnOtherSide(origin, destination, distanceFromOrigin){	
	var ray = getRay(origin, destination);
	return ray.at(distanceFromOrigin);
}

// Takes two vectors
// Calculate the direction vector based on origin and destination vectors
function getRay(origin, destination){
	var directionalVector = getDirectionalVector(origin, destination);
	return new THREE.Ray(origin, directionalVector);
}

//Takes two vectors
// Gets the directional vector
function getDirectionalVector(origin, destination){
	return new THREE.Vector3(destination.x - origin.x, destination.y - origin.y, destination.z - origin.z);

}