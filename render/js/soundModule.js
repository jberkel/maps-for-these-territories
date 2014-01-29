SoundModule = function() {
	var cameraPosition = new THREE.Vector2(0, 0, 0);
	var timestamps=[];
	var feature;

	this.oscillator = new Oscillator(timestamps);


	this.updateSpat = function(vector3) {
		this.oscillator.updateSpat(vector3);
	}

	this.play = function(){
        this.oscillator.start();
	}

	this.stop = function(){
        this.oscillator.stop();
	}
}
