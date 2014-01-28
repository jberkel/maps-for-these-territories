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
