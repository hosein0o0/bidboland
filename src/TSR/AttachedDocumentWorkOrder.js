import React, { useEffect, useState } from 'react'
// import CreatableSelect from 'react-select/creatable';
import Loading from '../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import AddIcon from '@material-ui/icons/Add'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import SelectBoxSearchFormWorkOrder from '../Customization/SelectBoxSearchFormWorkOrder'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
const AttachedDocument = props => {
  const [list, setList] = useState([])
  // const handleCheckText = HandleCheckText.handleCheckText
  useEffect(() => {
    if (props.state[props.state.typeWork]) {
      let object = props.state[props.state.typeWork]
      if (object[props.nameParent]) {
        setList(object[props.nameParent])
      }
    }
  }, [props])
  function handleDelete (key) {
    let nameState = props.state.typeWork
    let parentState = props.state[nameState]
    let array = parentState[props.nameParent]
    array.splice(key, 1)
    props.handleState(nameState, parentState)
  }
  async function SearchSelect (name, value, key) {
    let array = await props.state[props.state.typeWork][props.nameParent]
    let obj = await array[key]
    obj[name] = await value
    obj['select'] = await false
    let nameState = await props.state[props.state.typeWork]
    nameState[props.nameParent] = await array
    await props.handleState(props.state.typeWork, nameState)
    if (value.length > 6) {
      await props.props.handleDocumentMdl(value)
    }
  }
  async function CheckBlur (parent, name, index) {
    setTimeout(async () => {
      let array = await props.state[props.state.typeWork][props.nameParent]
      if (array) {
        let obj = await array[index]
        if (!handleCheckText(obj[name]) || !obj.select) {
          obj[name] = await ''
          obj['degreeTitle'] = await ''
          await props.handleState([parent], array)
        }
        await props.OnBlur()
      }
    }, 200)
  }
  return (
    <div className='w-100'>
      <div className='title-password col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>
          {props.out ? 'مدارک ضمیمه خارج از سامانه' : 'مدارک ضمیمه درون سامانه'}
        </h2>
        <div className='line'></div>
      </div>
      {list.length &&
        list.map((data, index) => (
          <div className='w-100 row mr-0 ml-0' key={index}>
            <div className='title-password list-counter col-12 mt-3 mb-2'>
              <h2 className='IranSans_Bold'>{index + 1}</h2>
              <div className='line'></div>
            </div>
            {props.out ? (
              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                <div className={`field-form persian`}>
                  <label>
                    {props.out
                      ? 'مدارک پیوست خارج از سامانه'
                      : 'مدارک پیوست درون سامانه'}
                  </label>
                  <div
                    className={`allName col row m-0 justify-content-end ${
                      props.canCreate && !props.props.show ? '' : 'pl-1'
                    }`}
                  >
                    {data.AttachementName.map((name, key) => (
                      <span key={key}>
                        {props.out && props.canCreate && !props.props.show && (
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
                  {props.canCreate && !props.props.show && (
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
                      props.state.foucs ===
                        `documentNumber_${index}`) ||
                    handleCheckText(data.documentNumber)
                      ? 'active'
                      : ''
                  }`}
                >
                  <label>
                    Document Number
                    {/* {data.Attachement.length > 0 && (
                      <span className='star IranSans_Bold'>*</span>
                    )} */}
                  </label>
                  <input
                    type='text'
                    className='text-left'
                    name={`documentNumber_${index}`}
                    value={handleString(data.documentNumber)}
                    // readOnly={!data.documentNumber}
                    onFocus={e => props.out && props.OnFocus(e.target.name)}
                    onBlur={() => props.out && props.OnBlur()}
                    onChange={e =>
                      props.out &&
                      props.canCreate &&
                      !props.props.show &&
                      props._handleChangeList(
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
            ) : props.canCreate && !props.props.show ? (
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
                  <div className='col-12 p-0'>
                    <label>
                      Document Number
                      {/* <span className='star IranSans_Bold'>*</span> */}
                    </label>
                    <input
                      className='text-left'
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
                          e.target.name.split('__')[1],
                          e.target.value,
                          index
                        )
                      }
                      readOnly={!props.canCreate}
                      disabled={!props.canCreate}
                    />
                  </div>
                  {props.state.foucs ===
                    `${props.nameParent}__documentNumber__${index}` &&
                    handleCheckText(data.documentNumber) &&
                    data.documentNumber.length > 6 && (
                      <SelectBoxSearchFormWorkOrder
                        {...props}
                        index={index}
                        name='documentNumber'
                      />
                    )}
                </div>
              </div>
            ) : (
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form ${
                    handleCheckText(data.documentNumber)
                      ? 'active'
                      : ''
                  }`}
                >
                  <label>
                    Document Number
                    {/* <span className='star IranSans_Bold'>*</span> */}
                  </label>
                  <input
                    type='text'
                    className='text-left'
                    name={`documentNumber_${index}`}
                    value={handleString(data.documentNumber)}
                    readOnly={true}
                    disabled={true}
                  />
                </div>
              </div>
            )}
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  props.state.foucs === `degreeTitle_${index}` ||
                  handleCheckText(data.degreeTitle)
                    ? 'active'
                    : ''
                }`}
              >
                <label>عنوان مدرک</label>
                <input
                  type='text'
                  name={`degreeTitle_${index}`}
                  value={handleString(data.degreeTitle)}
                  onFocus={e => props.OnFocus(e.target.name)}
                  onBlur={() => props.OnBlur()}
                  onChange={e =>
                    props.canCreate &&
                    !props.props.show &&
                    props._handleChangeList(
                      props.nameParent,
                      e.target.name.split('_')[0],
                      e.target.value,
                      index
                    )
                  }
                  readOnly={!props.out || !props.canCreate}
                  disabled={!props.out || !props.canCreate}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  props.state.foucs === `numberPages_${index}` ||
                  handleCheckText(data.numberPages)
                    ? 'active'
                    : ''
                }`}
              >
                <label>تعداد صفحات</label>
                <input
                  type='text'
                  name={`numberPages_${index}`}
                  value={handleString(data.numberPages)}
                  // readOnly={!data.documentNumber}
                  onFocus={e => props.OnFocus(e.target.name)}
                  onBlur={() => props.OnBlur()}
                  onChange={e =>
                    props.canCreate &&
                    !props.props.show &&
                    props._handleChangeList(
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
                    onFocus={e => props.OnFocus(e.target.name)}
                    onBlur={() => props.OnBlur()}
                    onChange={e =>
                      props.canCreate &&
                      !props.props.show &&
                      props._handleChangeList(
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
            {list.length > 1 && props.canCreate && !props.props.show && (
              <div className='button-add col-12 row mr-0 ml-0'>
                <button className='remove' onClick={() => handleDelete(index)}>
                  <DeleteRoundedIcon />
                  حذف
                </button>
              </div>
            )}
          </div>
        ))}
      {props.canCreate && !props.props.show && (
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
