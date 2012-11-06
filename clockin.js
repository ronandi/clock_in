#! /usr/bin/env node

var fs = require('fs');
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var TIMELOG = "timelog.txt";

fs.exists(TIMELOG, function(exists) {
    if (!exists) {
        rl.question("timelog not found. create new (y/n)?\n", function(answer) {
            if (answer == 'y') {
                console.log("timelog created. time logged");
            } 
            process.exit(0);
        });
    }
});

