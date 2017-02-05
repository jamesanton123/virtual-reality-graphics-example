function load3DModel(manager, imgLoader, objLoader, imageFileName, objFileName, objectToCreate, x, y, z){
	var texture = new THREE.Texture();
	
	imgLoader.load(imageFileName, function (image) {
		texture.image = image;
		texture.needsUpdate = true;
	});
	
	objLoader.load(objFileName, function (object) {
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = texture;
			}
		});
		scene.add(object);
		objectToCreate.obj = object;
		objectToCreate.obj.position.x = x;
		objectToCreate.obj.position.y = y;
		objectToCreate.obj.position.z = z;
	}, 
	onProgress, 
	onError);
				
};

var onProgress = function ( xhr ) {
	
};
var onError = function ( xhr ) {
	
};	