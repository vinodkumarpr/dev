var React = require('react');
var DisplayWord = require('./DisplayWord.react');
var Quiz = require('./Quiz.react');
import DisplayWordList from '../containers/DisplayWordList'

var Application = React.createClass({
    renderRight: function () {
        if (!this.props.display) {
            return <div />;
        }
        switch (this.props.display.type) {
            case "quiz":
                return <Quiz words={this.props.words}/>;
            case "word":
                return <DisplayWord word={this.props.display.word} />;
        }
    },
    render: function () {
        var rightDisplay = this.renderRight();
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4" style={{ backgroundColor: '#f0f0f0', margin: 10, height: 'calc(100vh - 20px)', overflowY: 'scroll' }}>
                        <DisplayWordList />
                    </div>
                    <div className="col-md-7" style={{ backgroundColor: '#f0f0f0', margin: 10, height: 'calc(100vh - 20px)' }}>
                        {rightDisplay}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Application;
