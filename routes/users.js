import express from 'express';
var router = express.Router();
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import auth from '../middleware/auth.js';
import repository from '../repository/repository.js';
import returnUser from '../middleware/returnUser.js';

/* GET user by login. */
router.get('/user/:login', auth, async function(req, res, next) {
  const user = await repository.user.getUserByLogin(req.params.login)
  const equipedItemIds = user.toObject().items.filter(e => e.isEquiped).map(e => e.itemId)
  const equipedItemsFull = await repository.item.getItemsByIds(equipedItemIds)
  const car = equipedItemsFull.find(e => e.category == 'cars')?.toObject()
  res.send({...user.toObject(), car: {url: car?.imgUrl, name: car?.name}});
});

/* GET user by nick. */
router.get('/userByNick/:nick', async function(req, res, next) {
  const user = await repository.user.getUserByNick(req.params.nick)
  const equipedItemIds = user.toObject().items.filter(e => e.isEquiped).map(e => e.itemId)
  const equipedItemsFull = await repository.item.getItemsByIds(equipedItemIds)
  const car = equipedItemsFull.find(e => e.category == 'cars')?.toObject()
  res.send({...user.toObject(), car: {url: car?.imgUrl, name: car?.name}});
});

/* post user stat. */
router.post('/incStat/:statName', auth, async function(req, res, next) {
  if (['armor', 'attack', 'speed', 'steering'].includes(req.params.statName)) {
    const result = await repository.user.incStat(req.decodedToken.login, req.params.statName, 100)
    next()
  }
}, returnUser);

/* post user activateItem. */
router.post('/activateItem/:itemId', auth, async function(req, res, next) {
  const item = await repository.item.getItemById(req.params.itemId)
  const category = item.toObject().category
  const itemsDeactivation = await repository.item.getItemByCategory(category)
  const ids = itemsDeactivation.map(item => item._id)
  await repository.user.deactivateItems(req.decodedToken.login, ids)
  await repository.user.activateItem(req.decodedToken.login, req.params.itemId)
  next()
}, returnUser);

/* post user userRepair. */
router.post('/userRepair', auth, async function(req, res, next) {
  await repository.user.repairByLogin(req.decodedToken.login)
  next()
}, returnUser);

/* GET user refreshToken. */
router.get('/refreshToken', auth, async function(req, res, next) {
  const token = jwt.sign(
    {
        userId: req.decodedToken.userId,
        login: req.decodedToken.login
    },
    process.env.SECRET_KEY,
    { expiresIn: "10h" }
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
  let user = await repository.user.getUserByLoginWithPassword(login)
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
