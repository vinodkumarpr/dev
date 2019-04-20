import React from 'react'
import FilterLink from '../containers/FilterLink'
import { Selections } from '../constants/constants'

const Footer = () => (
  <div>
    <div className="container-fluid">
      <div className="row" >
        <div className="col-md-1">
          <span className="pull-right">Show: </span>
        </div>
        <div className="col-md-3">
          <FilterLink selection={Selections.SELECT_ALL}>
            All
          </FilterLink>
          <FilterLink selection={Selections.SELECT_ACTIVE}>
            Active
          </FilterLink>
          <FilterLink selection={Selections.SELECT_COMPLETED}>
            Completed
          </FilterLink>
        </div>
      </div>
    </div>
  </div>
)

export default Footer