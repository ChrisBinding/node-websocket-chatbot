var connection = require('./connection.js'); // Include Connection Functions
var chatbot = require('./chatbot.js'); // Include Connection Functions
//var nomo = require('node-monkey').start();  //Web Console Output

connection.getAuthToken(getServerIP); // Get Auth Token - callback getServerIP

  function getServerIP (ip)
  {
    connection.getServerIP(getSocketString);  // Get Server IP - callback getSocketString
  }

  function getSocketString (socket)
  {
    connection.getSocketID(initiateChatBot);  // Get Socket URL - callback initiateChatBot
  }

  function initiateChatBot (websocket)
  {
    console.log("");  // Console Line Space
    chatbot.initiateChatBot();    // Start the websocket chat bot
  }
