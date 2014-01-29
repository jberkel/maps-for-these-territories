
Oscillator = function(timestamps, coordinates) {

	var flic = true;
	var currentCamPos = new THREE.Vector3();
	var distance = 0;
	var charUnit=[];
	var synthBuffer;
	var synthBuffer2;
	var combi;
	updateBuffer("[i%charUnitzoery!ç'tyrè'fhjofhdiohzoefhveoprhgzoiebvoùH%Odbdhgigfbnvxkvnfvpofhjrpùhcùaodhiofgth-1]");


	function updateBuffer(string){

		flic = !flic;
		var stringSeq = string;
		var len    = 44100;
		var buffer = new Float32Array(len);

		for (var i=0; i<stringSeq.length; i++){
			charUnit.push(stringSeq[i].charCodeAt(0));
		}
		var seqLength = charUnit.length-1;
		for (var i = 0; i < buffer.length; i++) {
			buffer[i] = Math.sin(charUnit[i%charUnit.length-1]/150);
		}
		toSynth1(buffer);	
	}

	function toSynth1(buffer){

		buffer = { buffer:buffer, samplerate:20 };

		var synthBuffer = T("buffer", {buffer:buffer, pitch:50, loop:true});
		var synthBuffer2 = T("buffer", {buffer:buffer, pitch:102, loop:true});

		var sin = T("osc", {wave:"sin", freq:40}).set({mul:0.5});
		var add = T("*", synthBuffer, synthBuffer2, sin).set({mul:1});
		lpf = T("lowpass", {cutoff:120, res:5}, add).set({mul:0.7});

		//var rev = T("reverb", {room:0.3, damp:0.2, mix:0.9}, add).set({mul:0.6});
		//var lpf = T("lowpass", {cutoff:70, res:5}, rev).set({mul:0.6});
		//var fond = T("osc", {wave:"saw", freq:6000}).set({mul:0.001});
		//combi = T("+", sin, add).set({mul:1.2});

	}
	this.updateSpat = function(vector3){
		distance = coordinates.distanceTo(vector3);
		currentCamPos = vector3;
	}

	this.start = function(){
		lpf.play();
	}

	this.stop = function(){
		lpf.pause();
	}

}
