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

const Scroller = (props) => {
  const [state, setState] = useState(setInitialState(props.settings))
  const viewportElement = React.createRef()

  useEffect(() => {
    viewportElement.current.scrollTop = state.initialPosition
    if (!state.initialPosition) {
      runScroller({ target: { scrollTop: 0 } })
    }
  }, [])

  const runScroller = ({ target: { scrollTop } }) => {
    const { totalHeight, toleranceHeight, bufferedItems, settings: { minIndex, itemHeight } } = state
    const index = minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight)
    const data = props.get(index, bufferedItems)
    const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0)
    const bottomPaddingHeight = Math.max(totalHeight - topPaddingHeight - data.length * itemHeight, 0)

    setState((prevState) => ({
      ...prevState,
      topPaddingHeight,
      bottomPaddingHeight,
      data
    }))
  }

  const updateDate = () => {
    const scrollTop = viewportElement.current.scrollTop
    const { toleranceHeight, bufferedItems, settings: { minIndex, itemHeight } } = state
    const index = minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight)
    const data = props.get(index, bufferedItems)
    setState((prevState) => ({
      ...prevState,
      data
    }))
  }

  return (
    <div
      className={props.className}
      ref={viewportElement}
      onScroll={runScroller}
      onMouseEnter={updateDate}
      style={{ height: state.scrollerHeight }}
    >
      <div style={{ height: state.topPaddingHeight }}></div>
      {
        state.data.map(props.row)
      }
      <div style={{ height: state.bottomPaddingHeight }}></div>
    </div>
  )
}

export default Scroller

Scroller.propTypes = {
  className: string,
  get: func,
  settings: object,
  row: func
}
