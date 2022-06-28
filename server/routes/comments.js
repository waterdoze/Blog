const express = require('express');
const router = express.Router();
const CommentController = require('../controller/CommentController');

router.delete('/', CommentController.handleDeleteComment)

module.exports = router;