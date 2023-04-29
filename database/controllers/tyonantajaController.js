'use strict';
const tyonantajaModel = require('../models/tyonantajaModel');
const bcrypt = require('bcryptjs');
const userModel = require("../models/userModel");
//const user = userModel.user;


const getEmployerList = async (req, res) => {
    try {
        const users = await tyonantajaModel.getAllTyonantaja();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


const getEmployer =  async (req, res) => {
    const userId = Number(req.params.tyonantaja_id);
    if(!Number.isInteger(userId)) {
        res.status(400).json({error: 500, message: 'invalid id'});
        return;
    }

    const [user] = await tyonantajaModel.getUserById(userId);
    console.log('getUser', user);

    if(user) {
        res.json(user);
    } else {
        res.status(404).json({message: "User not found."})
    }
};
const postEmployer = async (req,res) => {
    console.log("posting user", req.body, req.file);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const newTyonantaja = {
        yTunnus: req.body.yTunnus,
        name: req.body.name,
        email: req.body.email,
        description: req.body.description,
        filename: req.file.filename,
        password: password,
        profession: req.body.profession,
        //role: req.body.role,
    };
    try {
        const result = await tyonantajaModel.insertTyonantaja(newTyonantaja);
        res.status(201).json({message: "new user added"})
    }catch (error){
        console.error("error",error.message);
        res.status(500).json({error: 500, message: error.message});
    }
};

const putEmployer = async (req,res) => {
    const user = req.body;
    try {
        const result = await tyonantajaModel.modifyUser(req.body);
        res.status(200).json({message: "user modified"});
    }
    catch (e){
        console.error("error", e.message);
        res.status(500).json({error: 500, message: e.message});
    }

}


const deleteEmployer = async (req,res) => {
    console.log("deleting a cat", req.params.userId);
    try {

        const result = await tyonantajaModel.deleteUser(req.params.userId);
        res.status(200).send("User deleted");
    }catch (e){
        console.error("error",e.message);
        res.status(500).json({error: 500, message: e.message});
    }
}

const checkToken = (req, res) => {
    res.json({user: req.user});
};

const tyonantajaController = {getEmployerList,getEmployer,postEmployer,putEmployer,deleteEmployer,checkToken};
module.exports = tyonantajaController;
