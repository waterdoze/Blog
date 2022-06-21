const db = require('../db');
require('dotenv').config();

const handlePosts = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM posts');

        res.status(200).json({
            status: 'success',
            results: result.rows.length,
            data: {
                posts: result.rows
            }
        });
    }

    catch(err) {
        console.log(err);
    }
    
}

module.exports = { handlePosts };