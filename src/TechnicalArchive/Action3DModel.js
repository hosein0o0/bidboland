import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
const Action3DModel = props => {
  let data = props.data || {}
  const handlePermision = props.Permision.handlePermision
  let { role } = props.state
  const checkPermision = handlePermision(role, '3d_model_edit')
  return (
    <td className='action justify-content-center'>
      {checkPermision && (
        <a href={`/edit-3DModel-${data.id}`}>
          <span className='edit'>
            <EditIcon />
          </span>
        </a>
      )}
    </td>
  )
}
export default Action3DModel
