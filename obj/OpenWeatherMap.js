const OpenWeatherMapURL = 'http://api.openweathermap.org/data/2.5/weather';
const OpenWeatherMapURLKey = '1d45b5f14ba9cbc264e3c2b018b6bdfd';

function getOpenWeatherMap(){
    return axios.get(`${OpenWeatherMapURL}?q=${encodeURI(req.body.city)},BR&appid=${OpenWeatherMapURLKey}&units=Metric`)
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
}