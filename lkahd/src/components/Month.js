var React = require('react');
var moment = require('moment');
import Playlist from '../containers/Playlist';

var Month = React.createClass({
    onClick: function (e, date) {
        console.log("onClick " + date);
        this.props.onClick(date);
    },
    onPlaylistClose: function () {
        this.props.onClosePlaylist();
    },
    range: function (startDay) {
        var dates = [];
        var date = new moment(startDay).startOf('day');
        var startDate = new moment(this.props.startDate).startOf('day');
        var endDate = new moment(this.props.endDate).startOf('day');

        for (var i = 0; i < 35; i++) {
            var active = (date >= startDate && date <= endDate);
            dates.push({
                date: date.date(),
                dateString: date.format('YYYY-MM-DD'),
                currentMonth: this.props.startDate.month() == date.month(),
                active: active
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
    playlistPopup: function () {
        if (this.props.selectedDate && this.props.showPlaylistPopup) {
            return (<Playlist onClose={this.onPlaylistClose} show={true} date={this.props.selectedDate}>
            </Playlist>);
        }
        return null;
    },
    cell: function (date) {
        var td = null;
        if (date.active) {
            var status = this.playlistStatus(date.dateString);
            if (status) {
                if (status.errors) {
                    td = (<td style={{ 'background-color': "#FF0000" }}>
                        <div onClick={(e) => this.onClick(e, date)}>
                            <b> {date.date} </b>
                        </div>
                    </td>);
                } else if (status.warnings) {
                    td = (<td style={{ 'background-color': "#FFFF00" }}>
                        <div onClick={(e) => this.onClick(e, date)}>
                            <b> {date.date} </b>
                        </div>
                    </td>);
                } else {
                    td = (<td style={{ 'background-color': "#00FF00" }}>
                        <div onClick={(e) => this.onClick(e, date)}>
                            <b> {date.date} </b>
                        </div>
                    </td>);
                }
            } else {
                td = (<td style={{ 'background-color': "#FF00FF" }}>
                    <div>
                        <b> {date.date} </b>
                    </div>
                </td>);
            }
        }
        else if (date.currentMonth) {
            td = (<td> <b> {date.date} </b> </td>);
        } else {
            td = (<td> {date.date} </td>);
            //td = (<td><img src="smiley.gif" alt="Smiley face" width="10" height="10"/>{date.date}</td>);
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
        var playlist = this.playlistPopup();
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
                <div>
                    {playlist}
                </div>
            </div>
        );
    }
});

module.exports = Month;
