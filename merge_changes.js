#!/usr/bin/env node

fs  = require('fs');
csv = require('fast-csv');


function addName(changes, current, old, from, to) {
    if (!old) return;
    var changeList = changes[current];
    if (!changeList) {
        changeList = [];
        changes[current] = changeList;
    }
    changeList.push({from: parseInt(from), to: parseInt(to), oldName: old});
}

function parseFile(name, callback) {
    var changes = {};
    csv(name)
        .on("data", function (data) {
            var currentName = data[0];
            var oldName     = data[1];
            var from        = data[3];
            var to          = data[4];

            if (!currentName.trim()) {
                currentName = oldName;
                oldName = null;
            }

            var names = currentName.split(',');
            for (var i = 0; i < names.length; i++) {
                var name = names[i].trim();
                addName(changes, name, oldName, from, to);
            }

        })
        .on("end", function () {
            callback(changes);
        })
        .parse();
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

function serialize(data) {
    var serializedJson = JSON.stringify(data, null, 4)
    fs.writeFile("merged_csv.json", serializedJson, function(err) {
        if (err) {
            console.log("error writing file: "+err);
        }
    });
}

if (process.argv.length < 3) {
    console.log("merge_changes file [file...]");
    process.exit(1);
} else {
    var directories = process.argv.slice(2, process.argv.length);

    var merged = {};
    directories.forEach(function(file, index, array) {
        parseFile(file, function(data) {
            extend(merged, data);
            if (index == array.length-1) {
                serialize(merged);
            }
        });
    });
}
