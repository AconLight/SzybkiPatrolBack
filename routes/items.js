import express from 'express';
import repository from '../repository/repository.js';
var router = express.Router();

/* GET all items */
router.get('/all', async function(req, res, next) {
  const item = await repository.item.getAllItems()
  res.send(item);
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