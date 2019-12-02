"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var readline = require("readline");
var rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "./input.txt"))
});
var ops = [];
rl.on('line', function (line) { return ops = line.split(',').map(function (num) { return parseInt(num); }); });
rl.on('close', function () {
    ops[1] = 12;
    ops[2] = 2;
    var step = 0;
    while (ops[step] !== 99 && ops.length > step) {
        switch (ops[step]) {
            case 1:
                ops[ops[step + 3]] = ops[ops[step + 1]] + ops[ops[step + 2]];
                break;
            case 2:
                ops[ops[step + 3]] = ops[ops[step + 1]] * ops[ops[step + 2]];
                break;
        }
        step += 4;
    }
    console.log(ops[0]);
});
