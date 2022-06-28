const db = require('../db');
require('dotenv').config();

const handleDeleteComment = async (req, res) => {

    const pid = req.body.post_id;

    try {
        const result = await db.query('DELETE FROM comments WHERE pid=$1', [pid]);

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
    
}

const handlePostPost = async (req, res) => {
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
            results: result.rows.length,
            data: {
                post: result.rows
            }
        });
    }

    catch(err) {
        console.log(err);
    }
    
}

const handlePutPost = async (req, res) => {
    const values = [ 
        req.body.title,
        req.body.post, 
        req.body.uid, 
        req.body.pid, 
        req.body.author
    ]

    try {

        const result = await db.query('UPDATE posts SET title= $1, post=$2, user_id=$3, author=$5, date_created=NOW() WHERE pid = $4 RETURNING *', values);

        res.status(200).json({
            status: 'success',
            results: result.rows.length,
            data: {
                post: result.rows
            }
        });
    }

    catch(err) {
        console.log(err);
    }
    
}

module.exports = { handleDeleteComment };