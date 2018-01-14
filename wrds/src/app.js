var React = require('react');
var ReactDOM = require('react-dom');
var Application = require('./components/Application.react');
var words = require("./words/words")

ReactDOM.render(<Application/>, document.getElementById('react-application'));
