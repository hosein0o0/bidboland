import React from 'react'
import Loading from '../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import handleString from '../handleString'
function Upload (props) {
  let listName = props.state[`${props.data.value}Name`] || [],
    list = props.state[props.data.value] || []
  const showUploadButton = () => {
    let state1 = props.data.disabled ? false : true
    let single = props.data.single ? true : false
    let state2 = single ? list.length === 0 : true
    const result = state1 && state2
    return result
  }
  const show = showUploadButton()
  return (
    <div className='col-xl-12 col-lg-12 col-md-12 col-12' key={props._key}>
      <div
        className={`field-form ${props.hadnleClassName(props.data).className}`}
      >
        <label>
          {props.data.name}
          {props.handleRequire(props.data)}
        </label>
        <div
          className={`allName col row m-0 justify-content-end ${
            props.data.rtl ? '' : 'english'
          }
          ${show ? '' : props.data.rtl ? 'pl-1' : 'pr-1'}
          `}
        >
          {list.map((url, index) => (
            <span key={index}>
              {!props.data.disabled && (
                <CloseRoundedIcon
                  onClick={() =>
                    props.deleteFile(
                      index,
                      props.data.value,
                      `${props.data.value}Name`
                    )
                  }
                />
              )}
              <a href={url || '#'}>{handleString(listName[index]) || url}</a>
            </span>
          ))}
        </div>
        {props.data.single ? (
          <input
            name={`${props.data.value}_${props._key}`}
            className='d-none'
            type='file'
            id={`${props.data.value}_${props._key}`}
            onChange={e =>
              props.handleUpload(
                e,
                `${props.data.value}`,
                `${props.data.value}Name`
              )
            }
            accept={props.data.accept}
          />
        ) : (
          <input
            name={`${props.data.value}_${props._key}`}
            className='d-none'
            type='file'
            id={`${props.data.value}_${props._key}`}
            multiple
            onChange={e =>
              props.handleUpload(
                e,
                `${props.data.value}`,
                `${props.data.value}Name`
              )
            }
            accept={props.data.accept}
          />
        )}
        {show && (
          <label
            className={`upload-label ${props.data.rtl ? '' : 'signEnglish'}`}
            htmlFor={`${props.data.value}_${props._key}`}
          >
            {props.data.rtl ? (
              <React.Fragment>
                {props.state.loading === `${props.data.value}` ? (
                  <Loading className='form-loader w-auto' />
                ) : (
                  <AttachFileIcon />
                )}
                آپلود فایل
              </React.Fragment>
            ) : (
              <React.Fragment>
                upload
                {props.state.loading === `${props.data.value}` ? (
                  <Loading className='form-loader w-auto' />
                ) : (
                  <AttachFileIcon />
                )}
              </React.Fragment>
            )}
          </label>
        )}
      </div>
    </div>
  )
}
export default Upload
