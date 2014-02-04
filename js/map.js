Map = function(camera, controls, soundModule) {
    THREE.Scene.call( this );

    this.camera = camera;
    this.controls = controls;
    this.soundModule = soundModule;

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
        if (lines && lines[0]) {
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

    this.setHeading = function(title) {
        var current = document.getElementById("current");
        if (current) {
            current.innerText = title;
        }
    };

    this.getProperties = function(name) {
        var lines = this.streets[name];
        if (lines) {
            var properties = {};
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                add(properties, line.userData);
            }
            return properties;
        } else {
            return {};
        }
    }

    this.showProperty = function(key, value) {
        var span = document.createElement("div");
        span.innerText = key + ": " + value;
        span.className = "property";
        var right = Math.round(Math.random() * (window.innerWidth / 2));
        var top   = Math.round(Math.random() * (window.innerHeight / 2));

        span.style.right = right+'px';
        span.style.top   = top+'px';

        document.body.appendChild(span);
    };

    this.showProperties = function(properties) {
        //        var keys = Object.keys(properties);
        //        var index = Math.round(Math.random() * keys.length);
        //        var key = keys[index]
        //        var property = properties[key];

        var list = document.getElementsByClassName("propertyList");

        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            document.body.removeChild(obj);
        }


        var ul = document.createElement("ul");
        ul.className = 'propertyList';
        var string = '';
        for (var key in properties) {
            var li = document.createElement("li");
            li.innerText = key + ": " + properties[key].join(', ');
            ul.appendChild(li);

        //    string += li.innerText;
        }


        var name = properties['name'];

        for (var x=0; x < 5; x++) {
          string += name;
        }



        soundModule.oscillator.updateBuffer(string);


        document.body.appendChild(ul);
    }

    this.zoomTo = function(name, completed) {


        var vertice = this.getCoordinatesForStreet(name);

        if (vertice.x == 0 && vertice.y == 0) {
            completed();
            return;
        }

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
        var properties = this.getProperties(name);



        this.showProperties(properties);

        console.log(properties);

        var scope = this;
        tween.onUpdate(function() {
            scope.setHeading(name);

            scope.setColorForStreet(name, new THREE.Color(0xff00f0));

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


