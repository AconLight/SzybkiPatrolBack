import express from 'express';
import ItemModel from '../repository/mongo/model/item.js';
var router = express.Router();

/* GET all items */
router.get('/', async function(req, res, next) {
  const item = await ItemModel.find()
  res.send(item);
});

/* GET item by name. */
router.get('/:name', async function(req, res, next) {
  const item = await ItemModel.findOne({name: req.params.name})
  res.send(item);
});

/* GET item by category. */
router.get('category/:category', async function(req, res, next) {
  const items = await ItemModel.find({category: req.params.category})
  res.send(items);
});

export default router