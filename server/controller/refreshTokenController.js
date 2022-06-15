const db = require('../db');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;
    
    const foundUser = (await db.query('SELECT * FROM users WHERE name = $1', [name])).rows[0];
    
    if (!foundUser) {
        return res.sendStatus(401)
    };


}

module.exports = { handleRefreshToken };