import React from 'react'
import classNames from 'classnames'
import { bool, string, func } from 'prop-types'

function Month({ name, onMonthChange, isSelectedMonth }) {
  return (
    <div
      className={classNames('nice-dates-navigation-submenu-months-grid-month', { '-selected': isSelectedMonth })}
      onClick={onMonthChange}
    >
      <span>{name}</span>
    </div>
  )
}

Month.propTypes = {
  name: string.isRequired,
  isSelectedMonth: bool.isRequired,
  onMonthChange: func.isRequired
}

export default Month
