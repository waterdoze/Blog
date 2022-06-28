const express = require('express');
const router = express.Router();
const PostController = require('../controller/PostController');

router.get('/', PostController.handlePost)
router.post('/', PostController.handlePostPost)
router.put('/', PostController.handlePutPost)
router.delete('/', PostController.handleDeletePost)

module.exports = router;