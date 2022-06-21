const db = require('../db');

const handleLogout = async (req, res) => {
    //On client, also delete access token
    const cookies = req.cookies;    

    if (!cookies?.jwt) {
        return res.sendStatus(204); //No Content
    }

    const refreshToken = cookies.jwt;
    const foundUser = (await db.query('SELECT * FROM users WHERE token = $1', [refreshToken])).rows[0];
    
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204); //No Content
    };

    //Delete refreshToken in db

    await db.query('UPDATE users SET token = null WHERE token = $1', [refreshToken]);
    res.clearCookie('jwt', { httpOnly: true }); //secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout };