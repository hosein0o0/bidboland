import React from 'react'
import ImplementedItem from './ImplementedItem'
// import StaticList from '../../../tsrNew/TSR9/StaticList'
const Implemented = props => {
  //   const listTab = StaticList.listTab || []
  const { data, value } = props
  const { handleListImplemented } = props.API
  const list = handleListImplemented(value, data)
  const check_show = list.length > 0
  if (check_show) {
    return (
      <div className='conti'>
        <span className='conti_span'>دستورالعمل هاي مهندسی اجرا شده</span>
        <table>
          <tbody>
            <tr className='hss'>
              <th style={{ width: '7mm' }}>رديف</th>
              <th style={{ width: '17mm' }}>گروه</th>
              <th style={{ width: '17mm' }}>شماره دستورالعمل</th>
              <th style={{ width: '20mm' }}>تاریخ صدور دستورالعمل</th>
              <th style={{ width: '17mm' }}>شماره W.O</th>
              <th style={{ width: '17mm' }}>تاريخ صدور W.O</th>
              <th style={{ width: '17mm' }}>تاريخ شروع كار</th>
              <th style={{ width: '17mm' }}>تاريخ پايان كار</th>
            </tr>
            {list.map((item, index) => (
              <ImplementedItem
                dataItem={item || {}}
                {...props}
                key={index}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  } else return ''
}
export default Implemented
