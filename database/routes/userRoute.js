'use strict';
const express = require('express');
const multer = require('multer');
const router = express.Router();
const userController = require('../controllers/userController');


const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        //accept file
        cb(null, true);
    } else {
        //reject file
        cb(null, false);
    }
};
const upload = multer({dest: 'uploads/', fileFilter});

router.route('/')
    .get( userController.getUserList)
    .post(upload.single('user'),userController.postUser)
    .put(userController.putUser)

router.route('/:userId')
    .get(userController.getUser)
    .delete(userController.deleteUser)

module.exports = router;