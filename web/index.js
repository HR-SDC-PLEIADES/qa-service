const express = require('express');
const bodyParser = require('body-parser');

const port = 300;
const router = require('./routes.js');

const app = express();
module.exports.app = app;

app.set('port', port);

app.use(bodyParser.json());

app.use('/qa', router);

if (!module.parent) {
  app.listen(app.get('port'), () =>
    console.log('Project Greenfield listening on', app.get('port'))
  );
}
