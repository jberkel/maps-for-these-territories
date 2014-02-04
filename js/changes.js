function renderChanges(map, changes) {
    var startColor = new THREE.Color(0xFAF200);
    var endColor   = new THREE.Color(0xFA0000);

    var max = findMax(changes);

    for (var name in changes) {
        var listOfChanges = changes[name];
        var numberOfChanges = listOfChanges.length;
        var factor = numberOfChanges / max;
        var color = colorGradient(startColor, endColor, factor);

        map.setColorForStreet(name, color);
    }
}

function colorGradient(colorA, colorB, val) {
    var gradientColor = new THREE.Color();

    gradientColor.r = colorA.r + val * (colorB.r - colorA.r)
    gradientColor.g = colorA.g + val * (colorB.g - colorA.g)
    gradientColor.b = colorA.b + val * (colorB.b - colorA.b)

    return gradientColor;
}

function findMax(changes) {
    var max = 0;
    for (var name in changes) {
        var length = changes[name].length;
        if (length > max) {
            max = length;
        }
    }
    return max;
}

