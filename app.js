'use strict';
const express = require('express');
const cors = require('cors');
const userRoute = require('./database/routes/userRoute');
const tyonantajaRoute = require("./database/routes/tyonantajaRoute")
const passport = require('./utils/passport');
const authRoute = require('./database/routes/authRoute');
const app = express();
const port = 3000;


// Log middleware
app.use((req,res,next) => {
    console.log(Date.now() + ': request: ' + req.method + ' ' + req.path)
    next();
});

// Serve example-ui
app.use(express.static('registration', ));
//app.use(express.static('kuvat'));
app.use(express.static('profiili'));


// Serve image files
app.use('/uploads', express.static('uploads'));

// Add cors headers using cors middleware
app.use(cors());

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Use passport for authentication
app.use(passport.initialize());

// Authentication middleware to restrict access to certain routes
const requireAuth = passport.authenticate('jwt', {session: false});

// Routes
app.use('/auth', authRoute);

// Allow access to home page and registration page for unauthenticated users
app.get(['/home', '/registration'], (req, res) => {
    res.send('Welcome to the home page or registration page');
});

// Restrict access to user and tyonantaja routes for unauthenticated users
app.use(['/user', '/tyonantaja'], requireAuth);

// Routes for authenticated users
app.use('/user', userRoute);
app.use('/tyonantaja', tyonantajaRoute);

//app.use('/user', userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));