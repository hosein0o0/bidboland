import React from 'react'
import handleString from '../../../handleString'
const ItemResponsible = props => {
  return (
    <tr key={props._key}>
      <td className='text-center'>{props._key + 1}</td>
      <td className='text-center'>{props.dataItem.user_unit}</td>
      <td className='text-center'>{props.dataItem.label}</td>
      <td className='text-center'>{handleString(props.dataItem.user_role)}</td>
    </tr>
  )
}
export default ItemResponsible
