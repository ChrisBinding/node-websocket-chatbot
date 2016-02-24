var express = require('express');
var router = express.Router();

var login = require('../core/login.json') // Import login from JSON
var fs = require("fs"); // File System Access

// INITAL LOAD OF SETTINGS PAGE
router.get('/', function (req, res) {
  res.render('settings', {
                        // EJS VARIABLES TO PASS TO COMMANDS PAGE
                        title: 'Bot Settings',
                        infoMsg: 'Edit Below',
                        login: login.login,
                        password: login.pass,
                        channel: login.channel
});
});

// RELOAD OF COMMANDS PAGE AFTER CHANGES SAVED
router.post('/', function(req, res) {
  console.log('BOT SETTINGS UPDATED');
  // SAVING CHANGES MADE ON PAGE TO JSON FILE
  login.login = req.body.login;
  login.pass = req.body.pass;
  login.channel = req.body.channel;
  fs.writeFileSync("./core/chatCommands.json", JSON.stringify(chatCommands));

  res.render('settings', {
                        // EJS VARIABLES TO PASS TO COMMANDS PAGE
                        title: 'Bot Settings',
                        infoMsg: 'Changes Saved',
                        login: login.login,
                        password: login.pass,
                        channel: login.channel
});
});

module.exports = router;
