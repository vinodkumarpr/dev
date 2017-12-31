var React = require('react');
var WordListItem = require('./WordListItem.react');

var listStyle = {
    padding: '0'
};


var WordList = React.createClass({
    getListOfWords: function () {
        return Object.keys(this.props.words);
    },
    handleSelectWord: function(word){
        if (this.props.onSelectWord){
            this.props.onSelectWord(word);
        }
    },
    getWordElement: function (wordId) {
        var word = this.props.words[wordId];

        var wordElement;
        if (this.handleSelectWord) {
            wordElement = (
                <WordListItem
                    word={word}
                    onItemClick={this.handleSelectWord}
                    key={word.text}
                    />
            );
        } else {
            wordElement = <WordListItem word={word} key={word.text}/>;
        }
        return wordElement;
    },
    render: function () {
        var wordElements = this.getListOfWords().map(this.getWordElement);
        return (
            <ul style={listStyle}>
                {wordElements}
            </ul>
        );
    }
});

module.exports = WordList;