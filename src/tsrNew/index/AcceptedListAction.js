import React from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility'
import PrintIcon from '@material-ui/icons/Print'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import UndoIcon from '@material-ui/icons/Undo'
import CloseIcon from '@material-ui/icons/Close'
const AcceptedListAction = props => {
  const checkPermision = props.Permision.handlePermision
  const { role } = props.state
  const data = props.data || {}
  const key = props._key
  return (
    <td className='action justify-content-start' key={key}>
      {checkPermision(role, 'tsr_show') && (
        <a className='mr-1 ml-1' href={`new-tsr-${data.id}`}>
          <span className='edit'>
            <VisibilityIcon />
          </span>
        </a>
      )}
      {checkPermision(role, 'tsr_print') && (
        <a className='mr-1 ml-1' href={`/new-tsr/print/${data.id}`}>
          <span className='edit'>
            <PrintIcon />
          </span>
        </a>
      )}
      <span
        className='edit'
        onClick={() => props.handleState({ determinant: true })}
      >
        <MoreHorizIcon />
      </span>
      {data.undo_verify && (
        <span
          className='edit position-relative'
          onClick={() =>
            props.handleState({
              id_undo: data.id
            })
          }
        >
          <UndoIcon />
        </span>
      )}
      {/* {data.rejected &&
        <span className='delete' onClick={() => props.handleState({ reject_id: data.id })}>
          <CloseIcon />
        </span>
      } */}
    </td>
  )
}
export default AcceptedListAction
