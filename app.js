'use strict';
const express = require('express');
const cors = require('cors');
const userRoute = require('./database/routes/userRoute');
const app = express();
const port = 3000;

// Log middleware
app.use((req,res,next) => {
    console.log(Date.now() + ': request: ' + req.method + '' + req.path)
    next();
});

// Add cors headers using cors middleware
app.use(cors());

// Serve example-ui
app.use(express.static('registration'));
app.use(express.static('kuvat'));
app.use(express.static('profiili'));

// Serve image files
app.use('/uploads', express.static('uploads'));

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/user', userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));