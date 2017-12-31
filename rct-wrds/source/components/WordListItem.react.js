var React = require('react');
var Header = require('./Header.react');

var listItemStyle = {
    display: 'inline-block',
    listStyle: 'none'
};

var wordStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '300px',
    height: '40px',
    margin: '10px'
};

var WordListItem = React.createClass({
    propTypes: {
        word: function (properties, propertyName, componentName) {
            var word = properties[propertyName];
            if (!word) {
                return new Error('Word must be set.');
            }
            if (!word.text) {
                return new Error('Word must have text.');
            }
        },
        onItemClick: React.PropTypes.func
    },
    handleItemClick: function (item, e) {
        var word = this.props.word;
        var onItemClick = this.props.onItemClick;

        if (onItemClick) {
            onItemClick(word);
        }
    },
    render: function () {
        var word = this.props.word;
        var text = word.text;
        let boundItemClick = this.handleItemClick.bind(this, word);
        return (
            <li style={listItemStyle} key={word.text} onClick={boundItemClick}>
                <div style={wordStyle}>
                    <Header text={text} onClick={this.handleItemClick} />
                </div>
            </li>
        );
    }
});

module.exports = WordListItem;