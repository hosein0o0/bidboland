import React from 'react'
function SecondTotal(props) {
    return (
        <tr className='subfield'>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={6}>{props.sum.FIS}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={5}>{props.sum.IFI}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={5}>{props.sum.IFA}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={2}>{props.sum.AFC}</th>
        </tr>
    )
}
export default SecondTotal