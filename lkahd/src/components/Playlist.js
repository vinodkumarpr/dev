import React from 'react';
import PropTypes from 'prop-types';

class Playlist extends React.Component {
    getPlaylist(playlists, date) {

        for (var playlist in playlists.playlists) {
            if (date.dateString == playlist) {
                console.log(playlists.playlists[playlist].id);
                return playlists.playlists[playlist];
            }
        }
        return null;
    }
    renderTable() {
        if (!this.props.date) {
            return null;
        }
        var playlist = this.getPlaylist(this.props.playlists, this.props.date);
        if (!this.props.playlists.playliststatus) {
            return null;
        }

        var table = (<div className="container-fluid">
            <div className="row"  >
                <div className="table-responsive">
                    <table className="table" style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th colSpan="5">{this.props.date.dateString}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Errors</td>
                                <td>{playlist.errors ? "true" : "false"}</td>
                            </tr>
                            <tr>
                                <td>Warnings</td>
                                <td>{playlist.warnings ? "true" : "false"}</td>
                            </tr>
                            <tr>
                                <td>Missing Assets</td>
                                <td>{playlist.missing_assets}</td>
                            </tr>
                            <tr>
                                <td>Missing Subtitles</td>
                                <td>{playlist.missing_subtitles}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);

        return table;
    }
    render() {
        console.log("Playlist : render");
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30
        };

        var playlist = this.renderTable();

        if (playlist) {
            return (
                <div style={backdropStyle}  >
                    <div style={modalStyle} >
                        {playlist}
                        <div className="footer">
                            <button onClick={this.props.onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            );                
        }
        return (
            <div style={backdropStyle}  >
                <div style={modalStyle} >
                    <div className="footer">
                        <button onClick={this.props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Playlist.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Playlist;