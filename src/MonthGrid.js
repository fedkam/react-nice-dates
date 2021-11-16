import React from 'react'
import { func, instanceOf, object } from 'prop-types'
import {
  set, getMonth, format, isDate
} from 'date-fns'
import Month from './Month'

/** Генерация массива объектов { nameMonth,onChange }
 * @param {Date} currentMonth
 * @param {function} onDateChange
 * @param {object} locale
 */
function generateMountList(currentMonth, onDateChange, locale) {
  const monthList = []
  if (isDate(currentMonth)) {
    for (let numberMonth = 0; numberMonth < 12; numberMonth++) {
      const setMonth = set(currentMonth, { month: numberMonth })
      const nameSetMonth = format(setMonth, 'MMM', { locale: locale }).replace('.', '')
      monthList.push({
        name: nameSetMonth,
        number: numberMonth,
        onMonthChange: () => onDateChange(setMonth)
      })
    }
    return monthList
  }
}

function MonthGrid({ locale, date, onDateChange }) {
  const monthList = generateMountList(date, onDateChange, locale)
  return (
    <div className='nice-dates-navigation-submenu-months-grid'>
      { monthList && monthList.length && monthList.map((month) => {
        const isSelectedMonth = getMonth(date) === month.number
        return (
          <Month
            key={`${month.name}`}
            name={month.name}
            isSelectedMonth={isSelectedMonth}
            onMonthChange={month.onMonthChange}
          />
        )
      })}
    </div>
  )
}

MonthGrid.propTypes = {
  locale: object.isRequired,
  date: instanceOf(Date).isRequired,
  onDateChange: func.isRequired
}

export default MonthGrid
