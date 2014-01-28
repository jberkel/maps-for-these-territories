Map = function() {
    THREE.Scene.call( this );
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
};

Map.prototype = Object.create(THREE.Scene.prototype);


