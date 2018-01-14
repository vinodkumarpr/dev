var React = require('react');

var WordList = React.createClass({
    handleClick: function (word) {
        if (this.props.onItemClick) {
            this.props.onItemClick(word);
        }
    },
    render: function () {
        if (!this.props.words) {
            return <div className="container-fluid">
                <div className="row">
                    "Loading..."
                </div>
            </div>;
        }
        const listItems = this.props.words.map((word) => {
            if (this.props.selectedWord && word.word() == this.props.selectedWord.word()) {
                return (
                    <li className="list-group-item active" key={word.word()} onClick={this.handleClick.bind(this, word.word())}>{word.word()}</li>
                );
            }
            return (<li className="list-group-item" key={word.word()} onClick={this.handleClick.bind(this, word.word())}>{word.word()}</li>
            );
        });

        return (
            <ul className="list-group">{listItems}</ul>
        );
    }
});

module.exports = WordList;
