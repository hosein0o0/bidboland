import React, { useRef, useEffect } from 'react'
import handleString from '../handleString'
import AdvanceSearch from '../Customization/advancedSearch'
const ItemHeader = props => {
  let data = props.data || {}
  let index = props._key
  let { open_header } = props.state
  const { value } = data
  let name_state = `${value}_sort`
  const Elm = useRef()
  useEffect(() => {
    handleRefs()
  }, [])
  function handleRefs() {
    let name = `_header_${index}`
    props.handleRefs(name, Elm.current)
  }
  function handleClick() {
    props.handleState({
      loading: 'advance'
    })
    props._handleClick(index, data)
  }
  // function handleSort() {
  // const { row } = props.state
  // props.handleState({
  // loading: 'table',
  // })
  // let check = props.state[name_state] ? true : false
  // alert(check)
  // let result_array = [...row].sort((a, b) =>
  // a[value] > b[value] ? 1 : -1,
  // );
  // props.handleState({
  // loading: '',
  // row: result_array,
  // [name_state]: !check
  // })
  // }
  const class_name = () => `${props.handleFilter(data.name)} ${handleString(data.class_name)}`
  return (
    <th key={index} className={class_name().trim()} ref={Elm}>
      <span className='head-click'>
        <span onClick={handleClick}>
          {handleString(data.name)}
        </span>
        <span className='filter d-inline-block'
        // onClick={handleSort}
        >
          <img src='img/Sort_Icon.svg' alt='filter' />
        </span>
      </span>
      {open_header === index && (
        <AdvanceSearch
          index={index}
          data={data}
          {...props}
          rtl={props.rtl ? true : false}
          handleSelect={(checked, name) =>
            props.handleState({ [name]: checked })
          }
          bigSearch={true}
        />
      )}
    </th>
  )
}
export default ItemHeader
