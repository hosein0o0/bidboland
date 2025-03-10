import React from 'react'
function RowItems(props) {
    return (
        <React.Fragment>
            <td className='__hasColor'>{props.name ? props.name : ''}</td>
            <td className='hasBorder'>{props.data.AllDocs}</td>
            <td className='hasBorder'>{props.data.NotIssued}</td>
            <td className='hasBorder'>{props.data.IssuedCount}</td>

            <td className='hasBorder'>{props.data.FIS.FA}</td>
            <td className='hasBorder'>{props.data.FIS.AFC}</td>
            {/* <td className='hasBorder'></td> */}
            <td className='hasBorder'>{props.data.FIS.AWC}</td>
            <td className='hasBorder'>{props.data.FIS.NoComment}</td>
            <td className='hasBorder'>{props.data.FIS.Commented}</td>
            <td className='hasBorder'>{props.data.FIS.NoResponse}</td>

            <td className='hasBorder'>{props.data.IFI.NoComment}</td>
            <td className='hasBorder'>{props.data.IFI.AWC}</td>
            <td className='hasBorder'>{props.data.IFI.Commented}</td>
            <td className='hasBorder'>{props.data.IFI.Reject}</td>
            <td className='hasBorder'>{props.data.IFI.NoResponse}</td>

            {/* <td className='hasBorder'></td> */}
            <td className='hasBorder'>{props.data.IFA.AP}</td>
            <td className='hasBorder'>{props.data.IFA.AWC}</td>
            <td className='hasBorder'>{props.data.IFA.Commented}</td>
            <td className='hasBorder'>{props.data.IFA.Reject}</td>
            <td className='hasBorder'>{props.data.IFA.NoResponse}</td>

            <td className='hasBorder'>{props.data.AFC.AFC}</td>
            <td className='hasBorder'>{props.data.AFC.NoResponse}</td>
        </React.Fragment>
    )
}
export default RowItems