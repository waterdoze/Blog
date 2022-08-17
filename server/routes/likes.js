const express = require('express');
const db = require('../db');
const router = express.Router();

router .get('/', async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const post_id = req.query.post_id;

        const result = await db.query(`SELECT like_user_id FROM posts WHERE pid=$1`)
    }
    catch (err) {
        console.log(err)
    }
})

router.put('/', async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const post_id = String(req.body.post_id)
        // await db.query(`UPDATE posts SET like_user_id = like_user_id || $1, likes = likes + 1 WHERE NOT (like_user_id @> $1) AND pid = ($2)`, values);

        const result = await db.query(`SELECT like_user_id FROM posts WHERE pid=$1`, [post_id])
        const likeList = result.rows[0].like_user_id

        const isIn = likeList.includes(parseInt(user_id))

        if (isIn) {
            await db.query(`UPDATE posts SET like_user_id=array_remove(like_user_id, $1), likes = likes - 1`, [user_id]);
            return res.status(201).json({
                asdf: "dislike"
            })
        } else {
            await db.query(`UPDATE posts SET like_user_id=array_append(like_user_id, $1), likes = likes + 1`, [user_id]);
            return res.status(201).json({
                asdf: "like"
            })
        }

    }
    catch (err) {
        console.log(err)
    }

});

module.exports = router;