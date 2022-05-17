require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json())

//Get all users
app.get('/api/v1/users', async (req, res) => {

    try {
        const result = await db.query('SELECT * FROM users');

        res.status(200).json({
            status: 'success',
            results: result.rows.length,
            data: {
                users: result.rows
            }
        });
    }
    catch(err) {
        console.log(err);
    }
    
});

//Get a single user
app.get('/api/v1/users/:id', async (req, res) => {

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

//Create user
app.post('/api/v1/users', (req, res) => {
    try {

        const result = db.query(
            'INSERT INTO users (name, cake_day, karma, country) values ($1, $2, $3, $4)',
             [req.body.name, req.body.cake_day, req.body.karma, req.body.country]
        );
        
        res.status(201).json({
            status: 'success',
            data: {
                user: 'adonk'
            }
        });
    }
    catch (err) {
        console.log(err);
    }

});

//Update user
app.put('/api/v1/users/:id', (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            data: {
                user: 'adonk'
            }
        });
    }
    catch (err) {
        console.log(err);
    }

});

//delete user
app.delete('/api/v1/users/:id', (req , res) => {
    try {
        res.status(204).json({
            status: 'success'
        });
    }
    catch (err) {
        console.log(err);
    }

});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
})