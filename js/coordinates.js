/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}

function distanceVector(v1, v2) {
    return distance(v1.x, v1.y, v2.x, v2.y);
}

function distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2-lat1).toRad();
    var dLon = (lon2-lon1).toRad();
    var lat1 = lat1.toRad();
    var lat2 = lat2.toRad();

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

function boundingBox() {
    return [
        new THREE.Vector2(52.4643121, 13.27760001),
        new THREE.Vector2(52.5704809, 13.518866)
    ];
}

function latLonToScreen(lat, lng) {
    var width  = 1;
    var height = 1;

    var screenX = (lng + 180) * (width / 360);
    var screenY = (lat + 90) * (height / 180);
    return new THREE.Vector3(screenX, screenY, 0);
}

function screenCoordinates(lat, lng, boundingBox) {
    var worldScreenCoord = latLonToScreen(lat, lng);

    var westScreen = latLonToScreen(boundingBox[0].x, boundingBox[0].y);
    var eastScreen = latLonToScreen(boundingBox[1].x, boundingBox[1].y);

    var fX = 1 / (eastScreen.x - westScreen.x);
    var fY = 1 / (eastScreen.y - westScreen.y);

    var x = (worldScreenCoord.x - westScreen.x) * fX;
    var y = (worldScreenCoord.y - westScreen.y) * fY;

    return new THREE.Vector3(x, y, 0);
}


