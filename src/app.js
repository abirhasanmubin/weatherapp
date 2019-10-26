const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// All paths
const viewPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')

// Initiating Express app.
const app = express()
const port = process.env.PORT || 3000

// Setup handlebars engine and views
app.set('views', viewPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

// Setup static directory
app.use(express.static(publicPath))

// Routing
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abir Hasan Mubin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abir Hasan Mubin'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'If you need any help, Call 999.',
        name: 'Abir Hasan Mubin'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query);
    res.send({
        products: [],
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error,
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error,
                })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData,
                title: 'Weather',
                name: 'Abir Hasan Mubin'
            })
        })
    })

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Abir Hasan Mubin',
        error: 'Help article not found',
    })
})
app.get('/about/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Abir Hasan Mubin',
        error: 'About article not found',
    })
})
app.get('/weather/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Abir Hasan Mubin',
        error: 'Weather article not found',
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Abir Hasan Mubin',
        error: '404 not found',
    })
})


// Application Starting
app.listen(port, () => {
    console.log('Server is started on port ' + port);
})