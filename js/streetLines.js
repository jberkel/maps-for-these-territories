function streetGeometries(geoJson, filter) {
    var geometries = [];
    for (var i=0; i<geoJson.features.length; i++) {
        var feature = geoJson.features[i];

        if (feature.geometry.type == 'LineString') {
            var lineGeometry = new THREE.Geometry();


            lineGeometry.name = feature.properties.highway;

            var coordinates = feature.geometry.coordinates;
            for (var j = 0; j < coordinates.length; j++) {
                var coord = coordinates[j];
                var longitude = coord[0];
                var latitude  = coord[1];

                if (filter && !filter(new THREE.Vector2(latitude, longitude))) {
                    continue;
                }

                var screenCoord = screenCoordinates(latitude, longitude, boundingBox());
                lineGeometry.vertices.push(screenCoord);
            }
            geometries.push({ geometry: lineGeometry, userData: feature.properties});
        }
    }
    return geometries;
}

function materialForGeometry(geometry) {
    return new THREE.LineBasicMaterial({
        color: 0xffffff
    });
}

var alexanderPlatz = new THREE.Vector2(52.523319, 13.411802);

function streetLines(name, geoJSON) {
    var lines = [];
    var geometries = streetGeometries(geoJSON, function(vector) {
        return distanceVector(vector, alexanderPlatz) < 7;
    });

    for (var i = 0; i < geometries.length; i++) {
        var geometry = geometries[i];
        var line = new THREE.Line(
            geometry.geometry,
            materialForGeometry(geometry),
            THREE.LineStrip
        )
        line.userData = geometry.userData;

        line.name = name;
        lines.push(line);
    }
    return lines;
}
