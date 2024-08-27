import 'dotenv/config'
import jwt from 'jsonwebtoken'
import UserModel from '../repository/mongo/model/user.js';
import repository from '../repository/repository.js';

const returnUser = async (req, res, next) => {
    console.log('returnUser')
    const user = await repository.user.getUserByLogin(req.decodedToken.login)
    res.send({...req.afterData, user: user.toObject()});
}

export default returnUser