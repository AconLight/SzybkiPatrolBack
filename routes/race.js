import express from 'express';
var router = express.Router();
import 'dotenv/config'
import auth from '../middleware/auth.js';
import repository from '../repository/repository.js';
import { generateFight } from '../logic/race/fight.js';
import { checkTimer } from '../logic/timer/timer.js';

/* GET user by nick. */
router.get('/fight/:nick/:turns', auth, async function(req, res, next) {
  let user = await repository.user.getUserByLogin(req.decodedToken.login)
  user = user.toObject()
  if (!checkTimer(user.timers.race)) {
    return res
    .status(204)
    .json({ success: false, message: "can't race yet" });
  }

  let oponent = await repository.user.getUserByNick(req.params.nick)
  if (!oponent) return res
    .status(204)
    .json({ success: false, message: "no such nick" });
  oponent = oponent.toObject()

  const fightLogs = generateFight(user.mainStats, oponent.mainStats, req.params.turns)
  repository.user.setUserRaceTimer(user.login, 2)
    
  res.send(fightLogs);
});

export default router
