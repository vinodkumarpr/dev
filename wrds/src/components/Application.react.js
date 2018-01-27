var React = require('react');
var Word = require("../words/word.js")
var words = require("../words/words.js")
var FilterEdit = require('./FilterEdit.react');
var WordList = require('./WordList.react');
var DisplayWord = require('./DisplayWord.react');

var Application = React.createClass({
    getInitialState: function () {
        return {
            collectionWords: [],
            filteredWords: [],
            filter: "",
            selectedWord: null,
            display: "word"
        };
    },
    applyFilter: function (filter) {
        var newFilter = filter.toLowerCase();
        if (newFilter === this.state.filter) {
            return;
        }
        var filteredWords = this.filterWords(this.state.collectionWords, newFilter);
        this.setState({
            filteredWords: filteredWords,
            filter: newFilter
        });
    },
    filterWords: function (list, filter) {
        var filteredList = list.filter((word) => {
            return (word.word().startsWith(filter));
        })
        return filteredList;
    },
    onWordSelected: function (word) {
        if (word != this.state.selectedWord) {
            var selectedWord = this.state.filteredWords.find((item) => {
                return (word == item.word());
            });
            this.setState({
                selectedWord: selectedWord,
                display: "word"
            });
        }
    },
    launchQuiz:function () {
        this.setState({
            display: "quiz"
        });
    },
    componentWillMount: function () {
        var wordlist = words.getWordList();
        this.setState({
            collectionWords: wordlist,
            filteredWords: wordlist
        });
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        var changed = !(this.state.filteredWords === nextState.fiteredWords);
        changed = (changed || !(this.state.selectedWord === nextState.selectedWord));
        changed = (changed || this.state.display != nextState.display);
        return changed;
    },
    render: function () {
        var rightDisplay;
        if (this.state.display == "quiz") {
            rightDisplay = this.state.selectedWord ? this.state.selectedWord.word() : "Quiz...";
        } else {
            rightDisplay = <DisplayWord word={this.state.selectedWord} />
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4" style={{ backgroundColor: '#f0f0f0', margin: 10, height: 'calc(100vh - 20px)', overflowY: 'scroll' }}>
                        <FilterEdit onApplyFilter={this.applyFilter} onQuizLaunch={this.launchQuiz} />
                        <WordList words={this.state.filteredWords} onItemClick={this.onWordSelected} selectedWord={this.state.selectedWord} />
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