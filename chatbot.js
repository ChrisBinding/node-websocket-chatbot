var WebSocket = require('ws');  // WebSocket Package
var dateFormat = require('dateformat'); // DateFormat Package

module.exports = {

initiateChatBot: function ()
{
  const timeAtLaunch = Date.now();  // Constant for time at launch (For Old Message Prevention)

  var join_msg = ("5:::{\"name\":\"message\",\"args\":[{\"method\":\"joinChannel\",\"params\":{\"channel\":\"" + botChannel +"\",\"name\":\""+ botLogin +"\",\"token\":\"" + authToken + "\",\"isAdmin\":false}}]}");

  function hitbox_send_message(message)
  {
    ws.send("5:::{\"name\":\"message\",\"args\":[{\"method\":\"chatMsg\",\"params\":{\"channel\":\"" + botChannel +"\",\"name\":\""+ botLogin +"\",\"nameColor\":\"FA5858\",\"text\":\""+ message +"\"}}]}")
  }

  var ws = new WebSocket(socketString);

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


    if ((messageMethod == 'chatMsg') && (messageTimestamp >= timeAtLaunch))
    {
    console.log(formattedDate + " Chat  --> " + messageUserName + ": " + messageText);

    // Chat Commands
    if (messageText == "!commands")
    {
      hitbox_send_message('Command List: !decklist | !nips | !drongo');
    }
    if (messageText == "!drongo")
    {
      hitbox_send_message('Did someone call?');
    }
    if (messageText == "!decklist")
    {
      var deckListURL = "https://gyazo.com/17fad4f82b409074dd08c6bcb501c495";
      hitbox_send_message('Decklist --> ' + deckListURL);
    }
    if (messageText == "!nips")
    {
      var nipsURL = "https://i.gyazo.com/71cfb92a271f615b20d938cdbf5c6b40.png";
      hitbox_send_message('Oh You Want Some Nips?' + nipsURL);
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
} //websocket function end
}; //module exports end
