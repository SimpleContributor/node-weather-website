const request = require('request');

const weather = (coordsLat, coordsLon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5249ea276ef5fab7e9ffb4fb4e3229b1&query=' + coordsLat + ',' + coordsLon + '&units=f';

        request({ url, json: true }, (err, { body }) => {
            if(err) {
                callback('Unable to connect to weather service!', undefined)
            } else if(body.err) {
                callback('Unable to find location', undefined);
            } else {
                callback(undefined, {
                    Weather: body.current.weather_descriptions[0],
                    Temp: body.current.temperature,
                    FeelsLike: body.current.feelslike
                })
            }
        });  
}

module.exports = weather
