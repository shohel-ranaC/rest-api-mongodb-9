const express = require('express');
const cors = require('cors');
require('./config/db');
const userRouter = require('./routes/user.route');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', userRouter)

// api/users: GET
// api/users/:id GET  search different user
// api/users/: POST   create a new user
// api/users/:id PATCH update in different user
// api/users/:id: DELETE delete user

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/./views/index.html');
});

// route not found error
app.use((req, res, next) => {
    res.status(404).json({
        message: 'route not found',
    });
});

// server error
app.use((req, res, next) => {
    res.status(500).json({
        message: 'something went wrong',
    });
});


module.exports = app;