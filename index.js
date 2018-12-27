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

const fs = require('fs');

const imagesPath = path.normalize(__dirname + '/source/public/images');

let OpenWeatherMap = require('./obj/OpenWeatherMap.js');
let Apixu = require('./obj/Apixu.js');
let HGWeather = require('./obj/HGWeather.js');

async function getImages(){
    let promise =  new Promise((fullfill, reject)=>{
        fs.readdir(imagesPath, (err, files) => {
            if(err){
                return reject(err);
            }else{
                return fullfill(files);
            }
        });
    });

    return result = await promise;
}

let bgImages = getImages();

app.all('*', (req, res) => {
    
    if(!req.body.city) req.body.city = "São Paulo";

    let HGWeatherPromise = HGWeather.getHGWeather(req.body.city);

    let OpenWeatherMapPromise = OpenWeatherMap.getOpenWeatherMap(req.body.city);

    let ApixuPromise = Apixu.getApixu(req.body.city);

    Promise.all([HGWeatherPromise, OpenWeatherMapPromise, ApixuPromise, bgImages]).then((data)=>{
        res.render('index', { 
            HGWeather : data[0], 
            OpenWeatherMap : data[1],
            Apixu : data[2],
            bgImages : data[3]
        });
    });
   
});

app.listen('3000');