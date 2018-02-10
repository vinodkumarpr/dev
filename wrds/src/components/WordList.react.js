var React = require('react');

var itemTextStyle = {
    "fontFamily": "Times New Roman, sans-serif" 
};


var WordList = React.createClass({
    handleClick: function (word) {
        var onItemClick = this.props.onItemClick;
        if (onItemClick) {
            onItemClick(word);
        }
    },
    render: function () {
        return this.renderList(this.props.words, this.props.selectedWord);
    },
    renderList: function (words, selectedWord) {
        if (!words) {
            return <div className="container-fluid">
                <div className="row">
                    "Loading..."
                </div>
            </div>;
        }
        const listItems = words.map((word) => {
            if (selectedWord && word.word() == selectedWord.word()) {
                return (
                    <li className="list-group-item active" style={itemTextStyle} key={word.word()} onClick={this.handleClick.bind(this, word.word())}>{word.word()}</li>
                );
            }
            return (<li className="list-group-item" style={itemTextStyle} key={word.word()} onClick={this.handleClick.bind(this, word)}>{word.word()}</li>
            );
        });

        return (
            <ul className="list-group" style={{margin: '10px'}}>{listItems}</ul>
        );
    }
});

module.exports = WordList;
