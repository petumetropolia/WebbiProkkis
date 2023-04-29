'use strict';
const express = require('express');
const cors = require('cors');
const userRoute = require('./database/routes/userRoute');
const passport = require('./utils/passport');
const tyonantajaRoute = require('./database/routes/tyonantajaRoute');
const authRoute = require('./database/routes/authRoute');
const session = require('express-session');
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
//app.use(express.static('kuvat'));
app.use(express.static('profiili'));
app.use(express.static('kuvat'));
app.use(express.static('home'));
app.use(express.static('aboutus'));
app.use(express.static('contactus'));
app.use(express.static('terms'));
app.use(express.static('privacypolicy'));




// Serve image files
app.use('/uploads', express.static('uploads'));

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());

app.use('/auth', authRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
//app.use('/user', userRoute);
app.use('/employer', tyonantajaRoute);
//app.use('/employer', passport.authenticate('jwt', {session: false}),tyonantajaRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));