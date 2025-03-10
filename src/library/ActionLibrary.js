import React from 'react'
import GetAppIcon from '@material-ui/icons/GetApp'
const ActionLibrary = props => {
  const { check_link, link_download } = props.data
  // standard_bank_download
  const {handlePermision} = props.Permision
  const {role} = props.state
  const check = handlePermision(role , 'standard_bank_download') && check_link
  return (
    <td className='action justify-content-center'>
      {check && (
        <a href={link_download} target='_blank' rel='noreferrer'>
          <span className='edit'>
            <GetAppIcon />
          </span>
        </a>
      )}
    </td>
  )
}
export default ActionLibrary
