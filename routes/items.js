import express from 'express';
import repository from '../repository/repository.js';
import auth from '../middleware/auth.js';
var router = express.Router();

/* GET all items */
router.get('/all', async function(req, res, next) {
  const item = await repository.item.getAllItems()
  res.send(item);
});

/* GET users items */
router.get('/userItems', auth, async function(req, res, next) {
  const user = await repository.user.getUserByLogin(req.decodedToken.login)
  const itemIds = user.items.map(item => item.itemId)
  const items = await repository.item.getItemsByIds(itemIds)
  const result = items.map(item => ({...item.toObject(), isEquiped: user.items.find(e => e.itemId.toString() == item._id.toString())?.isEquiped}))
  res.send(result);
});

/* put addItem*/
router.put('/addItem/:name', auth, async function(req, res, next) {
  let item = await repository.item.getItemByName(req.params.name)
  item = item.toObject()
  if (item) {
      await repository.user.buyItem(req.decodedToken.login, item._id, item.price)
  }
  res.send("ok");
});

/* GET item by name. */
router.get('/:name', async function(req, res, next) {
  const item = await repository.item.getItemByName(req.params.name)
  res.send(item);
});

/* GET item by category. */
router.get('category/:category', async function(req, res, next) {
  const items = await repository.item.getItemByCategory(req.params.category)
  res.send(items);
});



export default router