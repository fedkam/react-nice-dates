import React from 'react'
import classNames from 'classnames'
import { func, number, bool } from 'prop-types'

function Year({ year, isSelectedYear, onYearChange }) {
  return (
    <div
      className={classNames('nice-dates-navigation-submenu-year-list-year', { '-selected': isSelectedYear })}
      onClick={onYearChange}
    >
      <span>{year}</span>
    </div>
  )
}

Year.propTypes = {
  year: number,
  isSelectedYear: bool,
  onYearChange: func.isRequired
}

export default Year
