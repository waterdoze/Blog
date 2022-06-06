const bcrypt = require('bcrypt');
const db = require('../db');

const handleNewUser = async (req, res) => {
    if (!req.body.name || !req.body.password) {
        return res.status(400).json({
            "message": "Username and password are required"
        })
    }

    try {

        const duplicate = (await db.query('SELECT name FROM users WHERE name = $1', [req.body.name])).rows.length > 0;
        if (duplicate) {
            return res.sendStatus(409);
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const result = await db.query(
            'INSERT INTO users (name, cake_day, karma, country, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [req.body.name, req.body.cake_day, req.body.karma, req.body.country, hashedPassword]
        );

        res.status(201).json({
            status: 'success',
            data: {
                user: result.rows
            }
        });

    }
    catch (err) {
        res.status(500).json({
            "message": err.message
        })
    }
}

module.exports = { handleNewUser };