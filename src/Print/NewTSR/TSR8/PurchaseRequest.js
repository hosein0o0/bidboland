import React from 'react'
const PurchaseRequest = props => {
  const { value } = props.dataSend
  // let { purchase_request } = props.data
  const data = props.data
  let list = data[`${value}_purchase_request`] || []
  const { handleClassName
    // , PRCheck
  } = props.API
  // const check_show = PRCheck(value)
  // if (check_show) {
  // } else return ''
  return (
    <div className='conti'>
      <span className='conti_span'>درخواست‌های خرید</span>
      <table>
        <tbody>
          <tr className='hss'>
            <th style={{ width: '7mm' }}>رديف</th>
            <th style={{ width: '28mm' }}>شماره تقاضا</th>
            <th style={{ width: '62mm' }}>خلاصه شرح </th>
            <th style={{ width: '36mm' }}>تاريخ تامين كالا</th>
          </tr>
          {list.map((data, key) => (
            <tr className='hsss' key={key}>
              <td className='text-center'>{key + 1}</td>
              <td className={handleClassName(data.number)}>{data.number}</td>
              <td className={handleClassName(data.description)}>
                {data.description}
              </td>
              <td className={handleClassName(data.date)}>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default PurchaseRequest
