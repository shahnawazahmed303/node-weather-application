const request = require('request')

const geoCode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFuYXNhLTA0MDciLCJhIjoiY2wyNGo2Z3prMHo3czNjcnI5dzViNmt0dCJ9.fK2P8sakd76jhR-dcgXtoA&limit=1'
    
    request({url, json: true}, (error , {body} = {}) => {
        if (error) {
            callback('Unable to connect to location server' , undefined)
        } else if (body.features <= 0){
            callback('Unable to search for the address. Try again' , undefined)
        } else {
            callback(undefined , {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geoCode