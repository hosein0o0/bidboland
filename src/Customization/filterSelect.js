import React, { useEffect, useState } from 'react'
import handleString from '../handleString'
import Loading from '../layout/loading'

function FilterSelect (props) {
  const [list, setList] = useState([])
  useEffect(() => {
    let value = props.state[props.nameValue]
    let array = props.state[props.nameList]
    if (array) {
      if (value) {
        // props.handleState(`${props.nameValue}Check`, false)
        let filter = array.filter(
          data =>
            data.value.toUpperCase().includes(value.trim().toUpperCase()) ||
            data.value.toLowerCase().includes(value.trim().toLowerCase())
        )
        setList(filter)
      } else {
        setList(array)
      }
    }
  }, [props])
  function handleClick (item) {
    props.handleState('_open', '')
    props.handleState(`${props.nameValue}Check`, true)
    props.handleState(props.nameValue, item.value)
  }
  function handleShow () {
    if (props.state.loading === 'search') {
      return <Loading className='table row m-0 justify-content-center' />
    } else if (list.length === 0) {
      return (
        <div className='w-100 no-result'>
          <span>متاسفانه موردی یافت نشد</span>
        </div>
      )
    } else if (list) {
      return list.map((item, key) => (
        <div
          className='box-result-search-item pointer'
          key={key}
          onClick={() => handleClick(item)}
        >
          <span className='px-1 font-normal'>{handleString(item.label)}</span>
        </div>
      ))
    }
  }
  return <div className='box-result-search ltr'>{handleShow()}</div>
}
export default FilterSelect
