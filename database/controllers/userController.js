'use strict';
const userModel = require('../models/userModel');
const users = userModel.users;


const getUserList = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

//TODO: UPDATE for new user model (check cat controller)
const getUser =  async (req, res) => {
    const userId = Number(req.params.userId);
    if(!Number.isInteger(userId)) {
        res.status(400).json({error: 500, message: 'invalid id'});
        return;
    }
    // TODO: wrap to try-catch
    const [user] = await userModel.getUserById(userId);
    console.log('getUser', user);

    if(user) {
        res.json(user);
    } else {
        res.status(404).json({message: "User not found."})
    }
};
const postUser = (req,res) => {
    console.log('req body:' +  req.body);
    const newUser =
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password

        };
    users.push(newUser);
    res.status(201).send("Added user " + req.body.username);
}

const putUser = (req,res) => {

}
const deleteUser = (req,res) => {

}

const userController = {getUserList,getUser,postUser,putUser,deleteUser};
module.exports = userController;
