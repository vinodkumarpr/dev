import React from 'react'
import Footer from './Footer'
import DisplaySelection from '../containers/DisplaySelection'
import Calendar from '../containers/Calendar'

const App = () => (
  <div className="container-fluid">
    <div className="row" >
      <br />
    </div>
    <div className="row" >
      <div className="col-sm-5">
        <DisplaySelection />
      </div>
      <div className="col-sm-6">
        <Calendar/>
      </div>
    </div>
  </div>
)

export default App