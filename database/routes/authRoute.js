"use strict";
const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const { login, logout } = require("../controllers/authController");
const {postUser} = require('../controllers/userController');

router
    .post("/login", login)
    .get('/logout', logout)
    .post('/register', postUser);

module.exports = router;