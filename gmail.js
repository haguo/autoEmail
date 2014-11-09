var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
  user: 'mygmailname@gmail.com',
  password: 'mygmailpassword',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});