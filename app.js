'use strict';
const express = require('express');
const cors = require('cors');
const userRoute = require('./database/routes/userRoute');
const session = require('express-session');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(session({
    secret: 'sdmsvin2123348dvf82mmsA',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.urlencoded({extended: true}));
app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.get('/profileslider', (req, res) => {
    if (req.session.loggedIn) {
        res.send('profile');
    }else {
        res.status(403).send('you must login to see this');
    }});
app.post('/login', (req, res) => {
    console.log('trying to log in', req.body);
    // dummy login
    if (req.body.username === user.name &&
        req.body.password === user.password) {
        req.session.loggedIn = true;
        res.redirect('/profileslider');
    } else {
        res.status(401).send('login failed!');
    }
});
app.get('logout', (req, res) => {
    req.session.loggedIn = false;
    res.redirect('/form');
});



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