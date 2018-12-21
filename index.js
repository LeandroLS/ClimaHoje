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

app.post('/', (req, res) => {
    async function getData(){
        return axios.get(`${HGWeatherURL}?format=json&city_name=${encodeURI(req.body.city)}&key=${HGWeatherKey}`)
            .then((result) => {
                return {
                    HGWeather: {
                        success : true,
                        city : result.data.results.city,
                        temperature : result.data.results.temp
                    }
                }
            }
        ).catch((erro) => {
            return {
                HGWeather: {
                    success : false
                }
            }
        })
    };

    (async () => {
        let data = await getData();
        console.log(data);
    })()
   
});

app.listen('3000');

// ?q=Bahia,BR&appid=&units=Metric