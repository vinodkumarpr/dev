import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
var React = require('react');

var Selection = React.createClass({
    componentDidMount() {
        this.props.onLoaded();
    },
    handleStartDateChange(date) {
        this.props.onSetStartDate(date);
    },
    handleEndDateChange(date) {
        this.props.onSetEndDate(date);
    },
    render: function () {
        return (
            <div className="container-fluid">
                <div className="row" >
                    <div className="col-sm-2">
                        <span className="pull-right">Start Date</span>
                    </div>
                    <div className="col-sm-2">
                        <DatePicker
                            selected={this.props.startDate}
                            onChange={this.handleStartDateChange}
                        />
                    </div>
                </div>
                <div className="row">
                <br/>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <span className="pull-right">End Date</span>
                    </div>
                    <div className="col-sm-2">
                        <DatePicker
                            selected={this.props.endDate}
                            onChange={this.handleEndDateChange}
                        />
                    </div>
                </div>
                <div className="row">
                <br/>
                </div>
                <div className="row">
                    <div className="col-sm-1">
                    </div>
                    <div className="col-sm-1">
                    <button
                        onClick={this.props.onClick}
                        style={{
                            marginLeft: '4px',
                        }}
                        className="btn btn-primary"
                        >
                        Show
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Selection;
