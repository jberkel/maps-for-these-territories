
Oscillator = function(timestamps) {

	var flic = true;
	var currentCamPos = new THREE.Vector3();
	var distance = 0;

    this.lpf = null;



	this.updateBuffer = function(string){
        var charUnit=[];
        console.log("updateBuffer("+string+")");

		flic = !flic;
        var len    = 44100;
		var buffer = new Float32Array(len);

		for (var i=0; i<string.length; i++){
			charUnit.push(string[i].charCodeAt(0));
		}


		var seqLength = charUnit.length-1;
		for (var i = 0; i < buffer.length; i++) {
			buffer[i] = Math.sin(charUnit[i%seqLength] / 150);
		}

		this.toSynth1(buffer);
	}

	this.toSynth1 = function(buffer){

		buffer = { buffer:buffer, samplerate:20 };

		var synthBuffer = T("buffer", {buffer:buffer, pitch:50, loop:true});
		var synthBuffer2 = T("buffer", {buffer:buffer, pitch:102, loop:true});

		var sin = T("osc", {wave:"sin", freq:40}).set({mul:0.5});
		var add = T("*", synthBuffer, synthBuffer2, sin).set({mul:1});

        if (!this.lpf) {
            this.lpf = T("lowpass", {cutoff:1200, res:5}, add).set({mul:0.7});
            this.lpf.play();
        } else {
            this.lpf.removeAll();
            this.lpf.append(add);
        }

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
		this.lpf.play();
	}

	this.stop = function(){
        this.lpf.pause();
	}

}
