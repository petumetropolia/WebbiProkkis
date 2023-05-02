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
app.use(express.static('uploads'));


// Serve image files
app.use('/uploads', express.static('uploads'));

// Middleware for parsing request body
app.use(express.json());
// Middleware for parsing URL-encoded request bodies with extended options.
app.use(express.urlencoded({extended: true}));
// Initialize Passport for authentication.
app.use(passport.initialize());
// Use the authRoute for handling authentication-related routes
app.use('/auth', authRoute);
// Use the userRoute for handling user-related routes under the '/user' endpoint, and require authentication using the JWT strategy.
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
// Use the tyonantajaRoute for handling tyonantaja-related routes under the '/employer' endpoint.
app.use('/employer', tyonantajaRoute);
//app.use('/employer', passport.authenticate('jwt', {session: false}),tyonantajaRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));