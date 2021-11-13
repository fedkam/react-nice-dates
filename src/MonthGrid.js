import React from 'react'
import { func, instanceOf, object } from 'prop-types'
import {
  set, getMonth, format, isDate
} from 'date-fns'
import { Month } from './Month'

/** Генерация массива объектов { nameMonth,onChange }
 * @param {Date} currentMonth - The date
 * @param {function} onMonthChange - The func
 */
function generateMountList(currentMonth, onMonthChange, locale) {
  const monthList = []
  if (isDate(currentMonth)) {
    for (let numberMonth = 0; numberMonth < 12; numberMonth++) {
      const setMonth = set(currentMonth, { month: numberMonth })
      const nameSetMonth = format(setMonth, 'MMM', { locale: locale }).replace('.', '')
      monthList.push({
        name: nameSetMonth,
        number: numberMonth,
        onMonthChange: () => onMonthChange(setMonth)
      })
    }
    return monthList
  }
}

export const MonthGrid = ({ locale, month, onMonthChange }) => {
  const monthList = generateMountList(month, onMonthChange, locale)

  return (
    <div className='nice-dates-navigation-submenu-months-grid'>
      { monthList && monthList.length && monthList.map((el) => {
        const isSelectedMonth = getMonth(month) === el.number
        return (
          <Month
            key={`${el.name}`}
            name={el.name}
            isSelectedMonth={isSelectedMonth}
            onMonthChange={el.onMonthChange}
          />
        )
      })}
    </div>
  )
}

MonthGrid.propTypes = {
  locale: object.isRequired,
  month: instanceOf(Date).isRequired,
  onMonthChange: func.isRequired
}
