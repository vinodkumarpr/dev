var React = require('react');

var questionTextStyle = {
    "fontFamily": "Times New Roman, sans-serif",
    "fontWeight": "bold",
    "fontSize": "20px"
};

var optionsTextStyle = {
    "fontFamily": "Times New Roman, sans-serif",
    "fontWeight": "bold",
    "fontSize": "20px"
};

var Question = React.createClass({
    getInitialState: function () {
        return {
            selected: ""
        };
    },
    handleClick: function (option) {
        this.setState({
            selected: option
        });
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return (this.state.selected != nextState.selected);
    },
    renderQuestion: function (question) {
        return <div style={questionTextStyle}>{this.props.question.question}</div>;
    },
    renderOptions: function (options) {
        console.log("options length " + options.length);
        var items = options.map((option) => {

            if (option == this.state.selected){
                return (
                    <li className="list-group-item list-group-item-action active"
                        key={option} onClick={this.handleClick.bind(this, option)}
                        style={optionsTextStyle}>{option}</li>)    
            } else {
                return (
                    <li className="list-group-item"
                        key={option} onClick={this.handleClick.bind(this, option)}
                        style={optionsTextStyle}>{option}</li>)    
            }
        })
            ;
        return items;
    },
    render: function () {
        if (!this.props.question) {
            return <div />;
        }
        var question = this.renderQuestion(this.props.question);
        var options = this.renderOptions(this.props.question.answer.options);
        return (
            <div style={{ margin: '100px' }} >
                {question}
                <ul className="list-group list-group-flush" style={{ marginTop: '20px' }} >{options}</ul>
            </div>
        );
    }
});

module.exports = Question;
