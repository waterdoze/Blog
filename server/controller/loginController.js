const bcrypt = require('bcrypt');
const db = require('../db');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {

    const { name, password } = req.body;
    
    if (!name || !password) {
        return res.sendStatus(400);
    }

    const foundUser = (await db.query('SELECT * FROM users WHERE name = $1', [name])).rows[0];
    
    if (!foundUser) {
        return res.sendStatus(401)
    };

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {

        // const accessToken = jwt.sign()
        res.json({
            success: `${name} is logged in!`
        });
    }
    else {
        return res.sendStatus(401);
    }
}

module.exports = { handleLogin };