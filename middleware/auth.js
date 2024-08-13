import 'dotenv/config'
import jwt from 'jsonwebtoken'
import UserModel from '../repository/mongo/model/user.js';

const auth = async (req, res, next) => {
    const authorizationHeader = req.header("Authorization")
    console.log('auth')
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
        .status(401)
        .json({ success: false, message: "Invalid authorization header" });
    }
    try {
        const token = authorizationHeader.replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await UserModel.findOne({login: decoded.login})
        console.log(user)
        console.log(decoded)
        if (decoded.userId !== user._id + "") {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        req.decodedToken = decoded
        next()
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token db" });
    }
}

export default auth