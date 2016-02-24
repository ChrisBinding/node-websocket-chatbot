var express = require('express');
var router = express.Router();

var chatCommands = require('../core/chatCommands.json') // Import chat commands from JSON
var fs = require("fs"); // File System Access


// INITAL LOAD OF COMMANDS PAGE
router.get('/', function (req, res) {
  res.render('commands', {
                        // EJS VARIABLES TO PASS TO COMMANDS PAGE
                        title: 'Chat Commands',
                        infoMsg: 'Edit Below',
                        command1: chatCommands.chatCommand[0].command,
                        command2: chatCommands.chatCommand[1].command,
                        command3: chatCommands.chatCommand[2].command,
                        command4: chatCommands.chatCommand[3].command,
                        command5: chatCommands.chatCommand[4].command,
                        command1Output: chatCommands.chatCommand[0].commandOutput,
                        command2Output: chatCommands.chatCommand[1].commandOutput,
                        command3Output: chatCommands.chatCommand[2].commandOutput,
                        command4Output: chatCommands.chatCommand[3].commandOutput,
                        command5Output: chatCommands.chatCommand[4].commandOutput
});
});

// RELOAD OF COMMANDS PAGE AFTER CHANGES SAVED
router.post('/', function(req, res) {
  console.log('CHAT COMMANDS UPDATED');
  // SAVING CHANGES MADE ON PAGE TO JSON FILE
  chatCommands.chatCommand[0].command = req.body.command1;
  chatCommands.chatCommand[1].command = req.body.command2;
  chatCommands.chatCommand[2].command = req.body.command3;
  chatCommands.chatCommand[3].command = req.body.command4;
  chatCommands.chatCommand[4].command = req.body.command5;
  chatCommands.chatCommand[0].commandOutput = req.body.command1Output;
  chatCommands.chatCommand[1].commandOutput = req.body.command2Output;
  chatCommands.chatCommand[2].commandOutput = req.body.command3Output;
  chatCommands.chatCommand[3].commandOutput = req.body.command4Output;
  chatCommands.chatCommand[4].commandOutput = req.body.command5Output;
  fs.writeFileSync("./core/chatCommands.json", JSON.stringify(chatCommands));

  res.render('commands', {
                        // EJS VARIABLES TO PASS TO COMMANDS PAGE
                        title: 'Chat Commands',
                        infoMsg: 'Changes Saved',
                        command1: chatCommands.chatCommand[0].command,
                        command2: chatCommands.chatCommand[1].command,
                        command3: chatCommands.chatCommand[2].command,
                        command4: chatCommands.chatCommand[3].command,
                        command5: chatCommands.chatCommand[4].command,
                        command1Output: chatCommands.chatCommand[0].commandOutput,
                        command2Output: chatCommands.chatCommand[1].commandOutput,
                        command3Output: chatCommands.chatCommand[2].commandOutput,
                        command4Output: chatCommands.chatCommand[3].commandOutput,
                        command5Output: chatCommands.chatCommand[4].commandOutput
});
});

module.exports = router;
