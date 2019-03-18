const parser = require('body-parser');
const express = require('express');
const path = require('path');
const db = require('../database/index.js');
const port = 3000;
let app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../../dist'));
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {

  res.end();
});

app.get('/stats', (req, res) => {
  db.getStats('someone', (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).end();
      return;
    }
    res.send(data);
  });
});

app.get('/load/:user', (req, res) => {
  const user = req.params.user;
  console.log(user)
  db.getStats(user, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).end();
      return;
    }
    data === null ? res.send(['empty']) : res.send(data);
  });});

app.post('/stats', (req, res) => {
  db.saveStats('someone', req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).end();
      return;
    }
    res.status(201).end();
  });
});

app.listen(port, () => console.log(`sever is listening on port ${port}!`));