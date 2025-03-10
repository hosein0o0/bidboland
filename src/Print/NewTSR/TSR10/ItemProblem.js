import React from 'react'
import handleString from '../../../handleString'
const ItemProblem = props => {
  const data = props.dataSend || {}
  return (
    <tr className='hsss'>
      <td className='text-center'> {props.index + 1}</td>
      <td className='text-center'>{handleString(data.description)}</td>
      <td className='text-center'>{handleString(data.followUp)}</td>
      <td className='text-center'>{handleString(data.actionDate)}</td>
      <td className='text-center'>
        {handleString(data.confirmation) === 'true'
          ? 'تائید شده'
          : 'تائید نشده'}
      </td>
    </tr>
  )
}
export default ItemProblem
