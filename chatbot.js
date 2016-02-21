var WebSocket = require('ws');  // WebSocket Package
var dateFormat = require('dateformat'); // DateFormat Package
var chatCommands = require('./chatCommands.json') // Import chat commands from JSON
var fs = require("fs"); // File System Access

module.exports = {

initiateChatBot: function ()
{

  botDisable = false;

  const timeAtLaunch = Date.now();  // Constant for time at launch (For Old Message Prevention)

  var join_msg = ("5:::{\"name\":\"message\",\"args\":[{\"method\":\"joinChannel\",\"params\":{\"channel\":\"" + botChannel +"\",\"name\":\""+ botLogin +"\",\"token\":\"" + authToken + "\",\"isAdmin\":false}}]}");

  function hitbox_send_message(message)
  {
    ws.send("5:::{\"name\":\"message\",\"args\":[{\"method\":\"chatMsg\",\"params\":{\"channel\":\"" + botChannel +"\",\"name\":\""+ botLogin +"\",\"nameColor\":\"FA5858\",\"text\":\""+ message +"\"}}]}")
  }

  ws = new WebSocket(socketString);

  ws.on('open', function open()
  {
    ws.send(join_msg);
    console.log('DEBUG --> WEBSOCKET OPEN');
  });

  ws.on('message', function(data, flags)
  {
    var messageString = data;
    var messageType = messageString.toString().substr(0,4);

    if (messageType == '1::')
    {
      console.log('DEBUG --> Server Connection Confirmed');
      setTimeout(function()
      {
        hitbox_send_message("Drongo Drongo Drongo - Bot Connected");
      }, 500);
    }
    if (messageType == '2::')
    {
      ws.send('2::');
      console.log('DEBUG --> Ping Pong');
    }
    if (messageType == '5:::')
    {
      var fullMessageString = JSON.parse(messageString.toString().substr(4));
      var argsArray = JSON.parse(fullMessageString.args[0]);
      var messageMethod = argsArray.method;
      var messageText = argsArray.params.text;
      var messageUserName = argsArray.params.name;
      if (messageMethod == 'chatLog')
      {
        var messageTimestamp=argsArray.params.timestamp*1000;
        var date = new Date(messageTimestamp);
        var formattedDate = dateFormat(date, "dd/mm/yyyy HH:MM:ss");
      }
      else if (messageMethod == 'chatMsg')
      {
        var messageTimestamp=argsArray.params.time*1000;
        var date = new Date(messageTimestamp);
        var formattedDate = dateFormat(date, "dd/mm/yyyy HH:MM:ss");
      }
    }
    // Enable / Disable Bot Via Chat
    if ((messageMethod == 'chatMsg') && (messageTimestamp >= timeAtLaunch))
    {
      if (messageText == "!disablebot")
      {
        botDisable = true;
        hitbox_send_message('BOT DISABLED');
      }
      else if (messageText == "!enablebot")
      {
        botDisable = false;
        hitbox_send_message('BOT ENABLED');
      }
    }
    if ((messageMethod == 'chatMsg') && (messageTimestamp >= timeAtLaunch) && (botDisable == false))
    {
      console.log(formattedDate + " Chat  --> " + messageUserName + ": " + messageText);

      // ****************  CHAT COMMANDS  ***************************************

      if (messageText.includes("!setcommand"))
      {
        var command = messageText.substring(12,(messageText.lastIndexOf(":::")));
        var commandOutput = messageText.substring(messageText.lastIndexOf(":::")+3);
        chatCommands.chatCommand1 = command;
        chatCommands.chatCommandOutput1 = commandOutput;
        fs.writeFileSync("./chatCommands.json", JSON.stringify(chatCommands));
        hitbox_send_message("New Command '" + command + "' added with output '" + commandOutput + "'");
      }
      if (messageText == "!commands")
      {
        hitbox_send_message('Command List: !decklist | !nips | !drongo');
      }
      if (messageText == chatCommands.chatCommand1)
      {
        hitbox_send_message(chatCommands.chatCommandOutput1);
      }
      if (messageText == chatCommands.chatCommand2)
      {
        hitbox_send_message(chatCommands.chatCommandOutput2);
      }
      if (messageText == chatCommands.chatCommand3)
      {
        hitbox_send_message(chatCommands.chatCommandOutput3);
      }
      if (messageText == chatCommands.chatCommand4)
      {
        hitbox_send_message(chatCommands.chatCommandOutput4);
      }
      if (messageText == chatCommands.chatCommand5)
      {
        hitbox_send_message(chatCommands.chatCommandOutput5);
      }
    }
    if ((messageMethod == 'chatLog') && (messageTimestamp >= timeAtLaunch))
    {
      console.log(formattedDate + " Log   --> " + messageText);

      if (messageText.includes(' followed') == true)
      {
        var username = messageText.substring(messageText.lastIndexOf("<user>")+6,messageText.lastIndexOf("</user>"));
        hitbox_send_message('Thanks for the follow ' + username + '!');
      }
      if (messageText.includes(' unfollowed') == true)
      {
        var username = messageText.substring(messageText.lastIndexOf("<user>")+6,messageText.lastIndexOf("</user>"));
        hitbox_send_message(username + ' Unfollowed! FeelsBadMan.');
      }
    }

    if ((messageMethod == 'infoMsg') && (messageTimestamp >= timeAtLaunch))
    {
      var username = messageText.substring(6);
      hitbox_send_message('Thanks for subscribing ' + username + ' !')
    }
  });
}, //websocket function end

sendMessage : function(message)
{
  ws.send("5:::{\"name\":\"message\",\"args\":[{\"method\":\"chatMsg\",\"params\":{\"channel\":\"" + botChannel +"\",\"name\":\""+ botLogin +"\",\"nameColor\":\"FA5858\",\"text\":\""+ message +"\"}}]}")
}
}; //module exports end
