var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport("SMTP", {
host: "outlook.com",
secureConnection: true, // use SSL
port: 25, // port for secure SMTP    
auth: {        
    user: "guohaiyuan@outlook.com",     
    pass: "53641258ghy"    }
   });
   
   
   transport.sendMail({
from : "guohaiyuan@outlook.com",
to : "guohaiyuan001@126.com",
subject: "JustForTes主题",
generateTextFromHTML : true,
html : "啊哈哈哈"
}, function(error, response){
if(error){
console.log(error);
}else{
console.log("Message sent: " + response.message);
}
transport.close();
});

/*exports.transport = transport;*/


