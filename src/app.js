const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Paths for Express config
const pub_dir = path.join(__dirname, '../public')
const views_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and location
app.set('view engine', 'hbs')
app.set('views', views_path)
hbs.registerPartials(partials_path)

// Setup static dir 
app.use(express.static(pub_dir))


app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Asif'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About me',
        name: 'Asif Alam'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help Page',
        name: 'Asif Alam'
    })
})

app.get('/weather', (request, response) => {
    
    if (!request.query.address) {
        return response.send({
            error: 'Address must be provided'
        })
    } else {
        geoCode(request.query.address, (error, {latitude, longitude, placeName} = {}) => {
            if (error) {
                return response.send({
                    error
                })
            }
        
            forecast(latitude,longitude, (error, forecast_data) => {
                if (error) {
                    return response.send({
                        error
                    })
                }
                response.send({
                    forecast: forecast_data,
                    address: placeName
                })
              })
        })
    }


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error_message: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Asif Alam',
        error_message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server started on port', port)
})