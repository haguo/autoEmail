var xlsx = require('node-xlsx');
var fs=require('fs');
var data = [['姓名','电话','备注',4],[true, false, null, 'sheetjs'],['foo','bar',new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
var buffer = xlsx.build([{name: "mySheetName", data: data}]); // returns a buffer

fs.writeFileSync('b.xlsx', buffer, 'binary');

