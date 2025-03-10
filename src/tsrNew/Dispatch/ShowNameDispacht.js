import React from 'react'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import moment from 'moment-jalaali'
const ShowNameDispacht = props => {
  const { userDetail } = props
  function handleDate () {
    const date = userDetail?.date
    const date_1 = handleString(date),
      convert_date = handleCheckText(date_1)
        ? moment(date_1, 'YYYY-MM-DD hh:mm:ss')
            .locale('fa')
            .format(' HH:mm jYYYY/jMM/jDD ')
        : ''
    return handleCheckText(convert_date)
      ? `(${handleString(convert_date)})`
      : ''
  }
  const { name } = userDetail
  const checkName = handleCheckText(name)
  let myDate = handleDate()
  const check_date = handleCheckText(myDate)
  if (checkName) {
    return (
      <div className='w-100 row mx-0'>
        <div className='title-password col-12 mt-3 mb-2'>
          <h2 className='IranSans_Medium_FA'>
            دستگردانی به :{userDetail?.name}
            {check_date && (
              <span className='font-medium IranSans_Medium_FA mx-1'>
                {myDate}
              </span>
            )}
          </h2>
          <div className='line'></div>
        </div>
      </div>
    )
  } else return ''
}
export default ShowNameDispacht
