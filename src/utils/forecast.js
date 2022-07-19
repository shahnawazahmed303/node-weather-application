const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3c56b3febdfdcf344b7608e277e9c210&query='+ encodeURIComponent(longitude) +','+ encodeURIComponent(latitude)

    request({url, json: true} , (err , {body} = {}) => {
        if (err) {
            callback('Unable to connect to location server' , undefined)
        } else if (body.error){
            callback('Invalid coordinates, Try again!' , undefined)
        } else {
            callback(undefined, {
                weather_descriptions: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feels: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
    })
}



module.exports = forecast