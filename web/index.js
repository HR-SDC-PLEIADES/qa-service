const express = require('express');
const bodyParser = require('body-parser');

const port = 3080;
const router = require('./routes.js');

const app = express();
module.exports.app = app;

app.set('port', port);

app.use(bodyParser.json());

app.use('/qa', router);

app.get(`/${process.env.LOADERIO}`, (req, res) => {
  res.sendFile('loaderio-verification.txt');
});

if (!module.parent) {
  app.listen(app.get('port'), () =>
    console.log('Project Greenfield listening on', app.get('port'))
  );
}
