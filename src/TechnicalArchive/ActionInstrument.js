import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
const ActionISO = props => {
  let data = props.data || {}
  const handlePermision = props.Permision.handlePermision
  let { role } = props.state
  const checkPermision = handlePermision(role, 'instrument_edit')
  return (
    <td className='action justify-content-center'>
      {checkPermision && (
        <a href={`/edit-instrument-${data.id}`}>
          <span className='edit'>
            <EditIcon />
          </span>
        </a>
      )}
    </td>
  )
}
export default ActionISO
