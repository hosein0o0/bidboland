import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
const ActionLineList = props => {
  let data = props.data || {}
  const handlePermision = props.Permision.handlePermision
  let { role } = props.state
  const checkPermision = handlePermision(role, 'line_list_edit')
  return (
    <td className='action justify-content-center'>
      {checkPermision && (
        <a href={`/edit-linelist-${data.id}`}>
          <span className='edit'>
            <EditIcon />
          </span>
        </a>
      )}
    </td>
  )
}
export default ActionLineList
