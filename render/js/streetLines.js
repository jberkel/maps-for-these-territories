var alexanderPlatz = new THREE.Vector2(52.523319, 13.411802);

function streetMerged(geometries) {
    var mergedGeometry = new THREE.Geometry();
    for (var i = 0; i < geometries.length; i++) {
        var geo = geometries[i];
        THREE.GeometryUtils.merge(mergedGeometry, geo);
    }
    return mergedGeometry;
}

function streetGeometries(geoJson) {
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


                if (distanceVector(new THREE.Vector2(latitude, longitude), alexanderPlatz) > 7) {
                    continue;
                }

                var screenCoord = screenCoordinates(latitude, longitude, boundingBox());

                lineGeometry.vertices.push(screenCoord);
            }
            geometries.push(lineGeometry);
        }
    }
    return geometries;
}

function materialForGeometry(geometry) {
    return new THREE.LineBasicMaterial({
        color: 0xffffff
    });
}

function streetLines(geoJSON) {
    var lines = [];
    var geometries = streetGeometries(geoJSON);

    for (var i = 0; i < geometries.length; i++) {
        var geometry = geometries[i];
        lines.push(new THREE.Line(
            geometry,
            materialForGeometry(geometry),
            THREE.LineStrip
        ));
    }
    return lines;
}
