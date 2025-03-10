import React, { useState } from 'react'
import Loading from '../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleString from '../../handleString'
import handleCheckText from '../../handleCheckText'
function PopUpReject (props) {
  const [Reject, setReject] = useState('')
  const [value, setValue] = useState('')
  let rejectSelect =
    props.state.rejectSelect || props.props.state.rejectSelect || {}

  const { loading, disabled } = props.props.state
  let _list = rejectSelect.itemReject || []
  function handleClose () {
    const { handleState } = props.props
    handleState({ rejectSelect: '' })
  }
  function Verify () {
    const { handleState, handleVerify } = props.props
    handleState({ loading: 'submit-unaccept' })
    handleVerify(Reject, rejectSelect, value)
  }
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
        <div className='box-wellcome'>
          <div className='w-100'>
            {_list.map((data, index) => (
              <div
                className='disiplin-checkbox col-xl-6 col-lg-6 col-md-4 col-6 w-auto mt-3 mb-3'
                key={index}
              >
                <div className='checkbox m-0'>
                  <input
                    type='checkbox'
                    className='d-none'
                    id={data.value}
                    name={data.value}
                  />
                  <label
                    className='full'
                    htmlFor={data.value}
                    onClick={() =>
                      setReject(Reject === data.value ? '' : data.value)
                    }
                  >
                    {Reject === data.value ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                    {data.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className='main-textarea'>
            <textarea
              className='rtl'
              onChange={e => setValue(handleString(e.target.value).slice(0, 300))}
              placeholder='لطفا دلیل خود را وارد کنید(اجباری)'
              value={handleString(value)}
            ></textarea>
          </div>
          <div className='buttons-wellcome justify-content-center'>
            <button
              className='accept pt-0 pb-0'
              onClick={Verify}
              disabled={
                disabled || !handleCheckText(Reject) || !handleCheckText(value)
              }
            >
              {loading === 'submit-unaccept' ? (
                <Loading className='form-loader mr-0 ml-2' />
              ) : (
                <DoneIcon className='ml-2 mt-2 mb-2' />
              )}
              ثبت
            </button>
            <button
              className='pt-0 pb-0'
              onClick={handleClose}
              disabled={disabled}
            >
              <CloseRoundedIcon className='ml-2' />
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PopUpReject
