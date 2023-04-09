'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



module.exports = router;

router.route('/')
    .get( userController.getUserList)
    .post(userController.postUser)
    .put(userController.putUser)

router.route('/:userId')
    .get(userController.getUser)
    .delete(userController.deleteUser)