'use strict';
const tyonantajaModel = require('../models/tyonantajaModel');
//const user = userModel.user;


const getEmployerList = async (req, res) => {
    try {
        const users = await tyonantajaModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


const getEmployer =  async (req, res) => {
    const userId = Number(req.params.userId);
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
    const newUser = req.body;
    newUser.filename = req.file.filename;
    try {
        const result = await tyonantajaModel.insertUser(newUser);
        res.status(201).json({message: "new user added"})
    }catch (error){
        console.error("error",error.message);
        res.status(500).json({error: 500, message: error.message});
    }
}

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

const tyonantajaController = {getEmployerList,getEmployer,postEmployer,putEmployer,deleteEmployer};
module.exports = tyonantajaController;
