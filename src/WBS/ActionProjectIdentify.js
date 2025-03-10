import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
const ActionProjectIdentify = props => {
  let data = props.data || {}
  // const { handlePermision } = props.Permision
  // const { role } = props.state
  return (
    <td className='action justify-content-center'>
      <a href={`/project-identify-${data.id}`}>
        <span className='edit'>
          <EditIcon />
        </span>
      </a>
    </td>
  )
}
export default ActionProjectIdentify
