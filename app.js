var connection = require('./connection.js'); // Include Connection Functions
var chatbot = require('./chatbot.js'); // Include Chatbot Functions
//var nomo = require('node-monkey').start();  //Web Console Output

  function getAuthToken (callBack)
  {
    connection.getAuthToken(getServerIP); // Get Auth Token - callback getServerIP
  }

  function getServerIP (callBack)
  {
    connection.getServerIP(getSocketString);  // Get Server IP - callback getSocketString
  }

  function getSocketString (callBack)
  {
    connection.getSocketID(initiateChatBot);  // Get Socket URL - callback initiateChatBot
  }

  function initiateChatBot (callBack)
  {
    console.log("");  // Console Line Space
    chatbot.initiateChatBot();    // Start the websocket chat bot
  }

  getAuthToken(); // Call to first function -> Starting the program
