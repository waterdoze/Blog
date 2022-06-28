const db = require('../db');
require('dotenv').config();

const handleLikes = async (req, res) => {
    const user_id = req.body.user_id;

    const post_id = String(req.body.post_id)

    const values = [user_id, post_id]

    db.query(`UPDATE posts SET like_user_id = like_user_id || $1, likes = likes + 1 WHERE NOT (like_user_id @> $1) AND pid = ($2)`, values);
}

module.exports = { handleLikes }