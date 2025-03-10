import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const DeleteEmail = props => {
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-4 col-lg-5 col-md-6 col-12 main-add-email-form'>
        <div className='box-wellcome'>
          <div className='title-wellcome'>
            <h3 className='title-add-email mb-0 col px-0'>حذف ایمیل</h3>
            <CloseIcon onClick={() => props.handleState('delete', false)} />
          </div>
          <div className='list-emails'>
            {props.state.listEmails.map((data, key) => (
              <div
                className='email ltr d-flex align-items-center my-2'
                key={key}
              >
                <span className='col'>{data.label}</span>
                <input
                  type='checkbox'
                  className='d-none'
                  name={`email__${data.value}`}
                  id={`email__${data.value}`}
                  onChange={e =>
                    props.handleState(`email__${data.value}`, e.target.checked)
                  }
                />
                <label className='mb-0 d-flex' htmlFor={`email__${data.value}`}>
                  {props.state[`email__${data.value}`] ? (
                    <CheckBoxRoundedIcon className='active' />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                </label>
              </div>
            ))}
          </div>
          <div className='submit row mx-0 mt-5'>
            <div className='col-9 pr-0 pl-1'>
              <button className='pointer w-100 delete'>حذف ایمیل</button>
            </div>
            <div className='col-3 pl-0 pr-1'>
              <button className='pointer w-100 cancel'>انصراف</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DeleteEmail
