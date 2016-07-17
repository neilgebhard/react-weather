var JSX = require('node-jsx').install();
var React = require('react');
var http = require('http');
var config = require('./config');
var WeatherApp = React.createFactory(require('./components/WeatherApp.react'));
var WeatherModel = require('./models/Weather');

module.exports = {
    index: function(req, res) {
        var markup = React.renderToString(WeatherApp());
        res.render('home', { markup: markup });
    },
    state: function(req, res) {
        WeatherModel.getState(req.params.id, function(state) {
            res.send(state);
        });
    },
    zip: function(req, res) {
        var options = {
            host: 'api.openweathermap.org',
            path: '/data/2.5/weather?' +
                'zip=' + req.params.zip +
                '&APPID=' + config.openWeatherMap.apiKey +
                '&units=imperial',
            port: 80,
            method: 'GET'
        };

        var request = http.request(options, function(response) {
            var weather = "";

            response.on('data', function(data) {
                data = JSON.parse(data);
                if (data.cod == 200) {
                    weather = {
                        coord: data.coord,
                        city: data.name,
                        country: data.sys.country,
                        temp: data.main.temp,
                        temp_min: data.main.temp_min,
                        temp_max: data.main.temp_max,
                        pressure: data.main.pressure,
                        humidity: data.main.humidity,
                        main: data.weather[0].main,
                        description: data.weather[0].description,
                        sunrise: data.sys.sunrise,
                        sunset: data.sys.sunset,
                        wind: data.wind,
                        rain: data.rain,
                        clouds: data.clouds
                    };  
                }
            });

            response.on('end', function() {
                console.log(weather);
                var weatherModel = new WeatherModel({
                    weather: weather,
                    zip: req.params.zip
                });
                weatherModel.save(function(err, data) {
                    if (!err) {
                        weather.id = data._id;
                        res.send(weather);
                    }
                });
            });
        });

        request.on('error', function(e) {
            console.log('Problem with request: ' + e.message);
        });

        request.end();
    }
}
