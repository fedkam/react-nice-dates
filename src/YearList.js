import React from 'react'
import VirtualScroller from './VirtualScroller'
import {
  getYear, set
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
    maxIndex: checkYear(month) + 1000,
    startIndex: checkYear(month) - 2
  }

  /** Проверка даты на < 1970г.
   * @param {Date} selectedDate
   * @returns {number} year
   */
  function checkYear(selectedDate) {
    const startYear = getYear(new Date(0))
    const selectedYear = getYear(selectedDate)
    if (selectedYear < startYear) return startYear
    return selectedYear
  }

  /** Генерация массива объектов { year, onYearChange }
   * @param {number} offset
   * @param {number} limit
   * @returns {{year:number, onYearChange:()=>void}[]} массив объектов
   */
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
      templateRow={YearTemplate}
    />
  )
}

YearList.propTypes = {
  month: instanceOf(Date).isRequired,
  onYearChange: func.isRequired
}
