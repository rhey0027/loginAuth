import jwt from 'jsonwebtoken';

const genToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_ID, {
        expiresIn: "30d"
    });
     res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
     })
};
export default genToken;