var https = require('https'); // Secure HTTPS Requests
var http = require('http');   // Standard HTTP Requests
var login = require("./login.json");  // Secure Login Details

module.exports = {

getServerIP: function (serveripcallback)
{
    var getIPOptions =
    {
      host : 'api.hitbox.tv', // here only the domain name
      path : '/chat/servers.json', // the rest of the url with parameters if needed
    };

    var getServerIP = https.request(getIPOptions, function(res)
    {

      res.on('data', function(d)
      {
        var data = JSON.parse(d); // Parse JSON response
        serverIP = data[0].server_ip;
        console.log('Server IP: ' + serverIP);  // Output Server IP
        return serveripcallback();
      });
    });
    getServerIP.end();
    getServerIP.on('error', function(e)
    {
      console.error(e);
    });

}, // End getServerIP Function

getSocketID: function (socketcallback)
{
    var getIDOptions =
    {
      host : serverIP, // here only the domain name
      path : '/socket.io/1/', // the rest of the url with parameters if needed
    };

    var getSocketID = http.request(getIDOptions, function(res)
    {
      res.on('data', function(d)
      {
        var socketID = d.toString().substr(0, 20);
        console.log('Socket ID: ' + socketID);  // Output Socket ID
        socketString = ('ws://' + serverIP + '/socket.io/1/websocket/' + socketID)
        console.log('Socket String: ' + socketString);  // Output Socket String
        return socketcallback();
      });
    });
    getSocketID.end();
    getSocketID.on('error', function(e)
    {
      console.error(e);
    });
},   // getSocketID Function End

getAuthToken: function (callback)
{
    // Login Details from login.json
    loginDetails = JSON.stringify(login);
    botLogin = login.login;
    botPassword = login.pass;
    botChannel = login.channel;

    // prepare the header
    var postheaders =
    {
      'Content-Type' : 'application/json',
      'Content-Length' : Buffer.byteLength(loginDetails, 'utf8')
    };

    // the post options
    var optionspost =
    {
      host : 'api.hitbox.tv',
      port : 443,
      path : '/auth/login',
      method : 'POST',
      headers : postheaders
    };

    var getAuthToken = https.request(optionspost, function(res)
    {
        res.on('data', function(d)
        {
            var authTokenJSON = JSON.parse(d);
            authToken = authTokenJSON.data.authToken;
            console.log('AuthToken: ' + authToken);
            return callback();
        });
    });

    // write the json data
    getAuthToken.write(loginDetails);
    getAuthToken.end();
    getAuthToken.on('error', function(e)
    {
      console.error(e);
    });
} // getAuthToken Function End

}; // Module Exports End
