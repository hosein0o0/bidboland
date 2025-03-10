import React from 'react'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import Loading from '../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
function DocumentList (props) {
  return (
    <div className='row w-100 mr-0 ml-0'>
      <div className='title-password list-counter col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>{props._key + 1}</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form ltr ${
            props.state.foucs ===
              `${props.name}__documentNumber__${props._key}` ||
            handleCheckText(props.data.documentNumber)
              ? 'active'
              : ''
          }`}
        >
          <label>
            Document Number
            {props.require ? <span className='star IranSans_Bold'>*</span> : ''}
          </label>
          <input
            className='text-left ltr'
            type='text'
            name={`${props.name}__documentNumber__${props._key}`}
            value={handleString(props.data.documentNumber)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={e =>
              props.handleChangeList(
                props.name,
                e.target.name.split('__')[1],
                e.target.value,
                props._key
              )
            }
            readOnly={props.handleDisabled()}
            disabled={props.handleDisabled()}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form ltr ${
            props.state.foucs === `${props.name}__title__${props._key}` ||
            handleCheckText(props.data.title)
              ? 'active'
              : ''
          }`}
        >
          <label>
            Document Title
            {props.require ? <span className='star IranSans_Bold'>*</span> : ''}
          </label>
          <input
            className='text-left ltr'
            type='text'
            name={`${props.name}__title__${props._key}`}
            value={handleString(props.data.title)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={e =>
              props.handleChangeList(
                props.name,
                e.target.name.split('__')[1],
                e.target.value,
                props._key
              )
            }
            readOnly={props.handleDisabled()}
            disabled={props.handleDisabled()}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === `${props.name}__editNumber__${props._key}` ||
            handleCheckText(props.data.editNumber)
              ? 'active'
              : ''
          }`}
        >
          <label>
            شماره ویرایش
            {props.require ? <span className='star IranSans_Bold'>*</span> : ''}
          </label>
          <input
            className='text-left ltr'
            type='text'
            name={`${props.name}__editNumber__${props._key}`}
            value={handleString(props.data.editNumber)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={e =>
              props.handleChangeList(
                props.name,
                e.target.name.split('__')[1],
                e.target.value,
                props._key
              )
            }
            readOnly={props.handleDisabled()}
            disabled={props.handleDisabled()}
          />
        </div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div className={`field-form persian`}>
          <label>
            مدارک ضمیمه
            {props.require ? <span className='star IranSans_Bold'>*</span> : ''}
          </label>
          <div
            className={`allName col row m-0 justify-content-end ${
              props.handleDisabled() ? 'pl-1' : ''
            }`}
          >
            {props.data.attachmentName.map((name, key) => (
              <span key={key}>
                {props.handleDisabled() ? (
                  ''
                ) : (
                  <CloseRoundedIcon
                    onClick={() =>
                      props.deleteFileList(
                        props._key,
                        key,
                        'attachment',
                        'attachmentName',
                        props.name
                      )
                    }
                  />
                )}
                <a
                  href={
                    props.data.attachment[key]
                      ? props.data.attachment[key]
                      : '#'
                  }
                  target='_blank'
                  rel='noreferrer'
                >
                  {name}
                </a>
              </span>
            ))}
          </div>
          {props.handleDisabled() ? (
            ''
          ) : (
            <React.Fragment>
              <input
                className='d-none'
                type='file'
                id={`upload-Picture_${props.name}_${props._key}`}
                // multiple
                onChange={e =>
                  props.handleUploadList(
                    e,
                    `attachment_${props._key}`,
                    `attachmentName_${props._key}`,
                    props.name
                  )
                }
              />
              <label
                className='upload-label'
                htmlFor={`upload-Picture_${props.name}_${props._key}`}
              >
                {props.state.loading === `attachment_${props._key}` ? (
                  <Loading className='form-loader w-auto' />
                ) : (
                  <AttachFileIcon />
                )}
                آپلود فایل
              </label>
            </React.Fragment>
          )}
        </div>
      </div>
      {props.length > 1 && !props.handleDisabled() && (
        <div className='button-add col-12 row mr-0 ml-0'>
          <button
            className='remove'
            onClick={() => props.handleDelete(props.name, props._key)}
          >
            <DeleteRoundedIcon />
            حذف
          </button>
        </div>
      )}
      <div className='col-12'>
        <hr />
      </div>
    </div>
  )
}
export default DocumentList
