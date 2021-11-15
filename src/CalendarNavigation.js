import React from 'react'
import { func, instanceOf, object } from 'prop-types'
import { format, getYear } from 'date-fns'
import { MonthGrid } from './MonthGrid'
import { YearList } from './YearList'

const getFormatPattern = (month) => {
  const startYear = getYear(new Date(0))
  const selectedYear = getYear(month)
  if (selectedYear < startYear) return 'LLLL'
  return 'LLLL yyyy'
}

const CalendarNavigation = ({ locale, month, minimumDate, maximumDate, onMonthChange }) => (
  <div className='nice-dates-navigation'>
    <span
      className='nice-dates-navigation_current'
    >
      {format(month, getFormatPattern(month), { locale })}
    </span>

    <div className='nice-dates-navigation-submenu'>
      <MonthGrid
        locale={locale}
        month={month}
        onMonthChange={onMonthChange}/>
      <YearList
        month={month}
        onYearChange={onMonthChange}
      />
    </div>
  </div>
)

export default CalendarNavigation

CalendarNavigation.propTypes = {
  locale: object.isRequired,
  month: instanceOf(Date).isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onMonthChange: func.isRequired
}
