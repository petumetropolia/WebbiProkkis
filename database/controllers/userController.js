'use strict';
const userModel = require('../models/userModel');
//const user = userModel.user;


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
    const newUser = req.body;
    newUser.filename = req.file.path;
    try {
        const result = await userModel.insertUser(newUser);
        res.status(201).json({message: "new user added"})
    }catch (error){
        console.error("error",error.message);
        res.status(500).json({error: 500, message: error.message});
    }
}

const putUser = (req,res) => {


}
const deleteUser = (req,res) => {

}

const userController = {getUserList,getUser,postUser,putUser,deleteUser};
module.exports = userController;
