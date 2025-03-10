import React from 'react'
import CallRoundedIcon from '@material-ui/icons/CallRounded'
import EmailRoundedIcon from '@material-ui/icons/EmailRounded'
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded'
function UserProfile (props) {
  const detail = props.state.userSelected
  return (
    <div className='col-xl-3 col-lg-3 col-md-3 col-12'>
      <div className='user-profile'>
        <div className='title'>
          <h4 className='IranSans_Bold_FA'>پروفایل کاربری</h4>
        </div>
        <div className='user-detail'>
          <div className='avatar-user'>
            <img src={detail.avatar} alt='' />
          </div>
          <span className='name IranSans_Bold_FA'>{detail.name}</span>
          <span className='about'>{detail.about}</span>
        </div>
        <div className='user-info ltr'>
          <span className='icon-info IranSans_Bold_FA'>
            <CallRoundedIcon />
          </span>
          <span className='_text-info IranSans_Bold_FA'>
            <a className='_text-info IranSans_Bold_FA' href={`tel:${detail.phone}`}>{detail.phone}</a>
          </span>
        </div>
        <div className='user-info ltr'>
          <span className='icon-info IranSans_Bold_FA'>
            <EmailRoundedIcon />
          </span>
          <span className='_text-info IranSans_Bold_FA'>{detail.email}</span>
        </div>
        <div className='user-info ltr'>
          <span className='icon-info IranSans_Bold_FA'>
            <LocationOnRoundedIcon />
          </span>
          <span className='_text-info IranSans_Bold_FA'>{detail.location}</span>
        </div>
      </div>
    </div>
  )
}
export default UserProfile
