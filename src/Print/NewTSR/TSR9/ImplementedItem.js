import React from 'react'
import handleString from '../../../handleString'
const ImplementedItem = props => {
  const dataItem = props.dataItem
  const {
    // group,
    // instructionNumber,
    // dateIssuanceInstructions,
    wo,
    wODate,
    startDate,
    endDate
  } = dataItem
  const { tsr_no } = props.state
  const {handleEndDate} = props.API
  const end_date = handleEndDate()
  return (
    <tr className='hsss'>
      <td className='text-center'> {props.index + 1}</td>
      <td className='text-center'>{handleString(props.name)}</td>
      <td className='text-center'>{handleString(tsr_no)}</td>
      <td className='text-center'>{handleString(end_date)}</td>
      <td className='text-center'>{handleString(wo)}</td>
      <td className='text-center'>{handleString(wODate)}</td>
      <td className='text-center'>{handleString(startDate)}</td>
      <td className='text-center'>{handleString(endDate)}</td>
    </tr>
  )
}
export default ImplementedItem
