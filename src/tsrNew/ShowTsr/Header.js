import React from 'react'
import Form from '../../Form/Form'
const Header = props => {
  function handleListForm() {
    // const { select } = props.state
    let list = [
      {
        value: 'tsr_no',
        name: 'شماره TSR',
        rtl: true,
        disabled: true,
        require: true
      },
      {
        value: 'created_at_date',
        name: 'تاریخ درخواست',
        rtl: true,
        disabled: true,
        require: true
      },
      {
        value: 'subject',
        name: 'موضوع',
        rtl: true,
        require: true,
        disabled: true
      },
    ]
    return list
  }
  return (
    <div className='form row justify-content-start my-0'>
      <div className='w-100 row justify-content-start m-0'>
        <Form {...props} itemForm={handleListForm()} />
      </div>
    </div>
  )
}
export default Header
