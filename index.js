const app = require('./config/app.js');
const path = require('./config/path.js');
const fs = require('fs');

let OpenWeatherMap = require('./obj/OpenWeatherMap.js');
let Apixu = require('./obj/Apixu.js');
let HGWeather = require('./obj/HGWeather.js');

async function getImages(){
    let promise =  new Promise((fullfill, reject)=>{
        fs.readdir(path.imagesPath, (err, files) => {
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

console.log(`ClimaHoje já está rodando, acesse seu ambiente local na porta 3000 (localhost:3000) :D`);