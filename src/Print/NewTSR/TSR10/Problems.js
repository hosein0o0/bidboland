import React from 'react'
import ItemProblem from './ItemProblem'
const Problems = props => {
  const { handleMergeListProblem } = props.API
  const list = handleMergeListProblem()
  return (
    <div className='conti'>
      <span className='conti_span'>ليست مشکلات كار اجرا شده</span>
      <table>
        <tbody>
          <tr className='hss'>
            <th style={{ width: '7mm' }}>رديف</th>
            <th style={{ width: '64mm' }}>شرح اشکال</th>
            <th style={{ width: '30mm' }}>پیگیری کننده</th>
            <th style={{ width: '15mm' }}>مهلت اقدام</th>
            <th style={{ width: '15mm' }}>تائید کننده</th>
          </tr>
          {list.map((data, key) => (
            <ItemProblem dataSend={data || {}} index={key} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Problems
