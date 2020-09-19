const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();

// Port for listening to Heroku or local
const port = process.env.PORT || 3000;

const partialsPath = path.join(__dirname, '../views/partials');

// This is absolutely necessary to use handlebars (hbs) in express
// Also, the folder that holds all the hbs files MUST BE named views
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// A custom folder name can be used by creating a new path
// const viewsPath = path.join(__dirname, '../CUSTOM_FILENAME')
// app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Caleb Coe',
        landingText: 'To use this app, enter any a location any way you want. You can enter a State, City, Zip Code/Postal Code, or address for the temperature in that area.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Caleb Coe',
        aboutMessage: 'This site was created by Caleb Coe. It uses data from mapbox.com and weatherstack.com.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Caleb Coe',
        helpMessage: 'If your app is not working be sure you are connected to the internet!'
    })
})


app.get('/weather', (req, res) => {
    let location = req.query.address;
    if(!location) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(location, (err, {latitude, longitude, location} = {}) => {
        if(err){
            return res.send({
                error: err
            })
        }

        // res.send({
        //     latitude: lat,
        //     longitude: lon,
        //     location: location
        // })

        weather(latitude, longitude, (err, weatherData) => {
            if(err){
                return res.send({
                    error: err
                })
            }

            res.send({
                location,
                weatherData: weatherData,
                address: location
            })
        })
    })


    
    // res.send({
    //     location: 'Where you at?',
    //     forecast: 'Looks sunny from here!',
    //     address: location
    // });
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('error404', {
        errorText: 'Help article not found',
        name: 'Cleebith',
        title: 'ERROR 404 Page, help extension '
    })
})


// ERROR 404 Page
app.get('*', (req, res) => {
    res.render('error404', {
        errorText: 'Page not found',
        name: 'Cleebith',
        title: 'ERROR 404 Page'
    })
})


app.listen(port, () => {
    console.log('Server is up on Port ' + port);
})
