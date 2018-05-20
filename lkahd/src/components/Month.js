var React = require('react');
var moment = require('moment');

var Month = React.createClass({
    range: function (startDay) {
        var dates = [];
        var date = new moment(startDay).startOf('day');
        var startDate = new moment(this.props.startDate).startOf('day');
        var endDate = new moment(this.props.endDate).startOf('day');

        for (var i = 0; i < 35; i++) {
            var active = (date >= startDate && date <= endDate);
            dates.push({
                date: date.date(),
                dateString : date.format('YYYY-MM-DD'),
                currentMonth: this.props.startDate.month() == date.month(),
                active : active
            })
            date = date.add(1, 'day');
        }
        return dates;
    },
    playlistStatus: function (date) {
        if (this.props.playlists) {
            return this.props.playlists[date];
        }
        return null;
    },
    cell : function (date) {
        var td = null;
        if (date.active) {
            var status = this.playlistStatus(date.dateString);
            if (status) {
                if (status.errors) {
                    td = (<td style={{'background-color': "#FF0000"}}> <b><i> {date.date}</i> </b> </td>);
                } else if (status.warnings) {
                    td = (<td style={{'background-color': "#FFFF00"}}> <b><i> {date.date}</i> </b> </td>);
                } else {
                    td = (<td style={{'background-color': "#00FF00"}}> <b><i> {date.date}</i> </b> </td>);
                }
            } else {
                td = (<td style={{'background-color': "#FF00FF"}}> <b><i> {date.date}</i> </b> </td>);
            }
        }
        else if (date.currentMonth) {
            td = (<td> <b> {date.date} </b> </td>);
        } else {
            td = (<td> {date.date} </td>);
        }
        return td;
    },
    rows: function () {
        var firstDay = new moment(this.props.startDate);
        var firstDay = firstDay.startOf('month');
        var startDay = firstDay.startOf('week');

        var dates = this.range(startDay);

        var trs = [];
        var tds = [];

        for (var i = 0; i < 35; i++) {
            if (i != 0 && i % 7 == 0) {
                trs.push(<tr>{tds}</tr>);
                tds = [];
            }
            var td = this.cell(dates[i]);
            tds.push(td);
        }
        trs.push(<tr>{tds}</tr>);
        return trs;
    },
    render: function () {
        return (
            <div className="container-fluid">
                <div className="row"  >
                    <div className="table-responsive">
                        <table className="table" style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                <th colSpan="5">{this.props.startDate.format('MMM YYYY')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.rows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Month;
