import React from 'react'
import { func, instanceOf, object } from 'prop-types'
import { getYear, format } from 'date-fns'
import { MonthGrid } from './MonthGrid'

export default function CalendarNavigation({ locale, month, minimumDate, maximumDate, onMonthChange }) {
  return (
    <div className='nice-dates-navigation'>
      <span className='nice-dates-navigation_current'>
        {format(month, getYear(month) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy', { locale })}
      </span>

      <div className='nice-dates-navigation-submenu'>
        <MonthGrid
          locale={locale}
          month={month}
          onMonthChange={onMonthChange}/>
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
