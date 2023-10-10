import genToken from "../utils/genToken.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//authenticate user
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        genToken(res, user._id)
         res.status(201).json({
            _id: user._id, 
            name: user.name,
            email: user.email,
        });
    }else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
    //checking custom error    
    // res.status(401);
    // throw new Error('something went hywire!');
    //res.status(200).json({message: 'Auth User'})
});

//register new account
const registerUser = asyncHandler(async(req, res) => { 
    const { name, email, password } = req.body;
    const userExists = await User.findOne({email});
    
    if(userExists) {
        res.status(400);
        throw new Error('User already exists!');
    }  
    const user = await User.create({
        name,
        email,
        password,
    });
    if(user) {
        genToken(res, user._id);
         res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    }else {
        res.status(400);
        throw new Error('created unsuccessfull')
    }
    //console.log(req.body);
    //res.status(200).json({message: 'Register User'})
});
//logout account - to destroy cookie-parser
const logoutUser = asyncHandler(async(req, res) => {
     //destroying cookie-parcer
     res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
     });
    res.status(200).json({message: 'User logged out'})
});
//user profile account
const getUserProfile = asyncHandler(async(req, res) => {
    //customized what to display
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }
    console.log(user)
    res.status(200).json(user)
    //res.status(200).json({message: 'User Profile'})
});
//update user account
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findOne(req.user._id)
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
    }
    const updatedUser = await user.save();
    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email 
    });  
    //res.status(200).json({message: 'User Profile Update'})
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};