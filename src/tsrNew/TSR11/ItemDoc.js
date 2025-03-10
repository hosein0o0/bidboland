import React from 'react'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import CheckPersianText from '../../CheckPersianText'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Loading from '../../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
const ItemDoc = props => {
  const {
    handleDisabledAPIElm,
    handleUploadListAPI,
    deleteFileListAPI,
    handleDelete
  } = props.API
  const { loading, foucs } = props.state
  const state_name = props.name
  const check_disabled = handleDisabledAPIElm() ? true : false
  const data = props.data || {}
  const key = props._key
  const length = props.length
  function handleChange (e) {
    const { name, value } = e.target
    const { handleChangeList } = props.API
    handleChangeList(state_name, name, value, key)
  }
  function handleClassname (name) {
    let state1 = handleCheckText(data[name])
    let state2 = foucs === `${state_name}_${name}_${key}`
    let result = state1 || state2
    return result ? 'active' : ''
  }
  const AttachementName = data.AttachementName || []
  const Attachement = data.Attachement || []
  const require = Attachement.length > 0
  let state1_rm = check_disabled ? false : true
  let state2_rm = length > 1
  const show_rm = state1_rm && state2_rm
  return (
    <div className='w-100 mr-0 ml-0 row' key={key}>
      <div className='title-password list-counter col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold_FA'>{key + 1}</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div className='field-form persian'>
          <label>مدارک ضمیمه</label>
          <div
            className={`allName col row m-0 justify-content-end ${
              check_disabled ? 'pl-1' : ''
            }`}
          >
            {AttachementName.map((link, i) => (
              <span key={i}>
                {!check_disabled && (
                  <CloseRoundedIcon
                    onClick={() =>
                      deleteFileListAPI(
                        key,
                        i,
                        'Attachement',
                        'AttachementName',
                        state_name
                      )
                    }
                  />
                )}
                <a href={Attachement[i] || '#'} target='_blank' rel='noreferrer'>
                  {handleString(link)}
                </a>
              </span>
            ))}
          </div>
          {!check_disabled && (
            <React.Fragment>
              <input
                className='d-none'
                type='file'
                id={`upload-Picture_${key}_${state_name}`}
                multiple
                onChange={e =>
                  handleUploadListAPI(
                    e,
                    `Attachement_${key}`,
                    `AttachementName_${key}`,
                    state_name
                  )
                }
              />
              <label
                className='upload-label'
                htmlFor={`upload-Picture_${key}_${state_name}`}
              >
                {loading === `Attachement_${key}_${state_name}` ? (
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
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div className={`field-form ltr ${handleClassname('documentNumber')}`}>
          <label>
            Document Number
            {require && <span className='star IranSans_Bold'>*</span>}
          </label>
          <input
            type='text'
            className={`text-left IranSans_Medium_FA ${
              CheckPersianText(data.documentNumber) ? 'rtl' : 'ltr'
            }`}
            onChange={handleChange}
            name='documentNumber'
            value={handleString(data.documentNumber)}
            onFocus={() => props.OnFocus(`${state_name}_documentNumber_${key}`)}
            onBlur={() => props.OnBlur()}
            disabled={check_disabled}
            readOnly={check_disabled}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div className={`field-form ltr ${handleClassname('title')}`}>
          <label>
            Document Title
            {require && <span className='star IranSans_Bold'>*</span>}
          </label>
          <input
            type='text'
            className={`text-left IranSans_Medium_FA ${
              CheckPersianText(data.title) ? 'rtl' : 'ltr'
            }`}
            onChange={handleChange}
            name='title'
            value={handleString(data.title)}
            onFocus={() => props.OnFocus(`${state_name}_title_${key}`)}
            onBlur={() => props.OnBlur()}
            disabled={check_disabled}
            readOnly={check_disabled}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian rtl ${handleClassname('editNumber')}`}
        >
          <label>
            شماره ویرایش
            {require && <span className='star IranSans_Bold'>*</span>}
          </label>
          <input
            type='text'
            className={`text-right IranSans_Medium_FA ${
              CheckPersianText(data.editNumber) ? 'rtl' : 'ltr'
            }`}
            onChange={handleChange}
            name='editNumber'
            value={handleString(data.editNumber)}
            onFocus={() => props.OnFocus(`${state_name}_editNumber_${key}`)}
            onBlur={() => props.OnBlur()}
            disabled={check_disabled}
            readOnly={check_disabled}
          />
        </div>
      </div>
      {show_rm && (
        <div className='button-add col-12 row mr-0 ml-0'>
          <button
            className='remove'
            onClick={() => handleDelete(state_name, key)}
          >
            <DeleteRoundedIcon />
            حذف
          </button>
        </div>
      )}
    </div>
  )
}
export default ItemDoc
