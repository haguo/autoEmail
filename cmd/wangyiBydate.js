//It can obtain the names and mobile phone number by date
//修改参数 日期：collectDate   邮件格式：analysisSubject函数里
//保存的数据位于本目录下,名字为"names.xlsx"
//email form:赵武_1333332_电信学院_13166502988
// now can read between datetwo and date 
//next to use github for saving
var wangyi=require('../domain/wangyiEmailapi.js');
//var collectDate=new Date(2014,07,26);//it is a good data on this day
var collectDate=new Date(2014,10,07);
var collectDateSecond=new Date(2014,8,06);
var symbol = /[,_:#; ]/;
var underscore=require('underscore');
var fs=require('fs');
var xlsx = require('node-xlsx');


 wangyi.emailListener(collectDate,collectDateSecond,function(subject,from){
    console.log('rsubjectlength is: '+subject.length) ;
	//console.log('subject:'+subject);
	analysisSubject(subject,function(res){
	  //console.log(res);   
	  var data=res;
	  var buffer = xlsx.build([{name: "mySheetName", data: data}]); 
	  fs.writeFileSync('names.xlsx', buffer, 'binary');	
	});
	
	 
 });

 
 
function analysisSubject(subject,callback){
    var name=[];	    
	var phone=[];
	var name_phone=[];
	var names=new Array();
	var i=0;
	names[i]=['姓名','电话'];
	i++;
   underscore(subject).each(function(commit){
      var infomation=commit.split(symbol);
      //if(infomation[3].length==11)// bug: res[3].length==11||res[3].length==12||res[3].length==8
      //var firsN=parseInt(infomation[3][0]);
		  //if(firsN==1)
		 //name_phone.push(infomation[0],parseInt(infomation[3]),'    ');
		 //name.push(infomation[0]);
	     //phone.push(parseInt(infomation[3]));
		 
		 if(infomation.length==4){
		 infomation[3]=parseInt(infomation[3]);
	     infomation.splice(1,2);		 
        //console.log(typeof(infomation)+'info: '+infomation);
        names[i]=infomation;
         i++;	
         }		 
    });
	//console.log(typeof(names)+'names: '+names);	
   callback(names);
   
};