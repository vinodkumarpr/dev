var React = require('react');
import Month from '../containers/Month'

var Calendar = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        <div className="row"  >
          <div className="table-responsive">
            <table className="table" style= {{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>Sunday</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <Month date={this.props.startDate}/>
        </div>
      </div>
    );
  }
});

module.exports = Calendar;
