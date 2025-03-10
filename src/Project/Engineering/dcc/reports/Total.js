import React from 'react'
function Total(props) {
    return (
        <tr className='subfield'>
            <th className='__hasColor' rowSpan={3} colSpan={1}>Grand Total</th>
            <th className='__hasColor hasBorder' rowSpan={3} colSpan={1}>{props.sum.sumArchitectural}</th>
            <th className='__hasColor hasBorder' rowSpan={3} colSpan={1}>{props.sum.sumNotIssued}</th>
            <th className='__hasColor hasBorder' rowSpan={3} colSpan={1}>{props.sum.sumIssuedCount}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumFISFA}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumFISAFC}</th>
            {/* <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumFISAP}</th> */}
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumFISAWC}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumFISNoComment}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumFISCommented}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumFISNoResponse}</th>

            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumIFINoComment}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumIFIAWC}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumIFICommented}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumIFIReject}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumIFINoResponse}</th>

            {/* <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumIFAFA}</th> */}
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumIFAAP}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumIFAAWC}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumIFACommented}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumIFAReject}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumIFANoResponse}</th>

            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumAFCAFC}</th>
            <th className='__hasColor bottom hasBorder' rowSpan={1} colSpan={1}>{props.sum.sumAFCNoResponse}</th>
        </tr>
    )
}
export default Total