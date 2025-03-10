import React from 'react'
import handleString from '../../../handleString'
import moment from 'moment-jalaali'
import handleCheckText from '../../../handleCheckText'
const InstructionsHead = props => {
  const { value, label } = props.dataSend
  const data = props.data
  const export_date = data[`${value}_export_date`]
  const check_date = handleCheckText(export_date)
  // const exporter_group = data[`${value}_exporter_group`]
  let date = handleString(export_date)
  let dataMoment = moment(date, 'YYYY/MM/DD hh:mm:ss')
  const convertDate = check_date ? dataMoment.locale('fa').format('jYYYY/jMM/jDD') : ''
  const state1 = handleCheckText(data[`${value}_instruction_description`])
  const state2 = data[`${value}_is_dispatch`] === '1'
  const check_text = state1 || state2
  return (
    <div className='mt-1'>
      <table>
        <tbody>
          <tr className='hsss_'>
            <td className='b'>
              گروه صادر كننده دستورالعمل:
              <span className='value'>{`${check_text ? handleString(label) : ''} `}</span>
            </td>
            <td className='b'>
              تاریخ صدور دستورالعمل:
              <span>{` ${handleString(convertDate)} `}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default InstructionsHead
