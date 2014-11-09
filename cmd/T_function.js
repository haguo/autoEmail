var xlsx = require('node-xlsx');
var obj = xlsx.parse('Chepai.xlsx');
var info=JSON.stringify(obj,null,4);
var fs=require('fs');

console.log(JSON.stringify(obj,null,4));


