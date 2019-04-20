var React = require('react');

var Selection = React.createClass({
    componentDidMount(){
        this.props.onLoaded();
    },
    render: function () {
        return (
          <div>
              { this.props.selection }
          </div>
            );
    }
});

module.exports = Selection;

