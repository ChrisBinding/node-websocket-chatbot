var connection = require('./connection.js'); // Include Connection Functions
var chatbot = require('./chatbot.js'); // Include Chatbot Functions
var chatCommands = require('./chatCommands.json') // Import chat commands from JSON
var login = require("./login.json");  // Secure Login Details
var fs = require("fs"); // File System Access
var bodyParser = require('body-parser');

var express = require('express');
var path = require('path');

var app = express();
var http = require('http')
var server = http.createServer(app).listen(3000)
var io = require('socket.io').listen(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/public', express.static(__dirname + 'public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.render('index', { title: 'DrongoBOT Test UI',
                        infoMsg: 'Bot Controls',
                        embededChatID: login.channel
});
});

// INITAL LOAD OF COMMANDS PAGE
app.get('/commands', function (req, res) {
  res.render('commands', {
                        // EJS VARIABLES TO PASS TO COMMANDS PAGE
                        title: 'Chat Commands',
                        infoMsg: 'Edit Below',
                        command1: chatCommands.chatCommand1,
                        command1Output: chatCommands.chatCommandOutput1,
                        command2: chatCommands.chatCommand2,
                        command2Output: chatCommands.chatCommandOutput2,
                        command3: chatCommands.chatCommand3,
                        command3Output: chatCommands.chatCommandOutput3,
                        command4: chatCommands.chatCommand4,
                        command4Output: chatCommands.chatCommandOutput4,
                        command5: chatCommands.chatCommand5,
                        command5Output: chatCommands.chatCommandOutput5
});
});

// RELOAD OF COMMANDS PAGE AFTER CHANGES SAVED
app.post('/commands', function(req, res) {
  console.log('CHAT COMMANDS UPDATED');
  // SAVING CHANGES MADE ON PAGE TO JSON FILE
  chatCommands.chatCommand1 = req.body.command1;
  chatCommands.chatCommandOutput1 = req.body.command1Output;
  chatCommands.chatCommand2 = req.body.command2;
  chatCommands.chatCommandOutput2 = req.body.command2Output;
  chatCommands.chatCommand3 = req.body.command3;
  chatCommands.chatCommandOutput3 = req.body.command3Output;
  chatCommands.chatCommand4 = req.body.command4;
  chatCommands.chatCommandOutput4 = req.body.command4Output;
  chatCommands.chatCommand5 = req.body.command5;
  chatCommands.chatCommandOutput5 = req.body.command5Output;
  fs.writeFileSync("./chatCommands.json", JSON.stringify(chatCommands));

  res.render('commands', {
                        // EJS VARIABLES TO PASS TO COMMANDS PAGE
                        title: 'Chat Commands',
                        infoMsg: 'Changes Saved',
                        command1: chatCommands.chatCommand1,
                        command1Output: chatCommands.chatCommandOutput1,
                        command2: chatCommands.chatCommand2,
                        command2Output: chatCommands.chatCommandOutput2,
                        command3: chatCommands.chatCommand3,
                        command3Output: chatCommands.chatCommandOutput3,
                        command4: chatCommands.chatCommand4,
                        command4Output: chatCommands.chatCommandOutput4,
                        command5: chatCommands.chatCommand5,
                        command5Output: chatCommands.chatCommandOutput5
});
});

// // WebSocket Button Message
// io.on('connection',function(socket){
//     console.log("A user is connected");
//
//     socket.on('message', function (message) {
//         console.log('A client is speaking to me! They’re saying: ' + message);
//         chatbot.sendMessage(test);
//       });
// });

  function start ()
  {
    connection.getAuthToken(function (getServerIP){
      connection.getServerIP(function (getSocketID){
        connection.getSocketID(function (initiateChatBot){
              console.log("");
              chatbot.initiateChatBot("123");
        });
      });
    });
  }

  start(); // Call to first function -> Starting the
