//This api function can return the subject for email sent during the setted date
//If more information is needed such as the content of the email,one can rewrite the callback function.

var Imap = require('imap');
cheerio = require('cheerio');
inspect = require('util').inspect;
var fs=require('fs');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var score = 90;
var email='haguo@ebay.com';
var PID='vpm';
// create reusable transporter object using SMTP transport
//var collectDate=new Date(2014,07,15);
var imap = new Imap({
    user: 'haguo126@126.com',
    password: 'haguohaguo',
    host: 'imap.126.com',
    port: 143,
    tls: false
});




var emailListener=function(date,datetwo,callback){
    imap.connect();
	imap.once('ready', function () {
	 openInbox(function (err, box) {
       if (err) throw err;
	    CollectClaim(date,datetwo,function(result){
		    callback(result);
		});
	   
	
	 });
	});
	imap.once('error', function (err) {
                console.log('Happen err at Four');
    });
    imap.once('end', function () {
        console.log('Connection ended point  Three');
        imap.end();
      });
	
	
  function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
   }

   var CollectClaim=function(collectDate,collectDateSecond,callback){
    imap.search([
               // ['FROM', email],
               // ['ON', collectDate]//SINCE or ON
			    ['BEFORE', collectDate],
				['SINCE', collectDateSecond]  
               // ['SUBJECT', PID]
            ], function (err, results) {
			    if (err) throw err;
			    if(results.length > 0){
				 //console.log('result: '+results);
				 var f = imap.fetch(results, {envelope:true , struct: true, 'markseen': true });   //bodies: ['TEXT'] envelope
				  var claim;
				  var subject=[];
				  var from=[];
				  f.on('message', function (msg, seqno) {
				        //console.log('msg '+JSON.stringify(msg, null, 4));
                       //console.log('Message #%d', seqno);//the seq number				  
				    msg.on('body', function (stream, info) {//body  //envelope
					      var buffer = '';
						 // console.log('get data!');
					     stream.on('data', function (chunk) {
                                buffer += chunk.toString('utf8');
                            });
					      stream.once('end', function () {
						      console.log('run at poin One');
							  //console.log('buffer: '+buffer);
							  var resultString= buffer.toString('', 0, buffer.length).replace(/3D\"/gi, "\"");
							    var $ = cheerio.load(resultString, {
                                    ignoreWhitespace: true
                                    //xmlMode:true
                                });
								
								 var txt = "";
								$('p.MsoNormal').each(function (i, elem) {
                                    txt += $(this).text();
                                 });
								 txt = txt.replace(/=A1=AF/g, "'").replace(/= /g, "").replace(/  /, " ").replace(/ ;/g, "");
								
								var head = -1;
                                var tail = txt.length;
								claim = txt.substring(head, tail);
								console.log('claim: '+claim);
								
						        //console.log('Parsed header: %s', inspect(Imap.parseHeader(buffer)));
						    });
					
					});
					
					msg.once('attributes', function(attrs) {
					     // var sub=inspect(attrs, false, 8);
					   // console.log('Attributes: '+inspect(attrs, false, 8));
						/*fs.writeFile('content.txt',inspect(attrs, false, 8), function (err) {
                             if (err) throw err;
                              console.log('It\'s saved!');
                       });*/
					   subject.push(attrs.envelope.subject);
					   from.push(attrs.envelope.from[0].mailbox+'@'+attrs.envelope.from[0].host);
					   console.log('subject: '+subject+'from: '+from);
                       
                    });
					
					
					msg.once('end', function (err) {
                            console.log('Run at point Two');
							
                            //console.log(prefix + 'Finished');
                    });
					
					
				  });
				    f.once('error', function (err) {
                    });
                    f.once('end', function () {
                        console.log('Done fetching all messages!');
						//console.log('subject: '+subject+'from: '+from);
						callback(subject,from);
						//callback(claim);
						
                    });
				
				
				}
                else{
				conso.log('No email received!');
				}				
				 
				 
			 });
	
       };
};

exports.emailListener=emailListener;
