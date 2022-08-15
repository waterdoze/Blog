const express = require('express');
const db = require('../db');
const router = express.Router();

router.delete('/postcomments', async (req, res) => {

    const pid = req.query.post_id;

    try {
        const result = await db.query('DELETE FROM comments WHERE post_id=$1', [pid]);

        res.status(200).json({
            status: 'successfully deleted',
            data: {
                post: result.rows
            }
        });
    }

    catch(err) {
        console.log(err);
    }

});

router.delete('/single', async (req, res) => {

    const cid = parseInt(req.query.cid)

    try {
        const result = await db.query(`DELETE FROM comments WHERE cid=$1 RETURNING *`, [ cid ])

        res.status(200).json({
            status: 'delteed'
        })
    }
    catch (err) {
        console.log(err);
    }
    
  })

router.post('/', async (req, res) => {
    const values = [
        req.body.comment,
        req.body.user_id,
        req.body.author,
        req.body.post_id
    ]

    try {

        const result = await db.query(`INSERT INTO comments(comment, user_id, author, post_id, date_created) VALUES($1, $2, $3, $4, NOW()) RETURNING *`, values);

        res.status(201).json({
            status: 'successfully inserted',
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
        req.body.comment,
        req.body.user_id, 
        req.body.post_id, 
        req.body.author, 
        req.body.cid
    ]

    try {

        const result = await db.query(`UPDATE comments SET comment = $1, user_id = $2, post_id = $3, author = $4, date_created=NOW() WHERE cid=$5 RETURNING *`, values);

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

router.get('/all', async (req, res) => {

    const post_id = String(req.query.post_id)

    try {
        const result = await db.query(`SELECT * FROM comments WHERE post_id=$1`, [ post_id ])

        res.status(200).json({
            status: 'success',
            data: {
                comments: result.rows
            }
        });
    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router;