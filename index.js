const app = require('./config/app.js');
const path = require('./config/path.js');
const { promisify }  = require('util');
const { readdir } = require('fs');
const readdirAsync = promisify(readdir);

let OpenWeatherMap = require('./obj/OpenWeatherMap.js');
let Apixu = require('./obj/Apixu.js');


async function getImages(){
    return result = await readdirAsync(path.imagesPath);
}

let bgImages = getImages();

app.all('*', (req, res) => {
    
    if(!req.body.city) req.body.city = "São Paulo";

      let OpenWeatherMapPromise = OpenWeatherMap.getOpenWeatherMap(req.body.city);

    let ApixuPromise = Apixu.getApixu(req.body.city);

    Promise.all([OpenWeatherMapPromise, ApixuPromise, bgImages]).then((data)=>{
        res.render('index', { 
                     OpenWeatherMap : data[0],
            Apixu : data[1],
            bgImages : data[2]
        });
    });
   
});

app.listen('3000');

console.log(`ClimaHoje já está rodando, acesse seu ambiente local na porta 3000 (localhost:3000) :D`);