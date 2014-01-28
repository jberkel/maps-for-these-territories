#!/usr/bin/env node

fs = require('fs');





function readFiles(path, jsonHandler) {
    var files = fs.readdirSync(path)

    for (var i = 0; i < files.length; i++) {
        var obj = files[i];

        var file = fs.readFileSync(path+"/"+obj);
        var json = JSON.parse(file);

        jsonHandler(obj, json);
    }
}

function isValidGeometry(geometry) {
    return geometry.type == 'LineString' ||
           geometry.type == 'Polygon';
}

function extractName(geoJson) {
    var names = {};

    for (var i = 0; i < geoJson.features.length; i++) {
        var feature = geoJson.features[i];
        if (feature.properties && isValidGeometry(feature.geometry)) {
            var name = feature.properties.name;
            names[name] = name;
        }
    }
    var uniqueNames = Object.keys(names)
    if (uniqueNames.length > 1) {
        console.log("ambigous name "+uniqueNames);
    } else {
        return uniqueNames[0];
    }
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


function mergeFiles(path) {
    var geoJsonKeyedByStreetname = {};
    readFiles(path, function(filename, json) {
        var name = extractName(json);
        if (name != undefined) {
            geoJsonKeyedByStreetname[name] = json;
        } else {
            console.log("no content in "+filename);
        }
    });
    return geoJsonKeyedByStreetname;
}

if (process.argv.length < 3) {
    console.log("merge_geo directory [directories...]");
    process.exit(1);
} else {
    var directories = process.argv.slice(2, process.argv.length);
    var merged = {};
    directories.forEach(function(directory) {
        extend(merged, mergeFiles(directory));

    });
    var serializedJson = JSON.stringify(merged, null, 4)
    fs.writeFile("merged_geo.json", serializedJson, function(err) {
        if (err) {
            console.log("error writing file: "+err);
        }
    });
}


