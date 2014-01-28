Map = function(camera) {
    THREE.Scene.call( this );

    this.camera = camera;
    this.streets = {};

    this.addStreet = function(name, geoJSON) {
        var lines = streetLines(name, geoJSON);
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            this.add(line);
        }
        this.streets[name] = lines;
    };

    this.setColorForStreet = function(name, color) {
        var objs = this.streets[name];
        if (!objs) return;

        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];

            obj.material.color = color;
        }
    };

    this.zoomTo = function(name, completed) {
        var lines = this.streets[name];
        var firstLine = lines[0];
        var vertice = firstLine.geometry.vertices[0];
        console.log(vertice);

        var from = {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
        };

        var to = {
            x: vertice.x,
            y: vertice.y,
            z: 0.01
        }

        var tween = new TWEEN.Tween(from).to(to, 2000);

        console.log("zoomTo("+name+")");

        console.log(from);
        console.log(to);

        var position = this.camera.position;

        tween.onUpdate(function() {
            position.x = this.x;
            position.y = this.y;
            position.y = this.z;
        });

        tween.onComplete(function() {
            console.log("completed");

            if (completed) {
                completed();
            }
        });

        tween.start();
    }
};

Map.prototype = Object.create(THREE.Scene.prototype);


