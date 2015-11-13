window.onload = function() {
	Player.init();
}

Player = {
	init: function() {
		Player.container = document.getElementById("canvas-wrapper");

		Player.size = {}
		Player.size.width = Player.container.offsetWidth;
		Player.size.height = Player.container.offsetHeight;

		Player.scene = new THREE.Scene();

		Player.camera = new THREE.PerspectiveCamera(45.0, Player.size.width/Player.size.height, 2, 8000);
		Player.camera.position.z = 300;

		Player.scene.add(Player.camera);

		var light = new THREE.AmbientLight();
		Player.scene.add(light);

		Player.renderer = new THREE.WebGLRenderer({alpha: true});

		Player.renderer.setSize(Player.size.width, Player.size.height);
		Player.container.appendChild(Player.renderer.domElement);

		var textureLoader = new THREE.TextureLoader();
		textureLoader.load("src/pripoy.jpg", function(texture) {

   			Player.texture = texture;
   			Player.loadModel();

		});
	},

	loadModel: function() {
		var objectLoader = new THREE.OBJLoader();
  		objectLoader.load("src/pripoy.obj", function(object) {
			  object.traverse(function(child) {
			      if (child instanceof THREE.Mesh) {
			        child.material.map = Player.texture; }
			    });
  			Player.scene.add(object);
   			Player.controls = new THREE.TrackballControls(Player.camera, Player.container);
			Player.animate();
    	
  		});
	},

	animate: function() {
	   requestAnimationFrame(Player.animate);
	   Player.controls.update();
	   Player.renderer.render(Player.scene, Player.camera);
	}
}

