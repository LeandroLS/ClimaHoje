const express = require('express');

const app = express();

const path = require('path');

app.use(express.static(path.normalize(__dirname + '/source/public')));


const viewsPath = path.normalize(__dirname + '/source/views/');

app.set('views', viewsPath);

app.set('view engine', 'jade');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const axios = require('axios');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/teste', (req, res) => {
    console.log(req.body);
    axios.get(`https://api.hgbrasil.com/weather/?format=json&city_name=${encodeURI(req.body.city)}&key=948f7313`)
        .then((result)=> {
            res.json(result.data);
        }
    ).catch((erro) => {
        res.send('deu erro' + erro);
    });
});

app.listen('3000');