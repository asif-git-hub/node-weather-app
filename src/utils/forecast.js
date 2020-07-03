const request = require('postman-request');


const forecast = (long, lat, callback) => {

    const forecast_url = 'http://api.weatherstack.com/current?access_key=b2529fd796cc5c5e2739ad16ac6ec727&query=' + 
        long + ',' + lat;

    request({
        url: forecast_url,
        json: true
    },
    (error, {body}) => {

        if (error) {
            callback('Unable to reach weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {

            const weather_desc = body.current.weather_descriptions[0]
            const humidity = body.current.humidity
            const current_temp = body.current.temperature
            const feels_like = body.current.feelslike

            callback(undefined, weather_desc + 
                '. It is ' + current_temp + ' degrees.' +
                ' It feels like ' + feels_like + ' degrees and the humidity is ' + humidity)

        }
    }
    )
    

}

module.exports = forecast



