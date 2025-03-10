import React from 'react'
function NotFoundTable (props) {
  return (
    <tr className={`empty-table col-12 ${props.className || ''}`}>
      <td className='empty-td'>هیچ سطری یافت نشد</td>
    </tr>
  )
}
export default NotFoundTable
