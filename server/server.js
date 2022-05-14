require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json())

//Get all users
app.get('/api/v1/users', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            users: ['adonk', 'kev']
        }
    });
});

//Get a single user
app.get('/api/v1/users/:id', (req, res) => {
    console.log(req.params);
    res.status(200).json({
        status: 'success',
        data: {
            user: 'adonk'
        }
    })
});

//Create user
app.post('/api/v1/users', (req, res) => {
    console.log(req.body);
});

//Update user
app.put('/api/v1/users/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
});



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
})