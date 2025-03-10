import React from 'react'
import handleString from '../../../handleString'
const Header = props => {
  let { tsr_no, created_at_date, subject } = props.state
  return (
    <table className='header_table'>
      <thead>
        <tr className='hsss'>
          <th className='p1' style={{ width: '50mm' }} rowSpan={3}>
            <img src='/refrence/img/tsr_img/bigi.jpg' alt='' />
          </th>
          <th style={{ width: '82mm', fontSize: '16px' , textAlign: 'center' }} rowSpan={3}>
            فرم درخواست خدمات فني <br />
            <br />
            (TSR) <br />
            TECHNICAL SERVICE REQUEST
          </th>
          <td className='b' style={{ width: '54mm' }}>
            <span className='value'> PGBGT-GE-FO-007</span>
          </td>
        </tr>
        <tr className='hsss'>
          <td className='b' style={{ width: '54mm' }}>
            شماره:
            <span className='value'>{` ${handleString(tsr_no)} `}</span>
          </td>
        </tr>
        <tr className='hsss'>
          <td className='b'>
            تاریخ :
            <span className='value'>{` ${handleString(
              created_at_date
            )} `}</span>
          </td>
        </tr>
        <tr className='hss'>
          <td className='p1 b f12' colSpan={3}>
            موضوع : <p className='d-inline-block'>{handleString(subject)}</p>
          </td>
        </tr>
      </thead>
    </table>
  )
}
export default Header
