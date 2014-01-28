SoundModule = function(){

	var cameraPosition = new THREE.Vector3(0, 0, 0);
	var oscillator = new Oscillator();
	var timestamps=[];
	var coords =[];

	for (var name in streets) {
    	var garbage = streets[name];
    	//console.log(name);
       	for (var i=0; i<garbage.features.length; i++){
			var feature = garbage.features[i];
			if (feature.properties.name == "Friedrichstraße"){
				timestamps.push(feature.properties.timestamp);
				coords.push(feature.geometry.coordinates);
			}
		}
	}

	var oscillator = new Oscillator(timestamps, coords);
	console.log(timestamps);


	this.updateSpat = function(point3){
		cameraPosX = point3[0];
		cameraPosY = point3[1];
		cameraPosZ = point3[3];
	}

	this.play = function(){
		oscillator.start();
	}

	this.stop = function(){
		oscillator.stop();
	}
}
