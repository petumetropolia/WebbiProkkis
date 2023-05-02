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

    };
    try {
        const result = await userModel.insertUser(newUser);
        //res.redirect("/swipe/swipe.html");
    }catch (error){
        console.error("error",error.message);
        res.status(500).json({error: 500, message: error.message});
    }

};
const putUser = async (req, res) => {
    try {
        const userId = req.body.id
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        console.log("userid: " + userId);
        console.log(req.body)
        console.log(req.body.filename)
        const user = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            profession: req.body.profession,
            description: req.body.description,
            password: password,

        };
        if (req.file) {
            user.filename = req.file.filename;
        }else {
            user.filename = req.body.sessionuser;
        }

        console.log("user: " + JSON.stringify(user));
        const result = await userModel.modifyUser(userId, user);
        res.status(200).json({ message: "User modified" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/*
const putUser = async (req, res) => {
    try {
        // Get the user ID from the request parameters
        const userId  = req.body.id;

        // Get the authenticated user object from req.user
        const user = req.user;


        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Call your update user function and pass the authenticated user object
        const result = await userModel.modifyUser(userId, data, user)
        console.log("UserID: " + userId);
        console.log("RequestBody: " + req.body);
        console.log("request.user: " + user);

        // Return the updated user object
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
*/
/*
const putUser = async (req, res) => {
    try {
        const userId = req.body.id;
        console.log("userid: " + userId);
        const user = req.body.data;

        console.log(user);
        console.log(req.body);
        const result = await userModel.modifyUser(userId, user);
        res.status(200).json({ message: "User modified" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

 */
/*
const putUser = async (req,res) => {


    const user = req.body;
    console.log("request body is controller" + user);
    try {
        const result = await userModel.modifyUser(user);
        res.status(200).json({message: "user modified"});
    }
    catch (e){
        console.error("error", e.message);
        res.status(500).json({error: 500, message: e.message});
    }

}


 */

const deleteUser = async (req,res) => {

    try {

        const result = await userModel.deleteUser(req.params.userId);
        console.log(req.params);
        console.log(req.params.userId);
        res.status(200).json({ message: "User deleted" });
    }catch (e){
        console.error("error",e.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const checkToken = (req, res) => {
    res.json({user: req.user});
};

const userController = {getUserList, getUser, postUser, putUser, deleteUser, checkToken};
module.exports = userController;
