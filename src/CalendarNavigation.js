import React from 'react'
import { func, instanceOf, object } from 'prop-types'
import { format, getYear } from 'date-fns'
import MonthGrid from './MonthGrid'
import YearList from './YearList'

/** @param {Date} date */
const getFormatPattern = (date) => {
  const startYear = getYear(new Date(0))
  const selectedYear = getYear(date)
  if (selectedYear < startYear) return 'LLLL'
  return 'LLLL yyyy'
}

function CalendarNavigation({ locale, month, onMonthChange }) {
  const date = month // костыль: переопределение на более семантически подходящее имя
  const onDateChange = onMonthChange
  return (
    <div className='nice-dates-navigation'>
      <span
        className='nice-dates-navigation_current'
      >
        {format(date, getFormatPattern(date), { locale })}
      </span>

      <div className='nice-dates-navigation-submenu'>
        <MonthGrid
          locale={locale}
          date={date}
          onDateChange={onDateChange}/>
        <YearList
          date={date}
          onDateChange={onDateChange}
        />
      </div>
    </div>
  )
}

CalendarNavigation.propTypes = {
  locale: object.isRequired,
  month: instanceOf(Date).isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onMonthChange: func.isRequired
}

export default CalendarNavigation
