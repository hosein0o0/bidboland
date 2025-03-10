import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import handleString from '../../handleString'
import moment from 'moment-jalaali'
import handleCheckText from '../../handleCheckText'
const Rejected = props => {
  const handleTime = (date) => {
    let result = ''
    if (handleCheckText(date)) {
      result = moment(date, 'YYYY-MM-DD HH:mm')
        .locale('fa')
        .format('HH:mm jYYYY/jMM/jDD')
    }
    return handleCheckText(result) ? `(${result})` : ''
  }
  function handleName() {
    let { firstName, lastName, state } = props.data
    const name_date = `${state}_at`
    let Fname = props.state[firstName],
      Lname = props.state[lastName],
      date = handleTime(props.state[name_date])
    let fullName = `${handleString(Fname)} ${handleString(Lname)} ${date}`
    return fullName
  }
  return (
    <div className='col-xl-6 col-lg-6 col-md-6 col-12 my-3' key={props._key}>
      <div className='item-sign-tsr'>
        <div className='title-password col-12 mt-3 mb-2 px-1'>
          <h2 className='IranSans_Bold'>{props.data.name}</h2>
          <div className='line'></div>
        </div>
        <div className='signed mt-3'>
          <span className='reject_text'>
            <CloseIcon />
            مورد تائید قرار نگرفت
          </span>
          <span key={props._key} className={`_nameSign _signed IranSans_Medium_FA`}>
            {handleName()}
          </span>
        </div>
      </div>
    </div>
  )
}
export default Rejected
