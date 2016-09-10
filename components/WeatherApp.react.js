var React = require('react');
var Weather = require('./Weather.react.js');
var ZipForm = require('./ZipForm.react.js');

module.exports = WeatherApp = React.createClass({
    getInitialState: function() {
        return { data: {} };
    },
    getWeatherByZip: function(zip) {
        var request = new XMLHttpRequest();
        request.open('GET', 'zip/' + zip, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                localStorage.setItem('id', data.id);
                this.setState({
                    data: data
                });
            }
        }.bind(this);

        request.send();
    },
    componentDidMount: function() {
        var request = new XMLHttpRequest();
        var id = localStorage.getItem('id');
        
        if (id) {
            request.open('GET', 'state/' + id, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var data = JSON.parse(request.responseText);
                    this.setState({
                        data: data.weather
                    });
                }
            }.bind(this);

            request.send();
        }
    },
    render: function() {
        return (
            <div>
                <ZipForm zip={this.state.data.zip} onZipSubmit={this.getWeatherByZip} />
                <Weather data={this.state.data} />
            </div>
        );
    }
});
