import React from 'react'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import handleString from '../../handleString'
import Loading from '../../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import handleCheckText from '../../handleCheckText'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import CheckPersianText from '../../CheckPersianText'
// import StaticData from '../../staticData'
const ItemForeign = props => {
  let data = props.data || {}
  const canCreate = props.check_disabled ? false : true
  const class_name = txt => (CheckPersianText(txt) ? 'rtl' : 'ltr')
  let { foucs, loading } = props.state
  function handleClassName (name) {
    let state1 = foucs === `${name}_${props._key}`
    let state2 = handleCheckText(data[name])
    let result = state1 || state2
    return result
  }
  let require = props.notRequire ? false : true
  return (
    <div className='w-100 row mr-0 ml-0' key={props._key}>
      <div className='title-password list-counter col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>{props._key + 1}</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div className='field-form persian'>
          <label>
            مدارک پیوست خارج از سامانه
            {require && <span className='star IranSans_Bold'>*</span>}
          </label>
          <div
            className={`allName col row m-0 justify-content-end ${
              canCreate ? '' : 'pl-1'
            }`}
          >
            {data.AttachementName.map((link, i) => (
              <span key={i}>
                {canCreate && (
                  <CloseRoundedIcon
                    onClick={() =>
                      props.deleteFileList(
                        props._key,
                        i,
                        'Attachement',
                        'AttachementName',
                        props.nameParent
                      )
                    }
                  />
                )}
                <a
                  className={class_name(handleString(link))}
                  href={data.Attachement[i] || '#'}
                  // href={handleLink(data.Attachement[i], data.AttachementName[i])}
                  target='_blank'
                  rel='noreferrer'
                >
                  {handleString(link)}
                </a>
              </span>
            ))}
          </div>
          {canCreate && (
            <React.Fragment>
              {data.AttachementName.length === 0 && (
                <input
                  className='d-none'
                  type='file'
                  id={`upload-Picture_${props._key}`}
                  // multiple
                  onChange={e =>
                    props.handleUploadList(
                      e,
                      `Attachement_${props._key}`,
                      `AttachementName_${props._key}`,
                      props.nameParent
                    )
                  }
                />
              )}
              <label
                className={`upload-label ${
                  data.AttachementName.length === 0 ? '' : 'disabled'
                }`}
                htmlFor={`upload-Picture_${props._key}`}
              >
                {loading === `Attachement_${props._key}` ? (
                  <Loading className='form-loader w-auto' />
                ) : (
                  <AttachFileIcon
                    className={
                      data.AttachementName.length === 0 ? '' : 'disabled'
                    }
                  />
                )}
                آپلود فایل
              </label>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form ltr ${
            handleClassName('documentNumber') ? 'active' : ''
          }`}
        >
          <label>Document Number</label>
          <input
            type='text'
            className='text-left ltr'
            name={`documentNumber_${props._key}`}
            value={handleString(data.documentNumber)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={() => props.OnBlur()}
            onChange={e =>
              canCreate &&
              props.handleChangeList(
                props.nameParent,
                e.target.name.split('_')[0],
                e.target.value,
                props._key
              )
            }
            readOnly={!canCreate}
            disabled={!canCreate}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            handleClassName('degreeTitle') ? 'active' : ''
          }`}
        >
          <label>
            عنوان مدرک
            {require && <span className='star IranSans_Bold'>*</span>}
          </label>
          <input
            type='text'
            className='text-right rtl'
            name={`degreeTitle_${props._key}`}
            value={handleString(data.degreeTitle)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={() => props.OnBlur()}
            onChange={e =>
              canCreate &&
              props.handleChangeList(
                props.nameParent,
                e.target.name.split('_')[0],
                e.target.value,
                props._key
              )
            }
            readOnly={!canCreate}
            disabled={!canCreate}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            handleClassName('numberPages') ? 'active' : ''
          }`}
        >
          <label>تعداد صفحات</label>
          <input
            type='text'
            name={`numberPages_${props._key}`}
            value={handleString(data.numberPages)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={() => props.OnBlur()}
            onChange={e =>
              canCreate &&
              props.handleChangeList(
                props.nameParent,
                e.target.name.split('_')[0],
                e.target.value,
                props._key
              )
            }
            readOnly={!canCreate}
            disabled={!canCreate}
          />
        </div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div
          className={`field-form persian textarea ${
            handleClassName('descriptionAttachment') ? 'active' : ''
          }`}
        >
          <div className='col p-0'>
            <label className='textarea'>توضیحات</label>
            <textarea
              className='w-100'
              type='text'
              name={`descriptionAttachment_${props._key}`}
              onFocus={e => props.OnFocus(e.target.name)}
              onBlur={() => props.OnBlur()}
              onChange={e =>
                canCreate &&
                props.handleChangeList(
                  props.nameParent,
                  e.target.name.split('_')[0],
                  e.target.value,
                  props._key
                )
              }
              value={handleString(data.descriptionAttachment)}
              readOnly={!canCreate}
              disabled={!canCreate}
            ></textarea>
          </div>
        </div>
      </div>
      {props.list.length > 1 && canCreate && (
        <div className='button-add col-12 row mr-0 ml-0'>
          <button
            className='remove'
            onClick={() => props.handleDelete(props.nameParent, props._key)}
          >
            <DeleteRoundedIcon />
            حذف
          </button>
        </div>
      )}
    </div>
  )
}
export default ItemForeign
