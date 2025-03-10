import React from 'react'
import DocumentInternal from './DocumentInternal'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import CheckDownload from '../../CheckDownload'
import StaticData from '../../staticData'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
const ItemInternal = props => {
  let { foucs } = props.state
  const data = props.data || {}
  function handleClassName (name) {
    let state1 = foucs === `${props.nameParent}__${name}__${props._key}`
    let state2 = handleCheckText(data[name])
    let result = state1 || state2
    return result
  }
  const canCreate = props.check_disabled ? false : true
  function handleLink (data) {
    const { transmitallNumber, documentNumber, revision } = data
    let url,
      _check = false
    const check =
      handleCheckText(transmitallNumber) &&
      handleCheckText(documentNumber) &&
      handleCheckText(revision)
    if (check) {
      let baseUrl = `${StaticData.link_file}/upload/TechnicalArchive/dcc/Engineering/Documents/${transmitallNumber}`
      let pdf = `${`${documentNumber}_${revision}`}.pdf`
      let _PDF = `${`${documentNumber}_${revision}`}.PDF`
      if (CheckDownload(`${baseUrl}/${pdf}`)) {
        url = `${baseUrl}/${pdf}`
        _check = true
      } else if (CheckDownload(`${baseUrl}/${_PDF}`)) {
        url = `${baseUrl}/${_PDF}`
        _check = true
      }
    }
    return {
      check: _check,
      link: url
    }
  }
  return (
    <div className='w-100 row mr-0 ml-0' key={props._key}>
      <div className='title-password list-counter col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>{props._key + 1}</h2>
        <div className='line'></div>
      </div>
      <DocumentInternal
        {...props}
        handleClassName={handleClassName}
        handleLink={handleLink}
      />
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            handleClassName('degreeTitle') ? 'active' : ''
          }`}
        >
          <label>عنوان مدرک</label>
          {data.check ? (
            <a
              href={data.link}
              className='ltr _link-document-out d-flex align-items-center justify-content-start'
            >
              {handleString(data.degreeTitle)}
            </a>
          ) : (
            <input
              type='text'
              // name={`${props.nameParent}__degreeTitles__${props._key}`}
              value={handleString(data.degreeTitle)}
              readOnly={true}
              disabled={true}
            />
          )}
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
            name={`${props.nameParent}__numberPages__${props._key}`}
            value={handleString(data.numberPages)}
            onFocus={e => (canCreate ? props.OnFocus(e.target.name) : '')}
            onBlur={canCreate ? props.OnBlur : ''}
            onChange={e =>
              canCreate
                ? props.handleChangeList(
                    props.nameParent,
                    'numberPages',
                    e.target.value,
                    props._key
                  )
                : ''
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
              name={`${props.nameParent}__descriptionAttachment__${props._key}`}
              value={handleString(data.descriptionAttachment)}
              onFocus={e => (canCreate ? props.OnFocus(e.target.name) : '')}
              onBlur={canCreate ? props.OnBlur : ''}
              onChange={e =>
                canCreate
                  ? props.handleChangeList(
                      props.nameParent,
                      'descriptionAttachment',
                      e.target.value,
                      props._key
                    )
                  : ''
              }
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
export default ItemInternal
