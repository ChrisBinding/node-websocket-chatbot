var express = require('express');
var router = express.Router();
var chat = require('../core/login.json') // Import chatID from JSON

router.use('/commands', require('./commands'));
router.use('/settings', require('./settings'))

router.get('/', function (req, res) {
  res.render('index', { title: 'DrongoBOT Test UI',
                        infoMsg: 'Bot Controls',
                        embededChatID: chat.channel
});
});

module.exports = router;
