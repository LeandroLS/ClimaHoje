const ApixuURL = 'http://api.apixu.com/v1/current.json';
const ApixuKey = 'bb7a25ba9fc940aaa60183555182112';
const axios = require('axios');

module.exports = {
    getApixu(city) {
        return axios.get(`${ApixuURL}?key=${ApixuKey}&q=${encodeURI(city)},BR`)
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
    }
}