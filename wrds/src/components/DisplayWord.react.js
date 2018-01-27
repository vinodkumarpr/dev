var React = require('react');

var itemTextStyle = {
     "fontFamily": "Times New Roman, sans-serif" 
};

var titleTextStyle = {
    "fontFamily": "Times New Roman, sans-serif" ,
    "fontWeight": "bold",
    "background": "#ffff0"
}; 

var DisplayWord = React.createClass({
    formatText: function(text){
        text = text.replace("<", "0xFFFF");
        text = text.replace(">", "0xFEFE");
        text = text.replace("0xFFFF", " <strong> ");
        text = text.replace("0xFEFE", " </strong> ");
        return "<p>" + text + "</p>";
    },
    renderCollection: function (title, list) {
        var title = (<h4>{title}</h4>);
        var items = null;
        if (list.length > 0) {
            items = list.map((item) => {
                return <li style={itemTextStyle}><span dangerouslySetInnerHTML={{__html: this.formatText(item)}}></span></li>;
            });    
        } else {
            items = <li>None</li>;
        }

        return (<div>
            <div style={titleTextStyle}> <strong> {title} </strong> </div>
            <ul className="list-inline">
                {items}
            </ul>
        </div>);
    },
    render: function () {
        if (!this.props.word) {
            return <div className="container-fluid">
                <div className="row">
                </div>
            </div>;
        }
        var items = [];

        items.push(this.renderCollection("Definition", [this.props.word.definition()]));
        items.push(this.renderCollection("Synonym", this.props.word.synonyms()));
        items.push(this.renderCollection("Antonyms", this.props.word.antonyms()));
        items.push(this.renderCollection("Adjectives", this.props.word.adjectives()));
        items.push(this.renderCollection("Adverbs", this.props.word.adverbs()));
        items.push(this.renderCollection("Nouns", this.props.word.nouns()));
        items.push(this.renderCollection("Examples", this.props.word.examples()));

        const listItems = items.map((item) => {
            return item;
        });

        return (
            <ul className="list-group" style={{ margin: '20px' }} >{listItems}</ul>
        );
    }
});

module.exports = DisplayWord;
