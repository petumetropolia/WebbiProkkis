"use strict";
const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const multer = require('multer');
const { login, logout } = require("../controllers/authController");
const {postUser} = require('../controllers/userController');


const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg']
    if (allowedTypes.includes(file.mimetype)) {
        // accept file
        cb(null, true);
    }else {
        // reject file
        cb(null, false);
    }
};

const upload = multer({dest: 'uploads', fileFilter});

router
    .post("/login", login)
    .get('/logout', logout)
    .post('/register',upload.single('user'), postUser);

module.exports = router;