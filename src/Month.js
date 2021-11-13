import React from 'react'
import classNames from 'classnames'
import { bool, string, func } from 'prop-types'

export const Month = (props) => {
  const { name, onMonthChange, isSelectedMonth } = props
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
  name: string,
  isSelectedMonth: bool,
  onMonthChange: func.isRequired
}
