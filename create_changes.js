#!/usr/bin/env node

fs  = require('fs');
csv = require('fast-csv');



var changes = {};


function addName(current, old, from, to) {
    if (!old) return;

    var changeList = changes[current];
    if (!changeList) {
        changeList = [];
        changes[current] = changeList;
    }
    changeList.push({from: parseInt(from), to: parseInt(to), oldName: old});
}


csv("mitte_changes.csv")
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
            addName(name, oldName, from, to);
        }

    })
    .on("end", function () {
        var serializedJson = JSON.stringify(changes, null, 4);
        fs.writeFile("changes.json", serializedJson, function(err) {
            if (err) {
                console.log("error writing file: "+err);
            }
        });
        console.log(changes);
    })
    .parse();
