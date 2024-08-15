import express from 'express';
var router = express.Router();
import 'dotenv/config'
import auth from '../middleware/auth.js';
import repository from '../repository/repository.js';
import { checkTimer } from '../logic/timer/timer.js';

/* GET user by nick. */
router.get('/work/:time', auth, async function(req, res, next) {
  let user = await repository.user.getUserByLogin(req.decodedToken.login)
  user = user.toObject()

  if (!checkTimer(user.timers.work))    return res.status(204).json({ success: false, message: "work" });
  if (!checkTimer(user.timers.trening)) return res.status(204).json({ success: false, message: "trening" });

  repository.user.setUserWorkTimer(user.login, req.params.time)
    
  res.status(200).send('ok')
});

export default router
