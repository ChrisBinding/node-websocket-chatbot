var connection = require('./connection.js'); // Include Connection Functions
var chatbot = require('./chatbot.js'); // Include Chatbot Functions
var chatCommands = require('./chatCommands.json') // Import chat commands from JSON

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

app.get('/', function (req, res) {
  res.render('index', { title: 'Home',
                        test: 'ThatGuyCB'
});
});

app.get('/commands', function (req, res) {
  res.render('commands', { title: 'Home',
                        test: 'ThatGuyCB',
                        command1: chatCommands.chatCommand1,
                        command1Output: chatCommands.chatCommandOutput1
});
});

app.post('/response', function(req, res) {
      console.log(req.body.command1);
});

app.post('/', function(req, res) {
  console.log("button pressed - bot enabled");
});


// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });


io.on('connection',function(socket){
    console.log("A user is connected");

    socket.on('message', function (message) {
        console.log('A client is speaking to me! They’re saying: ' + message);
      });
});

botDisable = true;

  function start ()
  {
    connection.getAuthToken(function (getServerIP){
      connection.getServerIP(function (getSocketID){
        connection.getSocketID(function (initiateChatBot){
            console.log("");
            chatbot.initiateChatBot();
        });
      });
    });
  }

  start(); // Call to first function -> Starting the
