import express from 'express';
var router = express.Router();
import UserModel from '../repository/mongo/model/user.js';
import 'dotenv/config'
import jwt from 'jsonwebtoken'

/* GET user by nick. */
router.get('/:nick', async function(req, res, next) {
  const user = await UserModel.findOne({nick: req.params.nick})
  res.send(user);
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
    user.token = token
    user.password = undefined
    console.log(token)
    res.send(user);
  } else {
    res.status(401)
    res.send("wrong creds!")
  }  
});

export default router
