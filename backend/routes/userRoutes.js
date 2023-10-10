import express from "express";
const router = express.Router();
import { 
        authUser,
        registerUser,
        logoutUser,
        getUserProfile,
        updateUserProfile } from "../controllers/userController.js";
import { authProtect } from "../middleware/authProtect.js";

//route
router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(authProtect, getUserProfile).put(authProtect, updateUserProfile)

export default router;