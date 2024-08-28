import express from 'express';
var router = express.Router();
import 'dotenv/config'
import auth from '../middleware/auth.js';
import repository from '../repository/repository.js';
import { generateFight } from '../logic/race/fight.js';
import { checkTimer } from '../logic/timer/timer.js';
import returnUser from '../middleware/returnUser.js';

/* GET user by nick. */
router.get('/fight/:nick/:turns', auth, async function(req, res, next) {
  let user = await repository.user.getUserByLogin(req.decodedToken.login)
  user = user.toObject()

  if (!checkTimer(user.timers.race))    return res.status(204).json({ success: false, message: "race" });
  if (!checkTimer(user.timers.work))    return res.status(204).json({ success: false, message: "work" });
  if (!checkTimer(user.timers.trening)) return res.status(204).json({ success: false, message: "trening" });
    

  let oponent = await repository.user.getUserByNick(req.params.nick)
  if (!oponent) return res
    .status(204)
    .json({ success: false, message: "no such nick" });
  oponent = oponent.toObject()

  const userMainStats = user.mainStats
  const oponentMainStats = oponent.mainStats

  const userItems = await repository.item.getItemsByIds(user.items.filter(item => item.isEquiped).map(item => item.itemId))
  const oponentItems = await repository.item.getItemsByIds(oponent.items.filter(item => item.isEquiped).map(item => item.itemId))

  const statNames = ['attack', 'armor', 'steering', 'speed']
  statNames.forEach(statName => {
    userMainStats[statName] += userItems.reduce((acc, curr) => acc + (curr.toObject()[statName] || 0), 0)
    oponentMainStats[statName] += oponentItems.reduce((acc, curr) => acc + (curr.toObject()[statName] || 0), 0)
  });

  userMainStats.events = userItems.reduce((acc, curr) => [...acc, ...curr.toObject().events || []], [])
  oponentMainStats.events = oponentItems.reduce((acc, curr) => [...acc, ...curr.toObject().events || []], [])

  const fightLogs = generateFight(userMainStats, oponentMainStats, req.params.turns)
  await repository.user.setUserRaceTimer(user.login, 0)

  await repository.user.setHp(user.nick, fightLogs.userHp)
  await repository.user.setHp(oponent.nick, fightLogs.oponentHp)
  oponent = await repository.user.getUserByNick(req.params.nick)
  req.afterData = {fight: fightLogs, oponent: oponent};
  next()
}, returnUser);

export default router
