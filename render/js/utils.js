function merge(first, second) {
    var merged = {};
    for (var key in first) {
        merged[key] = first[key];
    }
    for (var key in second) {
        merged[key] = second[key];
    }
    return merged;
}

function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}

function add(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            var sourceValue = source[prop];

            if (target[prop] && target[prop].indexOf(sourceValue) == -1) {
                target[prop].push(sourceValue);
            } else {
                target[prop] = [ sourceValue ];
            }
        }
    });
    return target;
}

