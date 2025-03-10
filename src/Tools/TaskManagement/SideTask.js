import React, { useEffect, useState } from 'react'
const SideTask = props => {
  const [array, setArray] = useState([])
  const [select, setSelect] = useState('')
  useEffect(() => {
    setSelect(props.state._select)
    if (props.state.itemSide) {
      setArray(props.state.itemSide)
    }
  }, [props])
  function handleSelect (data) {
    props.handleState('_select', data.value)
  }
  return (
    <div className='col-3'>
      <div className='sideTask'>
        {array.map((data, key) => (
          <div
            className={`item-sideTask pointer ${data.value === select ? 'active' : ''}`}
            key={key}
            onClick={() => handleSelect(data)}
          >
            <span>
              {data.icon()}
              {data.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default SideTask
