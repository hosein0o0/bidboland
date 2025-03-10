import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
const ActionPFD = props => {
  let data = props.data || {}
  const handlePermision = props.Permision.handlePermision
  let { role } = props.state
  const checkPermision = handlePermision(role, 'pfd_edit')
  return (
    <td className='action justify-content-center'>
      {checkPermision && (
        <a href={`/edit-PFD-${data.id}`}>
          <span className='edit'>
            <EditIcon />
          </span>
        </a>
      )}
    </td>
  )
}
export default ActionPFD
