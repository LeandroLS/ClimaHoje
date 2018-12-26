const HGWeatherURL = 'https://api.hgbrasil.com/weather/';
const HGWeatherKey = '948f7313';
let axios = require('axios');

module.exports = {
    getHGWeather(city){
        return axios.get(`${HGWeatherURL}?format=json&city_name=${city}&key=${HGWeatherKey}`)
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
    }
}