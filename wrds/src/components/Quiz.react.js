var React = require('react');
var Question = require('./Question.react');
var Questions = require("../words/questions.js")
var randomizer = require("../words/randomizer.js")

var Quiz = React.createClass({
    componentDidMount(){
        this.props.onQuizLoaded();
    },
    render: function () {
        return (
            <Question {...this.props} />
        );
    }
});

module.exports = Quiz;
