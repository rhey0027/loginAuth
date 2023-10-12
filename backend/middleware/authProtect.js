import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import asynchHandler from 'express-async-handler';


const authProtect = asynchHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;
    if(token) {
        try{
            const checked = jwt.verify(token, process.env.JWT_ID);
            req.user = await User.findById(checked.userId).select('-password');
            next();
        }
        catch(error){
            res.status(401);
            throw new Error('Invalid key')
        }
    }else {
        res.status(401);
        throw new Error('You are not authorized');
    }
});
export { authProtect };