import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters, Selections } from '../constants/constants'

const Footer = () => (
  <div>
    <span>Show: </span>
    <FilterLink filter={Selections.SELECT_ALL}>
      All
    </FilterLink>
    <FilterLink filter={Selections.SELECT_ACTIVE}>
      Active
    </FilterLink>
    <FilterLink filter={Selections.SELECT_COMPLETED}>
      Completed
    </FilterLink>
  </div>
)

export default Footer