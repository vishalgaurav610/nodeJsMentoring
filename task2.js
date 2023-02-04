const fs = require('fs')
const csv=require('csvtojson');

var logger = fs.createWriteStream('./csv/csvToJson.txt', {
  flags: 'a'
})
csv()
    .fromFile('./csv/nodejs-hw1-ex1.csv')
    .subscribe((json,lineNumber)=>{
        logger.write(`${JSON.stringify(json)} \n`)
        console.log(JSON.stringify(json) + " lineNumber : " + lineNumber)
    },(err) => {
        logger.end();
        console.log(err)
    }, () => {
        logger.end();
        console.log('Read CSV complete');
    })