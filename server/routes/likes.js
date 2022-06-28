const express = require('express');
const router = express.Router();
const LikesController = require('../controller/LikesController');

router.put('/', LikesController.handleLikes)

module.exports = router;