import React from 'react'
import VirtualScroller from './VirtualScroller'
import {
  getYear,
  set
} from 'date-fns'
import { func, instanceOf } from 'prop-types'
import { Year } from './Year'

export const YearList = (props) => {
  const { month, onYearChange } = props

  const SETTINGS = {
    itemHeight: 24,
    amount: 5,
    tolerance: 2,
    minIndex: getYear(new Date(0)),
    maxIndex: getYear(month) + 1000,
    startIndex: getYear(month) - 2
  }

  function getYearList(offset, limit) {
    const data = []
    const start = Math.max(SETTINGS.minIndex, offset)
    const end = Math.min(offset + limit - 1, SETTINGS.maxIndex)

    if (start <= end) {
      for (let i = start; i <= end; i++) {
        data.push(
          {
            year: i,
            onYearChange: () => onYearChange(set(month, { year: i }))
          }
        )
      }
    }
    return data
  }

  const YearTemplate = (item) => {
    const isSelectedYear = getYear(month) === item.year
    return (
      <Year
        key={`${item.year}`}
        year={item.year}
        isSelectedYear={isSelectedYear}
        onYearChange={item.onYearChange}
      />
    )
  }

  return (
    <VirtualScroller
      className="nice-dates-navigation-submenu-year-list"
      get={getYearList}
      settings={SETTINGS}
      row={YearTemplate}
    />
  )
}

YearList.propTypes = {
  month: instanceOf(Date).isRequired,
  onYearChange: func.isRequired
}
