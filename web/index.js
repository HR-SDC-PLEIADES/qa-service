const express = require('express');
const bodyParser = require('body-parser');

const port = 3080;
const router = require('./routes.js');

const app = express();
module.exports.app = app;

app.set('port', port);

app.use(bodyParser.json());

app.use('/qa', router);

app.get('/loaderio-e1fd998d1918962783aa240d06b6d9c3', (req, res) => {
  res.sendFile('loaderio-verification.txt');
});

if (!module.parent) {
  app.listen(app.get('port'), () =>
    console.log('Project Greenfield listening on', app.get('port'))
  );
}
