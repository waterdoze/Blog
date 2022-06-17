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

        const accessToken = jwt.sign(
            { "name": foundUser.name }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
        );

        const refreshToken = jwt.sign(
            { "name": foundUser.name }, 
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        
        await db.query('UPDATE users SET token = $1 WHERE name = $2', [refreshToken, name]);
        res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    }
    else {
        return res.sendStatus(401);
    }
}

module.exports = { handleLogin };