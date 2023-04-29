"use strict";
const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const multer = require('multer');
const { login, logout } = require("../controllers/authController");
const {postUser} = require('../controllers/userController');
const {postTyonantaja} = require('../controllers/tyonantajaController');


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
    //.post('/register',upload.single('user'), postUser)
    .post('/register', upload.single('user'), (req, res) => {
        if (req.file) {
            // register as user
            postUser(req, res);
        } else {
            // register as tyonantaja
            postTyonantaja(req, res);
        }
    });

module.exports = router;