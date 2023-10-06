import expressAsyncHandler from "express-async-handler";


//authenticate user
const authUser = expressAsyncHandler(async(req, res) => {
    //checking custom error    
    // res.status(401);
    // throw new Error('something went hywire!');
    res.status(200).json({message: 'Auth User'})
});
//register new account
const registerUser = expressAsyncHandler(async(req, res) => {

    res.status(200).json({message: 'Register User'})
});
//logout account
const logoutUser = expressAsyncHandler(async(req, res) => {

    res.status(200).json({message: 'Logout User'})
});
//user profile account
const getUserProfile = expressAsyncHandler(async(req, res) => {

    res.status(200).json({message: 'User Profile'})
});
//update user account
const updateUserProfile = expressAsyncHandler(async(req, res) => {

    res.status(200).json({message: 'User Profile Update'})
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};