var React = require('react');

module.exports = ZipForm = React.createClass({
    getInitialState: function() {
        return { zip: "" };
    },
    handleChange: function(e) {
        this.setState({ zip: e.target.value });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onZipSubmit(this.state.zip.trim());
    },
    componentDidMount: function(){
        React.findDOMNode(this.refs.zipInput).focus();
    },
    render: function() {
        return (
            <form className="zip-form" onSubmit={this.handleSubmit}>
                <div className="input-field">
                    <i className="material-icons prefix">location_on</i>
                    <input id="zip-input" className="validate" ref="zipInput" type="text" placeholder="Zip" value={this.state.zip} onChange={this.handleChange} autoComplete="off"/>
                </div>
            </form>
        )
    }
});
