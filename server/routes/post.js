const express = require('express');
const db = require('../db'); 
const router = express.Router();

router.get('/', async (req, res) => {

    const pid = req.query.post_id;

    try {
        const result = await db.query('SELECT * FROM posts WHERE pid=$1', [pid]);

        res.status(200).json({
            status: 'success',
            data: {
                post: result.rows
            }
        });
    }

    catch(err) {
        console.log(err);
    }
    
});

router.post('/', async (req, res) => {
    const values = [
        req.body.title,
        req.body.post,
        req.body.user_id,
        req.body.author
    ]

    try {

        const result = await db.query('INSERT INTO posts(title, post, user_id, author, date_created) VALUES ($1, $2, $3, $4, NOW()) RETURNING *', values);

        res.status(201).json({
            status: 'success',
            data: {
                post: result.rows
            }
        });
    }

    catch(err) {
        console.log(err);
    }
    
});

router.put('/', async (req, res) => {
    const values = [ 
        req.body.title,
        req.body.post, 
        req.body.user_id, 
        req.body.post_id, 
        req.body.author
    ]

    try {

        const result = await db.query('UPDATE posts SET title= $1, post=$2, user_id=$3, author=$5, date_created=NOW() WHERE pid = $4 RETURNING *', values);

        res.status(201).json({
            status: 'success',
            data: {
                post: result.rows
            }
        });
    }

    catch(err) {
        console.log(err);
    }
    
});

router.delete('/', async (req, res) => {
    const post_id = req.query.post_id
    try {
        const result = await db.query(`DELETE FROM posts WHERE pid = $1 RETURNING *`, [post_id]);

        res.status(200).json({
            status: 'successfully deleted',
            data: {
                deleted: result.rows
            }
        })
    }
    catch (err) {
        console.log(err)
    }
    
});

module.exports = router;