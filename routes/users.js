import express from 'express';
var router = express.Router();
import UserModel from '../repository/mongo/model/user.js';

/* GET user by nick. */
router.get('/:nick', async function(req, res, next) {
  const user = await UserModel.findOne({nick: req.params.nick})
  res.send(user);
});

export default router
