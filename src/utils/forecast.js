const request = require('request');

const forecast = (lat, long, callback) => {
   
    const url = `http://api.weatherstack.com/current?access_key=f8276d3690d4e456a3d95a8d94cc2de8&query=${lat},${long}`;

    request({ url, json: true }, (error, {body}) => {       
            if(error) {
                callback("Unable to connect to server.", undefined);
            } else if(body.error) {
                callback("Unable to find location. Try again with different location", undefined);
            } else {              
                const temp = body.current.temperature;
                const feelsLike = body.current.feelslike;
                const clouds = body.current.weather_descriptions[0];
                callback(undefined, 
                    `${clouds}. It is currently ${temp} degrees celcius and feels like ${feelsLike}.`
                )             
            };
        });
}

module.exports = forecast;