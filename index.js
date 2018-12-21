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

const HGWeatherURL = 'https://api.hgbrasil.com/weather/';
const HGWeatherKey = '948f7313';

const OpenWeatherMapURL = 'http://api.openweathermap.org/data/2.5/weather';
const OpenWeatherMapURLKey = '1d45b5f14ba9cbc264e3c2b018b6bdfd';

const ApixuURL = 'http://api.apixu.com/v1/current.json';
const ApixuKey = 'bb7a25ba9fc940aaa60183555182112';

app.post('/', (req, res) => {

    let HGWeather = axios.get(`${HGWeatherURL}?format=json&city_name=${encodeURI(req.body.city)}&key=${HGWeatherKey}`)
    .then((result) => {
            return {
                success : true,
                city : result.data.results.city,
                temperature : result.data.results.temp
            }
        }
    ).catch((erro) => {
        return {
            success : false
        }
    });

    let OpenWeatherMap = axios.get(`${OpenWeatherMapURL}?q=${encodeURI(req.body.city)},BR&appid=${OpenWeatherMapURLKey}&units=Metric`)
    .then((result) => {
            return  {
                success : true,
                city : result.data.name,
                temperature : result.data.main.temp
            }
        }
    ).catch((erro)=>{
        return {
            success: false
        }
    });

    let Apixu = axios.get(`${ApixuURL}?key=${ApixuKey}&q=${encodeURI(req.body.city)},BR`)
    .then((result) => {
        return {
            success : true,
            city : result.data.location.name,
            temperature : result.data.current.temp_c
        }
    }).catch((erro)=>{
        return { 
            success : false
        }
    });
   
    Promise.all([HGWeather, OpenWeatherMap, Apixu]).then((data)=>{
        res.render('index', { 
            HGWeather : data[0], 
            OpenWeatherMap : data[1],
            Apixu : data[2]
        });
    });
   
});

app.listen('3000');