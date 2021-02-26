'use strict';

const express = require('express');
const app = express();

const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator');

const errors = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');

app.use(logger);


app.get('/person', validator, (req, res) => {
  res.status(200).json(req.query.name);  
})




function start(port) {
  if(!port) { throw new Error('Missing Port'); }
  app.listen(port, () => console.log(`Listening on ${port}`))
}

app.use('*', notFound);
app.use(errors);

module.exports = {
  app: app,
  start: start
}