import React from 'react'
import handleCheckText from '../../handleCheckText'
import moment from 'moment-jalaali'
import handleString from '../../handleString'
const SupervisorName = props => {
  const { ValueTable } = props.API
  const value_table = ValueTable()
  const firstName = `${value_table}_allocation_firstName`
  const lastName = `${value_table}_allocation_lastName`
  const FName = props.state[firstName],
    LName = props.state[lastName]
  const check = handleCheckText(FName) && handleCheckText(LName)
  function handleDate() {
    const name_at = `${value_table}_supervisor_at`,
      at = props.state[name_at]
    const convert_date = handleCheckText(at) ? moment(at, 'YYYY-MM-DD hh:mm:ss').locale('fa').format(' HH:mm jYYYY/jMM/jDD ') : ''
    return handleCheckText(convert_date) ? `(${handleString(convert_date)})` : ''
  }
  const date = handleDate()
  const check_date = handleCheckText(date)
  if (check) {
    const name = `${FName} ${LName}`
    return (
      <div className='w-100 row mx-0'>
        <div className='title-password col-12 mt-3 mb-2'>
          <h2 className='IranSans_Bold'>نام سرپرست : {name}
            {check_date && <span className='font-medium IranSans_Medium_FA mx-1'>{date}</span>}
          </h2>
          <div className='line'></div>
        </div>
      </div>
    )
  } else return ''
}
export default SupervisorName
