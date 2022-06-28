const express = require('express');
const router = express.Router();
const PostsController = require('../controller/PostsController');

router.get('/', PostsController.handlePosts)

module.exports = router;