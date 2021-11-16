import React, { useState, useEffect } from 'react'
import { func, object, string } from 'prop-types'

const setInitialState = (settings) => {
  const { itemHeight, amount, tolerance, minIndex, maxIndex, startIndex } = settings
  const scrollerHeight = amount * itemHeight + 8
  const totalHeight = (maxIndex - minIndex + 1) * itemHeight
  const toleranceHeight = tolerance * itemHeight
  const bufferHeight = scrollerHeight + 2 * toleranceHeight
  const bufferedItems = amount + 2 * tolerance
  const itemsAbove = startIndex - tolerance - minIndex
  const topPaddingHeight = itemsAbove * itemHeight
  const bottomPaddingHeight = totalHeight - topPaddingHeight
  const initialPosition = topPaddingHeight + toleranceHeight
  return {
    settings,
    scrollerHeight,
    totalHeight,
    toleranceHeight,
    bufferHeight,
    bufferedItems,
    topPaddingHeight,
    bottomPaddingHeight,
    initialPosition,
    data: []
  }
}

/** Пересчет data, topPaddingHeight, bottomPaddingHeight
 * @param {{totalHeight:number, toleranceHeight:number, bufferedItems:number, settings:{minIndex:number, itemHeight:number}}} state
 * @param {number} scrollTop
 * @param {()=>void} generateData
 * @returns {{data:Date, topPaddingHeight:number,bottomPaddingHeight:number }
 */
function recalcVisibleScroll(state, scrollTop, generateData) {
  const { totalHeight, toleranceHeight, bufferedItems, settings: { minIndex, itemHeight } } = state

  const calcCurrentIndex = () => {
    return minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight)
  }

  const recalcPaddings = (index, data) => {
    const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0)
    const bottomPaddingHeight = Math.max(totalHeight - topPaddingHeight - data.length * itemHeight, 0)
    return { topPaddingHeight, bottomPaddingHeight }
  }

  const index = calcCurrentIndex()
  const data = generateData(index, bufferedItems)
  const { topPaddingHeight, bottomPaddingHeight } = recalcPaddings(index, data)

  return { data, topPaddingHeight, bottomPaddingHeight }
}

export default function Scroller(props) {
  const [state, setState] = useState(setInitialState(props.settings))
  const scrollerElement = React.createRef()

  useEffect(() => {
    scrollerElement.current.scrollTop = state.initialPosition
    if (!state.initialPosition) {
      runScroller({ target: { scrollTop: 0 } })
    }
  }, [])

  const runScroller = ({ target: { scrollTop } }) => {
    const { data, topPaddingHeight, bottomPaddingHeight } = recalcVisibleScroll(state, scrollTop, props.generateData)
    setState((prevState) => ({
      ...prevState,
      topPaddingHeight,
      bottomPaddingHeight,
      data
    }))
  }

  const updateDate = () => {
    const scrollTop = scrollerElement.current.scrollTop
    const { data } = recalcVisibleScroll(state, scrollTop, props.generateData)
    setState((prevState) => ({
      ...prevState,
      data
    }))
  }

  return (
    <div
      className={props.className}
      ref={scrollerElement}
      onScroll={runScroller}
      onMouseEnter={updateDate}
      style={{ height: state.scrollerHeight }}
    >
      <div style={{ height: state.topPaddingHeight }}/>
      { state.data.map(props.templateRow) }
      <div style={{ height: state.bottomPaddingHeight }}/>
    </div>
  )
}

Scroller.propTypes = {
  className: string.isRequired,
  generateData: func.isRequired,
  settings: object.isRequired,
  templateRow: func.isRequired
}
