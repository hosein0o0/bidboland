import React from 'react'
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded'
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded'
import ReplyAllRoundedIcon from '@material-ui/icons/ReplyAllRounded'
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded'
import PrintRoundedIcon from '@material-ui/icons/PrintRounded'
const HeaderContentInbox = props => {
  return (
    <div className='header-content-email'>
      <div className='row mx-0'>
        <span className='icon pointer'>
          <ReplyRoundedIcon />
        </span>
        <span className='icon pointer'>
          <ReplyAllRoundedIcon className='_forward' />
        </span>
        <span className='icon pointer'>
          <ArchiveRoundedIcon />
        </span>
        <span className='icon pointer'>
          <LocalOfferRoundedIcon />
        </span>
        <span className='icon pointer'>
          <AttachFileRoundedIcon className='_attach' />
        </span>
        <span className='icon pointer'>
          <PrintRoundedIcon />
        </span>
      </div>
    </div>
  )
}
export default HeaderContentInbox
