var React = require('react');

var itemTextStyle = {
    "fontFamily": "Times New Roman, sans-serif"
};

var FilterEdit = React.createClass({
    handleOnChange: function (event) {
        this.props.onApplyFilter(event.target.value);
    },
    handleOnQuizBtnClicked: function() {
        this.props.onQuizLaunch();
    },
    render: function () {
        return (
            <div className="container-fluid">
                <div class="col-lg-6">
                    <div className="input-group" style={{ margin: '20px' }}>
                        <label className="control-label input-group-addon" htmlFor="filterInput" style={itemTextStyle}>Search</label>
                        <input className="form-control" id="filterInput" type="text" onChange={this.handleOnChange} />
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-primary" onClick={this.handleOnQuizBtnClicked}>Quiz</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FilterEdit;
