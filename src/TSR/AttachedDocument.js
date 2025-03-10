import React, { useState, useEffect } from 'react'
import Loading from '../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import AddIcon from '@material-ui/icons/Add'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import SelectBoxSearchForm from '../Customization/SelectBoxSearchForm'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
const AttachedDocument = props => {
  // const handleCheckText = HandleCheckText.handleCheckText
  const [list, setList] = useState([])
  useEffect(() => {
    if (props.state[props.nameParent]) {
      const _array = props.state[props.nameParent]
      if (_array.length) {
        setList(props.state[props.nameParent])
      }
    }
  }, [props])
  async function SearchSelect (parent, name, value, key) {
    let list = await props.state[parent]
    let obj = await list[key]
    obj[name] = await value
    obj['select'] = await false
    await props.handleState([parent], list)
    if (value.length > 6) {
      await props.props.handleDocumentMdl(value)
    }
  }
  async function CheckBlur (parent, name, index) {
    setTimeout(async () => {
      let list = await props.state[parent]
      let obj = await list[index]
      if (!handleCheckText(obj[name]) || !obj.select) {
        obj[name] = await ''
        obj['degreeTitle'] = ''
        await props.handleState([parent], list)
      }
      await props.OnBlur()
    }, 250)
  }
  function _handleLink (data) {
    return '#'
  }
  return (
    <div className='w-100'>
      <div className='title-password col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>
          {props.out ? 'مدارک ضمیمه خارج از سامانه' : 'مدارک ضمیمه درون سامانه'}
        </h2>
        <div className='line'></div>
      </div>
      {list.map((data, index) => (
        <div className='w-100 row mr-0 ml-0' key={index}>
          <div className='title-password list-counter col-12 mt-3 mb-2'>
            <h2 className='IranSans_Bold'>{index + 1}</h2>
            <div className='line'></div>
          </div>
          {props.out ? (
            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
              <div className={`field-form persian`}>
                <label>
                  {props.out ? 'مدارک پیوست خارج از سامانه' : ''}
                  {props.require && (
                    <span className='star IranSans_Bold'>*</span>
                  )}
                </label>
                <div
                  className={`allName col row m-0 justify-content-end ${
                    props.canCreate ? '' : 'pl-1'
                  }`}
                >
                  {data.AttachementName.map((name, key) => (
                    <span key={key}>
                      {props.out && props.canCreate && (
                        <CloseRoundedIcon
                          onClick={() =>
                            props.deleteFileList(
                              index,
                              key,
                              'Attachement',
                              'AttachementName',
                              props.nameParent
                            )
                          }
                        />
                      )}
                      <a
                        href={
                          data.Attachement[key] ? data.Attachement[key] : '#'
                        }
                        target='_blank'
                        rel='noreferrer'
                      >
                        {name}
                      </a>
                    </span>
                  ))}
                </div>
                {props.out && props.canCreate && (
                  <React.Fragment>
                    <input
                      className='d-none'
                      type='file'
                      id={`upload-Picture_${index}`}
                      multiple
                      onChange={e =>
                        props.handleUploadList(
                          e,
                          `Attachement_${index}`,
                          `AttachementName_${index}`,
                          props.nameParent
                        )
                      }
                    />
                    <label
                      className='upload-label'
                      htmlFor={`upload-Picture_${index}`}
                    >
                      {props.state.loading === `Attachement_${index}` ? (
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
          ) : (
            ''
          )}
          {props.out ? (
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  (props.out &&
                    props.state.foucs === `documentNumber_${index}`) ||
                  handleCheckText(data.documentNumber)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  Document Number
                  {/* {data.Attachement.length && (
                      <span className='star IranSans_Bold'>*</span>
                    )} */}
                </label>
                <input
                  type='text'
                  className='text-left'
                  name={`documentNumber_${index}`}
                  value={handleString(data.documentNumber)}
                  onFocus={e =>
                    props.canCreate && props.OnFocus(e.target.name)
                  }
                  onBlur={() => props.canCreate && props.OnBlur()}
                  onChange={e =>
                    props.canCreate &&
                    props.handleChangeList(
                      props.nameParent,
                      e.target.name.split('_')[0],
                      e.target.value,
                      index
                    )
                  }
                  readOnly={!props.canCreate}
                  disabled={!props.canCreate}
                />
              </div>
            </div>
          ) : props.canCreate ? (
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form overflow-initial ${
                  props.state.foucs ===
                    `${props.nameParent}__documentNumber__${index}` ||
                  handleCheckText(data.documentNumber)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='col-12 p-0 ltr'>
                  <label>
                    Document Number
                    {/* {props.require ? (
                      <span className='star IranSans_Bold'>*</span>
                    ) : (
                      ''
                    )} */}
                  </label>
                  <input
                    className='text-left ltr'
                    type='text'
                    name={`${props.nameParent}__documentNumber__${index}`}
                    value={handleString(data.documentNumber)}
                    onFocus={e =>
                      props.canCreate && props.OnFocus(e.target.name)
                    }
                    onBlur={e =>
                      CheckBlur(
                        props.nameParent,
                        e.target.name.split('__')[1],
                        index
                      )
                    }
                    onChange={e =>
                      props.canCreate &&
                      SearchSelect(
                        props.nameParent,
                        e.target.name.split('__')[1],
                        e.target.value,
                        index
                      )
                    }
                  />
                </div>
                {props.state.foucs ===
                  `${props.nameParent}__documentNumber__${index}` &&
                  data.documentNumber &&
                  data.documentNumber.length > 2 && (
                    <SelectBoxSearchForm
                      {...props}
                      index={index}
                      name='documentNumber'
                      multi={true}
                    />
                  )}
              </div>
            </div>
          ) : (
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  handleCheckText(data.documentNumberDocuments) ? 'active' : ''
                }`}
              >
                <label>Document Number</label>
                <span className='ltr _link-document-out d-flex align-items-center justify-content-end'>
                  {handleString(data.documentNumberDocuments)}
                </span>
                {/* <a
                  href={_handleLink(data)}
                  className='ltr _link-document-out d-flex align-items-center justify-content-end'
                > */}
                {/* </a> */}
              </div>
            </div>
          )}
          {props.out ? (
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  props.state.foucs === `degreeTitle_${index}` ||
                  handleCheckText(data.degreeTitle)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  عنوان مدرک
                  {props.require && (
                    <span className='star IranSans_Bold'>*</span>
                  )}
                </label>
                <input
                  type='text'
                  name={`degreeTitle_${index}`}
                  value={handleString(data.degreeTitle)}
                  onFocus={e =>
                    props.canCreate && props.OnFocus(e.target.name)
                  }
                  onBlur={() => props.canCreate && props.OnBlur()}
                  onChange={e =>
                    props.canCreate &&
                    props.handleChangeList(
                      props.nameParent,
                      e.target.name.split('_')[0],
                      e.target.value,
                      index
                    )
                  }
                  readOnly={!props.canCreate}
                  disabled={!props.canCreate}
                />
              </div>
            </div>
          ) : (
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  props.state.foucs === `degreeTitle_${index}` ||
                  handleCheckText(data.degreeTitle)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  عنوان مدرک
                  {/* {props.require ? (
                    <span className='star IranSans_Bold'>*</span>
                  ) : (
                    ''
                  )} */}
                </label>
                <input
                  type='text'
                  name={`degreeTitle_${index}`}
                  value={handleString(data.degreeTitle)}
                  // onFocus={(e) => props.canCreate && props.OnFocus(e.target.name)}
                  // onBlur={() => props.canCreate && props.OnBlur()}
                  // onChange={(e) => props.canCreate && props.handleChangeList(props.nameParent, e.target.name.split('_')[0], e.target.value, index)}
                  readOnly={true}
                  disabled={true}
                />
              </div>
            </div>
          )}
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                props.state.foucs === `numberPages_${index}` ||
                handleCheckText(data.numberPages)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                تعداد صفحات
                {/* {props.out &&
                data.Attachement &&
                data.Attachement.length &&
                props.require ? (
                  <span className='star IranSans_Bold'>*</span>
                ) : (
                  ''
                )} */}
              </label>
              <input
                type='text'
                name={`numberPages_${index}`}
                value={handleString(data.numberPages)}
                onFocus={e => props.canCreate && props.OnFocus(e.target.name)}
                onBlur={() => props.canCreate && props.OnBlur()}
                onChange={e =>
                  props.canCreate &&
                  props.handleChangeList(
                    props.nameParent,
                    e.target.name.split('_')[0],
                    e.target.value,
                    index
                  )
                }
                readOnly={!props.canCreate && !data.documentNumber}
                disabled={!props.canCreate}
              />
            </div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div
              className={`field-form persian textarea ${
                props.state.foucs === `descriptionAttachment_${index}` ||
                handleCheckText(data.descriptionAttachment)
                  ? 'active'
                  : ''
              }`}
            >
              <div className='col p-0'>
                <label className='textarea'>توضیحات</label>
                <textarea
                  className='w-100'
                  type='text'
                  name={`descriptionAttachment_${index}`}
                  onFocus={e =>
                    props.canCreate && props.OnFocus(e.target.name)
                  }
                  onBlur={() => props.canCreate && props.OnBlur()}
                  onChange={e =>
                    props.canCreate &&
                    props.handleChangeList(
                      props.nameParent,
                      e.target.name.split('_')[0],
                      e.target.value,
                      index
                    )
                  }
                  value={handleString(data.descriptionAttachment)}
                  readOnly={!props.canCreate}
                  disabled={!props.canCreate}
                ></textarea>
              </div>
            </div>
          </div>
          {list.length > 1 && props.canCreate && (
            <div className='button-add col-12 row mr-0 ml-0'>
              <button
                className='remove'
                onClick={() => props.handleDelete(props.nameParent, index)}
              >
                <DeleteRoundedIcon />
                حذف
              </button>
            </div>
          )}
        </div>
      ))}

      {props.canCreate && (
        <div className='button-add col-12'>
          <button onClick={() => props.handleAddAttach(props.nameParent)}>
            <AddIcon />
            افزودن مورد جدید
          </button>
        </div>
      )}
    </div>
  )
}
export default AttachedDocument
