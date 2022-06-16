const db = require('../db');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const handleRefreshToken = async (req, res) => {

    const cookies = req.cookies;    

    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;
    const foundUser = (await db.query('SELECT * FROM users WHERE token = $1', [refreshToken])).rows[0];
    
    if (!foundUser) {
        return res.sendStatus(403)
    };

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {

            if (err || foundUser.name !== decoded.name) {
                return res.sendStatus(403);
            }

            const accessToken = jwt.sign(
                { "name": foundUser.name }, 
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "5m" }
            );

            res.json({ accessToken });
        }
    )

}

module.exports = { handleRefreshToken };