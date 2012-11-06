#! /usr/bin/env node

/*
 * clockin - A very simple app for logging how long you've been working on
 * a project
 * Author: Rohit Kumar
 * rohit.kumar@rutgers.edu
 */

var fs = require('fs');
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var TIMELOG = "timelog.txt";

fs.exists(TIMELOG, function(exists) {
    //if file does not exist. ask whether we should make one
    if (!exists) {
        rl.question("timelog not found. create new (y/n)?\n", function(answer) {
            if (answer == "y") {
                //create the file
                fs.open(TIMELOG, 'w+', function(err, fd) {
                    if (err)
                        throw err;
                    var data = {};
                    data.log = [];
                    data.checkedin = false;
                    fs.close(fd);
                    console.log("created timelog.txt");
                    updateLog(data);
                });
            }
            rl.close();
        });
    } else {
        fs.readFile(TIMELOG, function(err, data) {
            if (err) throw err;
            var log = JSON.parse(data);
            updateLog(log);
        });
        rl.close();
    }
});

function updateLog(log) {
    log.checkedin = !log.checkedin
    log.log.push(new Date());
    console.log("updated log...");
    fs.writeFile(TIMELOG, JSON.stringify(log));
}
