
Oscillator = function(timestamps, coordinates) {

	console.log("creating oscillator");
	console.log(coordinates);

	/*var sin = T("osc", {wave:"tri", freq:25}).set({mul: 0.25});
	var tri = T("osc", {wave:"saw", freq:51}).set({mul: 0.01});
	var add = T("+", sin, tri).set({mul: 1});
	var osc = T("reverb", {room:0.9, damp:0.2, mix:0.45}, add);*/
	var currentCamPos = new THREE.Vector3();
	var distance = 0;
	

	this.updateSpat = function(vector3){
		distance = coordinates.distanceTo(vector3);
		console.log(distance);
	}


	/*var synth = T("SynthDef");

	synth.def = function(opts) {
		var osc1, osc2, env;
		osc1 = T("pulse", {freq:opts.freq, mul:0.25});
		osc2 = T("pulse", {freq:opts.freq * 1.6818, mul:(distance/2)});
		env  = T("linen", {a:200, s:4, r:200, lv:0.1}, osc1, osc2);
	  	return env.on("ended", opts.doneAction).bang();
	}

	var osc = T("interval", {interval:(50)}, function(count) {
  		var noteNum  = currentCamPos.x*50 + [0, 2, 4, 5, 7, 9,12][count % 8];
  		var velocity = 25 + (count % 25);
  		synth.noteOn(noteNum, velocity);
	});*/
	var sin = T("osc", {wave:"sin", freq:50}).set({mul:0.25});
	var mod = T("osc", {wave:"sin", freq:1}).set({mul:025});
	var lfo = T("*", sin, mod).set({mul:0.5});
	var rev = T("reverb", {room:0.9, damp:0.2, mix:0.9}, lfo);

	this.start = function(){
		//osc.start();
		//synth.play();
		rev.play();
	}

	this.stop = function(){
		//osc.pause();
		//synth.pause();
		rev.pause();
	}

}