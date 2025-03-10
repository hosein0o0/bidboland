import React from 'react'
import handleString from '../../../handleString'
const InstructionNumber = props => {
  const {tsr1} = props.state
  const parentState =  tsr1 || {}
  const {tsr_no} = parentState
  return (
    <div className='conti m-0'>
      <table>
        <tbody>
          <tr className='hsss'>
            <td className='no_BT'>
              شماره دستورالعمل:
              <p className='d-inline-block mr-2'>
                {handleString(tsr_no)}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default InstructionNumber
