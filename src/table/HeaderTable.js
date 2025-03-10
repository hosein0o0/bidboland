import React from 'react'
import handleCheckText from '../handleCheckText'
import ItemHeader from './ItemHeader'
const HeaderTable = props => {
  let list = props.state['header'] || []
  return (
    <thead>
      <tr className='header'>
        {list.map((data, index) => (
          <ItemHeader key={index} data={data} _key={index} {...props} />
        ))}
        {handleCheckText(props.action) && (
          <th className='action'>{props.action}</th>
        )}
      </tr>
    </thead>
  )
}
export default HeaderTable
