SoundModule = function(){

	var cameraPosition = new THREE.Vector3(0, 0, 0);
	var oscillator = new Oscillator();
	var timestamps=[]
	var coords

	this.init = function(){

		for (var name in kreuzbergStreets) {
        	var garbage = kreuzbergStreets[name];
        	//console.log(name);
	       	for (var i=0; i<garbage.features.length; i++){
    			var feature = garbage.features[i];
    			if (feature.properties.name == "Friedrichstraße"){
    				timestamps.push(feature.properties.timestamp);
    				coords.push(feature.geometry.coordinates);
				}
    		}
    	}

		var oscillator = new Oscillator(timestamps, coordinates);
    	console.log(timestamps);
	}

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

Oscillator = function(){

	/*var sin = T("osc", {wave:"tri", freq:25}).set({mul: 0.25});
	var tri = T("osc", {wave:"saw", freq:51}).set({mul: 0.01});
	var add = T("+", sin, tri).set({mul: 1});
	var osc = T("reverb", {room:0.9, damp:0.2, mix:0.45}, add);*/

	var synth = T("SynthDef");

	synth.def = function(opts) {
		var osc1, osc2, env;
		osc1 = T("pulse", {freq:opts.freq, mul:0.25});
		osc2 = T("pulse", {freq:opts.freq * 1.6818, mul:0.20});
		env  = T("linen", {a:20, s:4, r:200, lv:0.1}, osc1, osc2);
	  	return env.on("ended", opts.doneAction).bang();
	}

	var osc = T("interval", {interval:400}, function(count) {
  		var noteNum  = 40 + [0, 2, 4, 5, 7, 9,12][count % 8];
  		var velocity = 25 + (count % 25);
  		synth.noteOn(noteNum, velocity);
	});

	this.start = function(){
		osc.start();
		synth.play();
	}

	this.stop = function(){
		osc.pause();
		synth.pause();
	}

}

function init(){
	soundModule = new SoundModule();
	soundModule.init();
}
