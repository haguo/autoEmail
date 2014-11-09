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
var collectDate=new Date(2014,07,15);
var imap = new Imap({
    user: 'simplefortest@126.com',
    password: 'fortest',
    host: 'imap.126.com',
    port: 143,
    tls: false
});




var emailListener=function(){
    imap.connect();
	imap.once('ready', function () {
	 openInbox(function (err, box) {
       if (err) throw err;
	    CollectClaim();
	   
	
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

   var CollectClaim=function(){
    imap.search([
                ['FROM', email],
                ['ON', collectDate],
                ['SUBJECT', PID]
            ], function (err, results) {
			    if (err) throw err;
			    if(results.length > 0){
				 //console.log('result: '+results);
				 var f = imap.fetch(results, { bodies: ['TEXT'], struct: true, 'markseen': true });   
				  f.on('message', function (msg, seqno) {
				    msg.on('body', function (stream, info) {
					      var buffer = '';
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
					msg.once('end', function (err) {
                            console.log('Run at point Two');
                            //console.log(prefix + 'Finished');
                    });
					
					
				  });
				  f.once('error', function (err) {
                    });
                    f.once('end', function () {
                        console.log('Done fetching all messages!');
                    });
				
				
				}
                else{
				conso.log('No email received!');
				}				
				 
				 
			 });
	
       };


};

emailListener();







