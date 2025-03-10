import React, { useState } from 'react'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleString from '../handleString'
function PopUpReject (props) {
  const [selectRJ, setSelectRJ] = useState('')
  const [value, setValue] = useState('')
  const parentState = props.props.state || {}
  async function Verify () {
    if (!parentState.disabled || !handleDisabled()) {
      let verify = await selectRJ.split('_reject_')[1]
      let obj = await parentState.rejectSelect
      let list = await obj.itemReject
      if (list) {
        list = await Object.keys(list).map(el => {
          if (list[el].value === verify) {
            list[el].accept = true
          } else {
            list[el].accept = false
          }
          return list[el]
        })
      }
      obj['itemReject'] = await list
      await props.props.handleState('rejectSelect', obj)
      await props.props.handleState('loading', `reject_${props._key}`)
      await props.props.handleState(
        'disabled',
        `${parentState.rejectSelect.value}_${props._key}`
      )
      await props.props.handleVerify(false, value)
    }
  }
  function handleDisabled () {
    if (selectRJ === '' || value.trim() === '') {
      return true
    } else return false
  }
  function handleClose () {
    props.props.handleState('rejectSelect', '')
    props.setKey('')
  }
  if (parentState.rejectSelect.itemReject) {
    return (
      <div className='backGroundPopup'>
        <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
          <div className='box-wellcome'>
            <div className='w-100'>
              {parentState.rejectSelect.itemReject.map((rj, index) => (
                <div
                  className='disiplin-checkbox col-xl-6 col-lg-6 col-md-4 col-6 w-auto mt-3 mb-3'
                  key={index}
                >
                  <div className='checkbox m-0'>
                    <input
                      type='checkbox'
                      className='d-none'
                      id={`_reject_${rj.value}`}
                      onChange={() =>
                        selectRJ === `_reject_${rj.value}`
                          ? setSelectRJ('')
                          : setSelectRJ(`_reject_${rj.value}`)
                      }
                    />
                    <label className='full' htmlFor={`_reject_${rj.value}`}>
                      {selectRJ === `_reject_${rj.value}` ? (
                        <CheckBoxRoundedIcon />
                      ) : (
                        <CheckBoxOutlineBlankRoundedIcon />
                      )}
                      {rj.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className='main-textarea'>
              <textarea
                onChange={e => setValue(e.target.value)}
                placeholder='لطفا دلیل خود را وارد کنید(اجباری)'
                value={handleString(value)}
              ></textarea>
            </div>
            <div className='buttons-wellcome justify-content-center'>
              <button
                className='accept pt-0 pb-0'
                onClick={() => Verify()}
                disabled={parentState.disabled || handleDisabled()}
                // onClick={() => props.handleVerify(selectRJ)}
              >
                {parentState.loading === 'submit-unaccept' ? (
                  <Loading className='form-loader mr-0 ml-2' />
                ) : (
                  <DoneIcon className='ml-2 mt-2 mb-2' />
                )}
                ثبت
              </button>
              <button className='pt-0 pb-0' onClick={() => handleClose()}>
                <CloseRoundedIcon className='ml-2' />
                بستن
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else return ''
}
export default PopUpReject
