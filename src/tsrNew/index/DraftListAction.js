import React from "react";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber'
import VisibilityIcon from '@material-ui/icons/Visibility'
import PrintIcon from '@material-ui/icons/Print'
const DraftListAction = props => {
    const checkPermision = props.Permision.handlePermision
    const { role } = props.state
    const data = props.data || {}
    const key = props._key
    return (
        <td className='action justify-content-end' key={key}>
            {props.CheckRejectConf(data) && (
                <span className='edit' onClick={() => props.handleState({ IdSelected: data.id })}>
                    <ConfirmationNumberIcon />
                </span>
            )}
            {checkPermision(role, 'tsr_show') && (
                <a className='mx-1' href={`new-tsr-${data.id}`}>
                    <span className='edit'>
                        <VisibilityIcon />
                    </span>
                </a>
            )}
            {checkPermision(role, 'tsr_print') && (
                <a className='mx-1' href={`/new-tsr/print/${data.id}`} target='_blank' rel='noreferrer'>
                    <span className='edit'>
                        <PrintIcon />
                    </span>
                </a>
            )}
        </td>
    )
}
export default DraftListAction