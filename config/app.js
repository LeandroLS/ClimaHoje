const path = require('./path.js');
const express = require('express');
const app = express();

app.use(express.static(path.path.normalize(__dirname + '/../source/public')));

app.set('views', path.viewsPath);

app.set('view engine', 'jade');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
