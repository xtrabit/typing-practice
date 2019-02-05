const parser = require('body-parser');
const express = require('express');
const path = require('path');
const port = 3000;
let app = express();

app.use(express.static(__dirname + '/../../dist'));
app.use(express.static(__dirname + '/'));

// app.use(parser.json({ type: 'application/*+json' }));


app.get('/', function(req, res) {

  res.end()
});

app.listen(port, () => console.log(`sever is listening on port ${port}!`));