var React = require('react');
var Header = require('./Header.react');

var words = {
    "words": [
        {
            "text": "abate",
            "DEF": {
                "text": "to lessen, subside, or diminish"
            }
        },
        {
            "text": "abdicate",
            "DEF": {
                "text": "to formally give up or renounce (power or responsibility)"
            }
        },
        {
            "text": "aberration",
            "DEF": {
                "text": "a deviation from the standard, typical, or customary way"
            }
        }
    ]
};

var Words = React.createClass({
    getInitialState: function () {
        return {
            filter: null
        }
    },
    componentDidMount: function () {
        var wordCollection = {};
        for (var item in words["words"]) {
            var word = words["words"][item];
            wordCollection[word.text] = word;
        }

        this.onLoadsWordsCollection(wordCollection);
    },
    componentWillUnmount: function () {

    },
    handleFilterChange: function (newFilter) {
        this.setState({
            filter: newFilter
        });
    },
    onLoadsWordsCollection: function (words) {
        if (this.props.onLoadsWordsCollection) {
            this.props.onLoadsWordsCollection(words);
        }
    },
    render: function () {
        var filter = this.state.filter;
        if (filter) {
            return (
                <Header text={filter} />
            );
        }
        return (
            <Header text="Displaying all words." />
        );
    }
});

module.exports = Words;