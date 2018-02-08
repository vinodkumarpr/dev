var React = require('react');
var Question = require('./Question.react');
var Questions = require("../words/questions.js")
var randomizer = require("../words/randomizer.js")
var words = require("../words/words.js")

var Quiz = React.createClass({
    componentWillMount: function () {
        var questions = this.loadQuestion();
        this.setState({
            questions: questions,
            currentQuestion: questions[0]
        });
    },
    loadQuestion: function(){
        var wordlist = words.getWordList();
        var numQuestions = wordlist.length < 50 ?  wordlist.length : 50;
        var list = randomizer.getRandomizedList(words.getWordList(), numQuestions);
        var questions = Questions.getQuestions(list, numQuestions);
        
        return questions;
    },
    render: function () {
        return (
            <Question question={this.state.currentQuestion} />
        );
    }
});

module.exports = Quiz;
