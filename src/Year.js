import React from 'react'
import classNames from 'classnames'
import { func, number, bool } from 'prop-types'

export const Year = (props) => (
  <div
    className={classNames('nice-dates-navigation-submenu-year-list-year', { '-selected': props.isSelectedYear })}
    onClick={props.onYearChange}
  >
    <span>{props.year}</span>
  </div>
)

Year.propTypes = {
  year: number,
  isSelectedYear: bool,
  onYearChange: func.isRequired
}
