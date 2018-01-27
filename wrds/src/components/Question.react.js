var React = require('react');

var questionTextStyle = {
    "fontFamily": "Times New Roman, sans-serif",
    "fontWeight": "bold",
};

var optionsTextStyle = {
    "fontFamily": "Times New Roman, sans-serif",
    "fontWeight": "bold",
};

var Question = React.createClass({
    renderQuestion: function (question) {
        return <div style={questionTextStyle}>{this.props.question.question}</div>;
    },
    renderOptions: function (options) {
        console.log("options length " + options.length);
        var items = options.map((option) => <li className="list-group-item" style={optionsTextStyle}>{option}</li>);
        return items;
    },
    render: function () {
        if (!this.props.question) {
            return <div/>;
        }
        var question = this.renderQuestion(this.props.question);
        var options = this.renderOptions(this.props.question.answer.options);
        return (
            <div >
                {question}
                <ul className="list-group" style={{ margin: '20px' }} >{options}</ul>
            </div>
        );
    }
});

module.exports = Question;
