import React from 'react'
import handleString from '../handleString'
const SecondReject = props => {
  const { _list } = props.state
  return (
    <table className='w-100 _table-popUp'>
      <thead>
        <tr className='_head-table_color'>
          <th className='px-1'>مسئول اقدام و پیگیری</th>
          <th className='px-1'>اقدام اصلاحی پیشنهادی</th>
        </tr>
      </thead>
      <tbody>
        {_list?.map((data, key) => (
          <tr key={key}>
            <td className='px-1'>{handleString(data.action)}</td>
            <td className='px-1'>{handleString(data.responsible)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default SecondReject
