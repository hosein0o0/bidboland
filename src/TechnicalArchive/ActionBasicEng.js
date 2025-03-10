import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
const ActionBasicEng = props => {
  let data = props.data || {}
  return (
    <td className='action justify-content-center'>
      {props.Permision.handlePermision(props.state.role, 'basic_eng_edit') && (
        <a href={`/edit-basic-engineering-${data.id}`}>
          <span className='edit'>
            <EditIcon />
          </span>
        </a>
      )}
    </td>
  )
}
export default ActionBasicEng
