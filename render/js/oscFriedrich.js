
Oscillator = function(timestamps, coordinates){

	/*var sin = T("osc", {wave:"tri", freq:25}).set({mul: 0.25});
	var tri = T("osc", {wave:"saw", freq:51}).set({mul: 0.01});
	var add = T("+", sin, tri).set({mul: 1});
	var osc = T("reverb", {room:0.9, damp:0.2, mix:0.45}, add);*/
	var currentCamPos = new THREE.Vector2(0, 0);

	var updateSpat = function(vertor2){
		currentCamPos.x = vertor2.x;
		currentCamPos.y = vertor2.y;
	}

	var distanceToCam = function(vertor2){
		var distance = distanceVector(new THREE.Vector2(currentCamPos, vertor2));
		return distance;
	}

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