const express = require('express');
const app = express();

const path = require('path');

app.use(express.static(path.normalize(__dirname + '/source/public')));

const viewsPath = path.normalize(__dirname + '/source/views/');

app.set('views', viewsPath);
app.set('view engine', 'jade');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen('3000');