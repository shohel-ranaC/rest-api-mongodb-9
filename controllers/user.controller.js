const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');

// get users
const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
// get one user
const getOneUser = async (req, res) => {
    try {
        const user = await User.findOne({id: req.params.id});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
// Create a new user
const createUser = async (req, res) => {
   try {
    const newUser = new User({
        id: uuidv4(),
        name: req.body.name,
        age: Number(req.body.age)
    })
    await newUser.save();
    res.status(201).json(newUser);
   } catch (error) {
    res.status(500).send(error.message);
   }
};
// Update user
const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({id: req.params.id});
          user.name = req.body.name;
          user.age = Number(req.body.age);
        
          await user.save();
          res.status(200).json(user);
       } catch (error) {
          res.status(500).send(error.message);
       }
};
// delete users
const deleteUser = async (req, res) => {
    try {
        await User.deleteOne({id: req.params.id});
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {getAllUser, getOneUser, createUser, deleteUser, updateUser};