var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./controllers'));

app.listen(port, function() {
  console.log('Listening on port ' + port)
})

var connection = require('./connection.js'); // Include Connection Functions
var chatbot = require('./chatbot.js'); // Include Chatbot Functions


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
