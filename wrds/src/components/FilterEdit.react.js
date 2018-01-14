var React = require('react');

var FilterEdit = React.createClass({
    handleOnChange: function(event){
        this.props.onApplyFilter(event.target.value);
    },
    render: function () {
        return (
            <div className="input-group" style={{margin: '10px'}}>
                <label className="control-label input-group-addon" htmlFor="filterInput">Search</label>
                <input className="form-control" id="filterInput" type="text" onChange={this.handleOnChange}/>
            </div>
        );
    }
});

module.exports = FilterEdit;
