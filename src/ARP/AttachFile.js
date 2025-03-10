import React from 'react'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import Loading from '../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
// import CheckIcon from '@material-ui/icons/Check'
import DoneIcon from '@material-ui/icons/Done'

const AttachFile = props => {
  const { tabSelected, loading, disabled } = props.state
  const report_link = props.state[`${tabSelected}_report_link`]
  const report_linkName = props.state[`${tabSelected}_report_linkName`]
  const hasAttach = props.state[`${tabSelected}_hasAttach`]
  // const signed = props.state[`${tabSelected}_signed`]
  const _disbaled = props.state[`${tabSelected}_dis3`]
    ? props.state[`${tabSelected}_dis3`]
    : false
  function handleDisabled () {
    const check = props.state[`${tabSelected}_event_expert_allow`]
    const result = _disbaled || !check || props.handleTimeOut()
    return result
  }
  function ShowSubmit () {
    let array = []
    if (!_disbaled) {
      array.push(
        <div className='submit-form col-12'>
          <button
            onClick={() =>
              !_disbaled && props.MainFn ? props.MainFn.handleSign1() : ''
            }
            disabled={handleDisabled() || disabled}
          >
            {loading === `sing1-${tabSelected}` ? (
              <Loading className='form-loader' />
            ) : (
              <DoneIcon />
            )}
            ثبت اطلاعات
          </button>
        </div>
      )
    }
    return array
  }
  return (
    <React.Fragment>
      <div className='title-password w-100 mt-3 mb-2'>
        <div className='line'></div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
        <div className='field-radio w-100 align-items-center'>
          <label>
            گزارش فنی حادثه (فایل ضمیمه) :
            <span className='star IranSans_Bold'>*</span>
          </label>
          <div className='main-radio pr-0'>
            <div className='radio-button'>
              <input
                className='d-none'
                type='radio'
                id={`hasAttachYES-${tabSelected}`}
                name='hasAttach'
                value={true}
                onChange={() =>
                  !handleDisabled()
                    ? props.handleState({
                        [`${tabSelected}_hasAttach`]: true,
                        [`${tabSelected}_report_link`]: [],
                        [`${tabSelected}_report_linkName`]: []
                      })
                    : ''
                }
              />
              <label htmlFor={`hasAttachYES-${tabSelected}`}>
                {hasAttach ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                دارد
              </label>
            </div>
            <div className='radio-button'>
              <input
                className='d-none'
                type='radio'
                id={`hasAttachNO-${tabSelected}`}
                name='hasAttach'
                value={false}
                onChange={() =>
                  !handleDisabled()
                    ? props.handleState({
                        [`${tabSelected}_hasAttach`]: false,
                        [`${tabSelected}_report_link`]: [],
                        [`${tabSelected}_report_linkName`]: []
                      })
                    : ''
                }
              />
              <label htmlFor={`hasAttachNO-${tabSelected}`}>
                {!hasAttach ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                ندارد
              </label>
            </div>
          </div>
        </div>
      </div>
      {hasAttach ? (
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div className={`field-form persian`}>
            <label>
              بارگزاری مدارک
              <span className='star IranSans_Bold'>*</span>
            </label>
            <div
              className={`allName col row m-0 justify-content-end ${
                _disbaled ? 'pl-1' : ''
              }`}
            >
              {report_linkName
                ? report_linkName.map((name, key) => (
                    <span key={key}>
                      {!handleDisabled() ? (
                        <CloseRoundedIcon
                          onClick={() =>
                            props.deleteFile(
                              key,
                              `${tabSelected}_report_link`,
                              `${tabSelected}_report_linkName`
                            )
                          }
                        />
                      ) : (
                        ''
                      )}
                      <a
                        href={report_link[key] ? report_link[key] : '#/'}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {name}
                      </a>
                    </span>
                  ))
                : ''}
            </div>
            {!handleDisabled() ? (
              <React.Fragment>
                <input
                  className='d-none'
                  type='file'
                  id={`${tabSelected}_report_link`}
                  multiple
                  onChange={e =>
                    props.handleUpload(
                      e,
                      `${tabSelected}_report_link`,
                      `${tabSelected}_report_linkName`
                    )
                  }
                  disabled={handleDisabled()}
                />
                <label
                  className='upload-label'
                  htmlFor={`${tabSelected}_report_link`}
                >
                  {loading === `${tabSelected}_report_link-${tabSelected}` ? (
                    <Loading className='form-loader w-auto' />
                  ) : (
                    <AttachFileIcon />
                  )}
                  آپلود فایل
                </label>
              </React.Fragment>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        ''
      )}
      {ShowSubmit()}
    </React.Fragment>
  )
}
export default AttachFile
