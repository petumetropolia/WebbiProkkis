"use strict";
const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const { login, logout } = require("../controllers/authController");
const {postUser} = require('../controllers/userController');

router
    .post("/login", login)
    .get('/logout', logout)
    .post(
        '/register',
        body('name').isLength({min: 3}).trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('passwd').isLength({min: 8}).trim(),
        postUser
    );


module.exports = router;