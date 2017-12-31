var React = require('react');
var WordList = require('./WordList.react');
var Header = require('./Header.react');

var Collection = React.createClass({
    getListOfWords: function () {
        return Object.keys(this.props.words);
    },
    getNumberOfWordsInCollection: function () {
        return this.getListOfWords().length;
    },
    render: function () {
        var numberOfWordsInCollection = this.getNumberOfWordsInCollection();
        if (numberOfWordsInCollection > 0) {
            var words = this.props.words;
            return (
                <div>
                    <WordList
                        words={words}
                        onSelectWord={this.props.onSelectWord}
                    />
                </div>
            );
        }
        return <Header text="There are no words." />;
    }
});

module.exports = Collection;