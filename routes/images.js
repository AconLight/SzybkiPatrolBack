import express from 'express';
var router = express.Router();
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import auth from '../middleware/auth.js';
import repository from '../repository/repository.js';
import returnUser from '../middleware/returnUser.js';

/* GET images */
router.get('/links', auth, async function(req, res, next) {
  const links = await repository.images.getLinks()
  console.log('links', links)
  res.send({links});
});

export default router
