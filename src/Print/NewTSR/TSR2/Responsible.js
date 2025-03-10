import React from 'react'
import ItemResponsible from './ItemResponsible'
const Responsible = props => {
  let list = props.data[props.value] || []
  let { UniqList } = props.API
  let uniq = UniqList(list) || []
  return (
    <div className='conti'>
      <span className='conti_span'>{props.label}</span>
      <table>
        <tbody>
          <tr className='hsss'>
            <th style={{ width: '10mm' }}>ردیف</th>
            <th style={{ width: '25mm' }}>گروه</th>
            <th style={{ width: '60mm' }}>نام و نام خانوادگی</th>
            <th style={{ width: '80mm' }}>سمت سازمانی</th>
          </tr>
          {uniq.map((data, key) => (
            <ItemResponsible {...props} dataItem={data} key={key} _key={key} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Responsible
