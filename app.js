import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger  from 'morgan';
import cors from 'cors';

import usersRouter  from './routes/users.js';
import itemsRouter  from './routes/items.js';
import raceRouter  from './routes/race.js';
import treningRouter  from './routes/trening.js';
import workRouter  from './routes/work.js';
import { mongoConnect } from './repository/mongo/mongo.js';

const __dirname = import.meta.dirname;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/race', raceRouter);
app.use('/trening', treningRouter);
app.use('/work', workRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoConnect();

export default app
