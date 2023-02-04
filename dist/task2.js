"use strict";

var fs = require('fs');
var csv = require('csvtojson');
var logger = fs.createWriteStream('./csv/csvToJson.txt', {
  flags: 'a'
});
csv().fromFile('./csv/nodejs-hw1-ex1.csv').subscribe(function (json, lineNumber) {
  logger.write("".concat(JSON.stringify(json), " \n"));
  console.log(JSON.stringify(json) + " lineNumber : " + lineNumber);
}, function (err) {
  logger.end();
  console.log(err);
}, function () {
  logger.end();
  console.log('Read CSV complete');
});