import React from 'react'
import handleString from '../../../handleString'
import ItemCheckBox from './ItemCheckBox'
import moment from 'moment-jalaali'
import handleCheckText from '../../../handleCheckText'
const HeaderItem = props => {
  let { tsr_no, applicant_unit, subject , tsr1 } = props.state
  let data_1 = tsr1 || {}
  let firstName = handleString(data_1.author_firstName),
    lastName = handleString(data_1.author_lastName)
  let dataName = `technical_boss_${props.value}_verify_at`
  let convertDate
  let date = handleString(props.dataState[dataName])
  if (handleCheckText(date)) {
    let dataMoment = moment(date, 'YYYY/MM/DD hh:mm:ss')
    convertDate = dataMoment.locale('fa').format('jYYYY/jMM/jDD')
  }
  return (
    <div className='conti'>
      <table>
        <tbody>
          <tr className='hsss'>
            <td className='b' style={{ width: '64mm' }}>
              شماره /TSRنامه:
              <span className='value'>{` ${handleString(tsr_no)} `}</span>
            </td>
            <th style={{ verticalAlign: 'top', width: '70mm' }} rowSpan={2}>
              به: برنامه ريزي تعميرات
            </th>
            <td className='b' style={{ width: '64mm' }}>
              شماره:
              <span className='value'>{` ${handleString(tsr_no)} `}</span>
            </td>
          </tr>
          <tr className='hsss'>
            <td className='b' style={{ width: '64mm' }}>
              نام متقاضی:
              <span className='value'>
                {` ${handleString(firstName)} ${handleString(lastName)} `}
              </span>
            </td>
            <td className='b' style={{ width: '64mm' }}>
              تاريخ:
              <span className='value'>{` ${handleString(convertDate)} `}</span>
            </td>
          </tr>
          <tr className='hsss'>
            <td className='b'>
              واحد:
              <span className='value'>
                {` ${handleString(applicant_unit)} `}
              </span>
            </td>
            <ItemCheckBox {...props} />
          </tr>
          <tr className='hsss'>
            <td className='p1 b' colSpan={3}>
              موضوع :
              <p className='d-inline-block'>
                <span className='value mr-2 ml-2'>{` ${handleString(
                  subject
                )} `}</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default HeaderItem
