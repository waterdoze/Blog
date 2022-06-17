const allowedOrigins = require('./allowedOrigins')

const corsOption = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

module.exports = corsOption;