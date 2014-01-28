describe("coordinate conversion", function() {
    var aPoint = new THREE.Vector2(52.4972443, 13.4245914);

    it("should convert lat/long to screen coordinates", function() {
        var screenCord = latLonToScreen(53, 10);

        expect(screenCord.x).toBeCloseTo(0.5277);
        expect(screenCord.y).toBeCloseTo(0.7944);
        expect(screenCord.z).toEqual(0);
    });

    it("should convert lat/long to screen coordinates, as specified by a bounding box", function() {
        var screenCoord = screenCoordinates(aPoint.x, aPoint.y, boundingBox());

        expect(screenCoord.x).toBeCloseTo(0.5002);
        expect(screenCoord.y).toBeCloseTo(0.47398);
    });
});

describe("distance calculations", function() {
    var alexanderPlatz = new THREE.Vector2(52.523319, 13.411802);
    var aPoint         = new THREE.Vector2(52.4972443, 13.4245914);

    it("should return the distance between two points", function() {
        var distance = distanceVector(alexanderPlatz, aPoint);
        expect(distance).toBeCloseTo(3.025);
    });
});
