var React = require('react');
import { NormalAnswerOption, PassedAnswerOption, FailedAnswerOption, CorrectAnswerOption, AnsweredAnswerOption } from './AnswerOption'

var questionTextStyle = {
    "fontFamily": "Times New Roman, sans-serif",
    "fontWeight": "bold",
    "fontSize": "20px"
};

var Question = React.createClass({
    handleClick: function (option) {
        this.props.onAnswerQuestion(option);
    },
    hanldleAnsweredClick: function () {
        window.alert("Already answered!!!")
    },
    renderQuestion: function (question) {
        return <div style={questionTextStyle}>{this.props.question.question}</div>;
    },
    renderAnsweredOptions: function (options) {
        var items = options.map((option) => {
            if (option === this.props.answer) {
                if (this.props.correctanswer === this.props.answer) {
                    return (<PassedAnswerOption option={option} onClick={this.hanldleAnsweredClick.bind(this, option)} />);
                } else {
                    return (<FailedAnswerOption option={option} onClick={this.hanldleAnsweredClick.bind(this, option)} />);
                }
            } else if (option === this.props.correctanswer) {
                return (<CorrectAnswerOption option={option} onClick={this.hanldleAnsweredClick.bind(this, option)} />);
            } else {
                return (<AnsweredAnswerOption option={option} onClick={this.hanldleAnsweredClick.bind(this, option)} />);
            }
        });
        return items;
    },
    renderOptions: function (options) {
        var items = options.map((option) => {
            return (<NormalAnswerOption option={option} onClick={this.handleClick.bind(this, option)} />);
        });
        return items;
    },
    render: function () {
        if (!this.props.question) {
            return <div />;
        }
        var question = this.renderQuestion(this.props.question);
        var options;
        if (this.props.answer) {
            options = this.renderAnsweredOptions(this.props.question.answer.options);
        } else {
            options = this.renderOptions(this.props.question.answer.options);
        }

        return (
            <div style={{ margin: '100px' }} >
                {question}
                <ul className="list-group list-group-flush" style={{ marginTop: '20px' }} >{options}</ul>
                <span>{this.props.remainingtime}</span>
            </div>
        );
    }
});

module.exports = Question;
