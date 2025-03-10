import React from "react";
import VisibilityIcon from '@material-ui/icons/Visibility'
import PrintIcon from '@material-ui/icons/Print'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
const ActionArp = props => {
    const checkPermision = props.Permision.handlePermision
    const { role } = props.state
    const data = props.data || {}
    const key = props._key
    return (
        <td className='action justify-content-start' key={key}>
            {checkPermision(role, 'arp_show') && (
                <a className='mx-1' href={`arp-${data.id}`}>
                    <span className='edit'>
                        <VisibilityIcon />
                    </span>
                </a>
            )}
            {checkPermision(role, 'arp_print') && (
                <a className='mx-1' href={`/arp/print/${data.id}`} target='_blank' rel='noreferrer'>
                    <span className='edit'>
                        <PrintIcon />
                    </span>
                </a>
            )}
            {props.handlleCheckReport(data) &&
                <span className='more' onClick={() => props.handleReport(data.id)}>
                    <MoreVertRoundedIcon />
                </span>
            }
        </td>
    )
}
export default ActionArp