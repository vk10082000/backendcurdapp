const express = require("express");
const { userModel } = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
    const { password, email, name } = req.body;
    try {
        bcrypt.hash(password, 2, async (error, hash) => {
            if (error) {
                res.status(400).json({ error: error.message })
            } else {
                const user = new userModel({ name, email, password: hash });
                await user.save();
                res.status(200).json({ msg: "new user was added" })
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});
userRouter.post("/login", async (req, res) => {
    const { password, email } = req.body;
    
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    var token = jwt.sign({username: user.name,userid: user._id},"notes");
                    res.status(200).json({ msg: `${user.name} has logged in`,token });
                } else {
                    res.status(200).json({ msg: "password is incorrect" })
                }
            })
        }else{
            res.status(200).json({ msg: "user not exist" })
        }
        
        } catch (error) {
        res.status(400).json({ error: error.message })
    }
});


module.exports = { userRouter };