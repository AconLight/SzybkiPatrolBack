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
  const itemNames = user.items
  const items = await repository.item.getItemsByNames(itemNames)
  res.send(items);
});

/* put addItem*/
router.put('/addItem/:name', auth, async function(req, res, next) {
  const item = await repository.item.getItemByName(req.params.name)
  if (item) {
      await repository.user.addItem(req.decodedToken.login, req.params.name)
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