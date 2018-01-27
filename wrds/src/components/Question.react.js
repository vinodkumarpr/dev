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
            selected: "",
            elapsed: 0
        };
    },
    handleClick: function (option) {
        this.setState({
            selected: option
        });
    },
    tick: function(){
        if (this.state.elapsed == 30){
            return;
        }
        this.setState({
            elapsed: (this.state.elapsed + 1)
        });        
    },
    componentDidMount: function () {
        this.timer = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function(){
        clearInterval(this.timer);
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        var changed = (this.state.selected != nextState.selected);
        changed = changed || (this.state.elapsed != nextState.elapsed);
        return changed;
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
        var time = "";
        if (this.state.elapsed > 0){
            time = this.state.elapsed + "/30";
        }
        return (
            <div style={{ margin: '100px' }} >
                {question}
                <ul className="list-group list-group-flush" style={{ marginTop: '20px' }} >{options}</ul>
                <span>{time}</span>
            </div>
        );
    }
});

module.exports = Question;
