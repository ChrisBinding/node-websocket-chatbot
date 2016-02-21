var chatCommands = require('../chatCommands.json') // Import chat commands from JSON
var fs = require("fs"); // File System Access

// Create new comment in your database and return its id
exports.get = function(commandID, callBack) {
  command = chatCommands.chatCommand[commandID].command;
  commandOutput = chatCommands.chatCommand[commandID].commandOutput;
  return callBack(command, commandOutput);
}
