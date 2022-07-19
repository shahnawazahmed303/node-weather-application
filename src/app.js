const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/Partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// Setup routes
app.get('' , (req , res) => {
    res.render('index' , {
        title: 'weather',
        name: 'Shah Nawaz Ahmed'
    })
})

app.get('/about' , (req , res) => {
    res.render('about' , {
        title: 'about',
        name: 'Shah Nawaz Ahmed'
    })
})

app.get('/help' , (req , res) => {
    res.render('help' , {
        title:'help',
        message: 'This is a page for you help',
        name: 'Shah Nawaz Ahmed'
    })
})

app.get('/weather' , (req , res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'No address provided!!!'
        })
    }
        geoCode(req.query.address, (error , {latitude, longitude, location} = {}) => {
            
            if (error) {
                return res.send({error})
            }
            
            forecast(latitude , longitude , (err , {weather_descriptions, temperature, feels, humidity} = {}) => {
                if (error) {
                    return res.send({error})
                }
                
                res.send({
                    forecast: weather_descriptions +'. It is currently ' + temperature+ ' degress out, but feels like '+ feels + ' and humidity is ' + humidity,
                    location,
                    address: req.query.address
                })
        })
        })    
})

app.get('/help/*' , (req , res) => {
    res.render('error' , {
        title: 'My 404 error',
        errMsg: 'Help article not found!',
        name: 'Shah Nawaz Ahmed'
    })
})

app.get('*' , (req , res) => {
    res.render('error' , {
        title: 'My 404 error',
        errMsg: 'Page not found!',
        name: 'Shah Nawaz Ahmed'
    })
})

app.listen(port , () => {
    console.log('server is up and running on port '+ port)
})