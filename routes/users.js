import express from 'express';
var router = express.Router();
import UserModel from '../repository/mongo/model/user.js';
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import auth from '../middleware/auth.js';

/* GET user by nick. */
router.get('/user/:login', auth, async function(req, res, next) {
  const user = await UserModel.findOne({login: req.params.login})
  user.password = undefined
  res.send(user);
});

/* GET user by nick. */
router.get('/refreshToken', auth, async function(req, res, next) {
  const token = jwt.sign(
    {
        userId: req.decodedToken.userId,
        login: req.decodedToken.login
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  const result = {
    login: req.decodedToken.login,
    token,
  }
  res.send(result);
});

/* POST login. */
router.post('/login', async function(req, res, next) {
  const { login, password } = req.body;
  console.log(login)
  let user = await UserModel.findOne({login: login})
  user = user && user.toObject()
  if (user && user.password == password) {
    const token = jwt.sign(
      {
          userId: user._id,
          login: user.login
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    const result = {
      login,
      token,
    }
    res.send(result);
  } else {
    res.status(401)
    res.send("wrong creds!")
  }  
});

export default router
