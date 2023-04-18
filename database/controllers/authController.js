"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const login = (req, res) => {
    // TODO: add passport authenticate
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            console.log(info)
            return res.status(400).json({
                message: 'Username / password wrong',
                // or more detailed message:
                //message: info.message,
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.json({message: err});
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, process.env.JWT_SECRET);
            // TODO: do you really need to include whole user to token payload
            return res.json({user, token});
        });
    })(req, res);
    //res.send('this will be login');
};
const logout = (req, res) => {
    // client log out itself by removing the token from local/session storage
    res.json({message: 'logged out'});
};
module.exports = {
    login, logout
};