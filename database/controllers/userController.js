'use strict';
// userController
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getUserList = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


const getUser =  async (req, res) => {
    const userId = Number(req.params.userId);
    if(!Number.isInteger(userId)) {
        res.status(400).json({error: 500, message: 'invalid id'});
        return;
    }

    const [user] = await userModel.getUserById(userId);
    console.log('getUser', user);

    if(user) {
        res.json(user);
    } else {
        res.status(404).json({message: "User not found."})
    }
};
const postUser = async (req,res) => {
    console.log("posting user", req.body, req.file);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const newUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        profession: req.body.profession,
        description: req.body.description,
        filename: req.file.filename,
        password: password,
        //role: req.body.role,
    };
    try {
        const result = await userModel.insertUser(newUser);
        res.status(201).json({message: "new user added"})
    }catch (error){
        console.error("error",error.message);
        res.status(500).json({error: 500, message: error.message});
    }
};

const putUser = async (req,res) => {
    const user = req.body;
    try {
        const result = await userModel.modifyUser(req.body);
        res.status(200).json({message: "user modified"});
    }
    catch (e){
        console.error("error", e.message);
        res.status(500).json({error: 500, message: e.message});
    }

}


const deleteUser = async (req,res) => {
    console.log("deleting a cat", req.params.userId);
    try {

        const result = await userModel.deleteUser(req.params.userId);
        res.status(200).send("User deleted");
    }catch (e){
        console.error("error",e.message);
        res.status(500).json({error: 500, message: e.message});
    }
}

const checkToken = (req, res) => {
    res.json({user: req.user});
};

const userController = {getUserList, getUser, postUser, putUser, deleteUser, checkToken};
module.exports = userController;
