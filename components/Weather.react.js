var React = require('react');
var util = require('../utils/util');

module.exports = Weather = React.createClass({
    render: function() {
    	var weather = this.props.data;
        return (
        	<div className="weather center-align">
	            <div className="city">{weather.city}{weather.country ? ',' : ''} {weather.country}</div>
	            <div className="description">{ util.capitalizeFirstLetter(weather.description) }</div>
	            <div>
	            	<span className="temperature">{weather.temp}</span> 
	            	<span className="degree-symbol">{weather.temp ? String.fromCharCode(8457) : ''}</span>
	            </div>
	        </div>
        )
    }
});