Map = function(camera, controls) {
    THREE.Scene.call( this );

    this.camera = camera;
    this.controls = controls;

    this.streets = {};

    this.addStreet = function(name, geoJSON) {
        var lines = streetLines(name, geoJSON);
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            this.add(line);
        }
        this.streets[name] = lines;
    };


    this.getColorFromStreet = function(name) {
        var lines = this.streets[name];
        if (lines) {
            return lines[0].material.color;
        }
        return undefined;
    };

    this.setColorForStreet = function(name, color) {
        var objs = this.streets[name];
        if (!objs) return;

        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];

            obj.material.color = color;
        }
    };

    this.getCoordinatesForStreet = function(name) {
        var lines = this.streets[name];
        if (lines) {
            var firstLine = lines[0];
            var vertice   = firstLine.geometry.vertices[0];
            if (vertice) {
                console.log(vertice);
                return vertice;
            }
        }
        console.log("Don't now street "+name);
        return new THREE.Vector3();
    };

    this.zoomTo = function(name, completed) {
        var vertice = this.getCoordinatesForStreet(name);

        var from = {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
        };

        var to = {
            x: vertice.x,
            y: vertice.y,
            z: (Math.random() * 0.3) + 0.1
        }

        var tween = new TWEEN.Tween(from)
            .to(to, 3000)
            .easing(TWEEN.Easing.Cubic.InOut);

        console.log("zoomTo("+name+")");

        console.log(from);
        console.log(to);

        var position = this.camera.position;

        var oldColor = this.getColorFromStreet(name);

        var scope = this;
        tween.onUpdate(function() {
            scope.setColorForStreet(name, new THREE.Color(0x00ff00));

            position.x = from.x;
            position.y = from.y;
            position.z = from.z;
        });

        tween.onComplete(function() {
            scope.setColorForStreet(name, oldColor);
            
            console.log("completed");

            if (completed) {
                completed();
            }
        });
        tween.start();
    }
};

Map.prototype = Object.create(THREE.Scene.prototype);


