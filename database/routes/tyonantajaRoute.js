'use strict';
const express = require('express');
const router = express.Router();
const tyonantajaController = require('../controllers/tyonantajaController');
const multer = require("multer");
const upload = multer({dest: 'uploads'});

module.exports = router;

router.route('/')
    .get( tyonantajaController.getEmployerList)
    .post(upload.single('employer'),tyonantajaController.postEmployer)
    .put(tyonantajaController.putEmployer)

router.get('/token', tyonantajaController.checkToken);

router.route('/:employerId')
    .get(tyonantajaController.getEmployer)
    .delete(tyonantajaController.deleteEmployer)