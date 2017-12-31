var React = require('react');
var Words = require('./Words.react');
var Collection = require('./Collection.react');

var Application = React.createClass({
    getInitialState: function () {
        return {
            collectionWords: {},
            selectedWord: null
        };
    },
    loadWordsCollection: function (words) {
        this.setState({
            collectionWords: words
        });
    },
    selectWord: function (word) {
        this.setState({
            selectedWord: word
        });
        console.error("selected word is " + word.text);
    },
    render: function () {
        var selectedWordSection;
        if (this.state.selectedWord) {
            selectedWordSection = (
                <div className="col-md-8">
                    Selected word is {this.state.selectedWord.text}.
            </div>);
        } else {
            selectedWordSection = (
                <div className="col-md-8">
                    No word is selected.
                </div>);
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4" text-center>
                        <Words onLoadsWordsCollection={this.loadWordsCollection} />
                        <Collection
                            words={this.state.collectionWords}
                            onSelectWord={this.selectWord}
                        />
                    </div>
                    {selectedWordSection}
                </div>
            </div>
        );
    }
});

// <Word word={this.selectedWord}/>

module.exports = Application;