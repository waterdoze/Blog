const express = require('express');
const router = express.Router();
const getPostController = require('../controller/getPostController');

router.get('/', getPostController.handlePosts)

module.exports = router;