const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
    const values = [req.body.name, req.body.email, req.body.email_verified];


    try {

        const result = await db.query(`INSERT INTO users(name, email, email_verified, cake_day) VALUES($1, $2, $3, NOW()) ON CONFLICT DO NOTHING RETURNING *`, values);

        res.status(204).json({
            chicken: "awegasdg"
        })
    }
    catch (err) {
        console.log(err);
    }

    
})


router.get('/otherprofile', async (req, res) => {
    const name = req.query.name

    try {

        const result = await db.query(`SELECT * FROM users WHERE name=$1`, [ name ]);

        res.status(201).json({
            status: 'successfully retrieved',
            data: {
                user: result.rows
            }
        });
    }

    catch(err) {
        console.log(err);
    }   
    
});

router.get('/allposts', async (req, res) => {

    const user_id = req.query.user_id;
    
    try {
        const result = await db.query(`SELECT * FROM posts WHERE user_id=$1`, [ user_id ])

        res.status(200).json({
            status: 'successful',
            data: {
                post: result.rows
            }
        });
    }
    catch(err) {
        console.log(err);
    }
    
    
});

router.get('/otherprofilePosts', async (req, res) => {
    const name = String(req.query.name)

    try {

        const result = await db.query(`SELECT * FROM posts WHERE author = $1`, [ name ]);

        res.status(201).json({
            status: 'successfully retrieved',
            data: {
                post: result.rows
            }
        });
    }

    catch(err) {
        console.log(err);
    }
    
});

router.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);

        res.status(200).json({
            status: 'success',
            data: {
                user: result.rows
            }
        })
    }
    catch (err) {
        console.log(err);
    }
});



module.exports = router;