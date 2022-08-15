require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

app.use(cors());
app.use(express.json());
//front end's request need 'with-credential' tag to set to 'include' to pass cookies
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/v1/usersregister', require('./routes/register'));
app.use('/api/v1/users/refresh', require('./routes/refresh'));

app.use('/api/v1/posts', require('./routes/posts'));
app.use('/api/v1/post', require('./routes/post'));
app.use('/api/v1/like', require('./routes/likes'));
app.use('/api/v1/comment', require('./routes/comments'));
app.use('/api/v1/users', require('./routes/profile'))


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})