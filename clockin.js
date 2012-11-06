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
                    data.checkedin = true;
                    data.cumultime = 0;
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
    if (log.checkedin) {
        log.cumultime += new Date().getTime() - log.log.pop()  
        console.log(Math.round(log.cumultime/1000/60) + " minutes");
    }
    log.log.push(new Date().getTime());
    console.log("updated log...");
    fs.writeFile(TIMELOG, JSON.stringify(log));
}
