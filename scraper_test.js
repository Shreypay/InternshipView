var fs = require('fs');
var csv = require('fast-csv');
var ws = fs.createWriteStream('my.csv')

csv.
    write([

      ['Hello World']
     ],{headers:true})
     .pipe(ws);

