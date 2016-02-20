var connection = require('./connection.js'); // Include Connection Functions
var chatbot = require('./chatbot.js'); // Include Chatbot Functions
//var nomo = require('node-monkey').start();  //Web Console Output

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
