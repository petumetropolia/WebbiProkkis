"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const login = (req, res) => {
    console.log(req.body)
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
           console.log(info);
            console.log(user);
            return res.status(400).json({
                message: 'Username / password wrong',
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.json({message: err});
            }
            // generate a signed json web token with the contents of user object and return it in the response
            const token = jwt.sign(user, process.env.JWT_SECRET);
            // Add a redirect method to the response
            return res.json({user, token});
        });
    })(req, res);
};
const logout = (req, res) => {
    // client log out itself by removing the token from local/session storage
    res.json({message: 'logged out'});
};
module.exports = {
    login, logout
};