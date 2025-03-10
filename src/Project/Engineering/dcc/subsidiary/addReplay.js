import React from 'react'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import Loading from '../../../../layout/loading'
// import DoneIcon from '@material-ui/icons/Done';
import AttachFileIcon from '@material-ui/icons/AttachFile'
// import StaticData from '../../../../staticData'
// import axios from 'axios'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import handleCheckText from '../../../../handleCheckText'
import handleString from '../../../../handleString'

function AddReplay (props) {
  // constructor(props){
  //     super(props);
  //     this.state = {
  //         ReplayList : [],
  //         foucs : ''
  //     }
  // }
  // componentDidMount(){
  //     // this.setState({ReplayList : props.state.ReplayList})
  // }
  // componentWillReceiveProps(nextProps){
  //     if(props !== nextProps){
  //         props = nextProps
  //     }
  // }
  function handleMerge (list1, list2) {
    let array = []
    if (list1.length === list2.length) {
      for (let i = 0; i < list1.length; i++) {
        let obj = {}
        obj['link'] = list1[i]
        obj['name'] = list2[i]
        array.push(obj)
      }
    }
    return array
  }
  // render(){
  return (
    <div className='col-12 p-0'>
      <div className='w-100 row m-0 main-list-from'>
        <div className='col-12 d-flex align-items-center p-0'>
          <div className='field-radio w-100'>
            <label>
              Comment Status :<span className='star IranSans_Bold'>*</span>
            </label>
            <div className='main-radio'>
              <div className='radio-button'>
                {props.props.readOnly ? (
                  ''
                ) : (
                  <input
                    className='d-none'
                    type='radio'
                    id={`yes_${props._key}`}
                    onClick={() => props.ChangeStatusComment(`A_${props._key}`)}
                  />
                )}
                <label htmlFor={`yes_${props._key}`}>
                  {props.replay.statusComment === `A` ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                  Conclusion Required
                </label>
              </div>
              <div className='radio-button'>
                {props.props.readOnly ? (
                  ''
                ) : (
                  <input
                    className='d-none'
                    type='radio'
                    id={`no_${props._key}`}
                    onClick={() =>
                      props.ChangeStatusComment(`NA_${props._key}`)
                    }
                  />
                )}
                <label htmlFor={`no_${props._key}`}>
                  {props.replay.statusComment === `NA` ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                  Noted
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12 p-0'>
          <div
            className={`field-form textarea ltr ${
              handleCheckText(props.replay.text) ||
              props.state.foucs === `text_${props._key}`
                ? 'active'
                : ''
            }`}
          >
            <div className='col p-0'>
              <label className='textarea'>
                Reply
                <span className='star IranSans_Bold'>*</span>
              </label>
              <textarea
                className='w-100 text-left'
                name={`text_${props._key}`}
                value={handleString(props.replay.text)}
                readOnly={props.props.readOnly}
                onFocus={e =>
                  props.props.readOnly ? '' : props.OnFocus(e.target.name)
                }
                onChange={e =>
                  props.props.readOnly ? '' : props.handleChange(e)
                }
                onBlur={() => (props.props.readOnly ? '' : props.OnBlur())}
              ></textarea>
            </div>
          </div>
        </div>

        <div className='col-xl-12 col-lg-12 col-md-12 col-12 p-0'>
          <div className={`field-form`}>
            <label>PDF Attachment</label>

            <div
              className={`allName english col row m-0 justify-content-end ${
                props.props.readOnly ? 'pr-2' : ''
              }`}
            >
              {props.props.readOnly ? (
                props.replay.AttachmentFileName.length === 0 ? (
                  <span>موردی وجود ندارد</span>
                ) : (
                  handleMerge(
                    props.replay.AttachmentFile,
                    props.replay.AttachmentFileName
                  ).map((data, index) => (
                    <a
                      key={index}
                      href={data.link}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <span>{data.name}</span>
                    </a>
                  ))
                )
              ) : (
                props.replay.AttachmentFileName.map((name, key) => (
                  <span key={key}>
                    <CloseRoundedIcon
                      onClick={() =>
                        props.deleteFile(
                          props._key,
                          key,
                          `AttachmentFile`,
                          `AttachmentFileName`
                        )
                      }
                    />
                    {name}
                  </span>
                ))
              )}
            </div>
            {props.props.readOnly ? (
              ''
            ) : (
              <React.Fragment>
                <input
                  className='d-none'
                  type='file'
                  id={`pdf_${props._key}`}
                  multiple
                  onChange={e =>
                    props.handleUpload(
                      e,
                      `AttachmentFile_${props._key}`,
                      `AttachmentFileName_${props._key}`
                    )
                  }
                />
                <label
                  className='upload-label signEnglish'
                  htmlFor={`pdf_${props._key}`}
                >
                  {props.state.loading === `AttachmentFile_${props._key}` ? (
                    <Loading className='form-loader w-auto mr-2 ml-0' />
                  ) : (
                    <AttachFileIcon className='mr-2 ml-0' />
                  )}
                  upload
                </label>
              </React.Fragment>
            )}
          </div>
        </div>

        <div className='col-xl-12 col-lg-12 col-md-12 col-12 p-0'>
          <div className={`field-form`}>
            <label>Native File Attachment</label>
            <div
              className={`allName english col row m-0 justify-content-end ${
                props.props.readOnly ? 'pr-2' : ''
              }`}
            >
              {props.props.readOnly ? (
                props.replay.NativeFileName.length === 0 ? (
                  <span>موردی وجود ندارد</span>
                ) : (
                  handleMerge(
                    props.replay.NativeFile,
                    props.replay.NativeFileName
                  ).map((data, index) => (
                    <a
                      key={index}
                      href={data.link}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <span>{data.name}</span>
                    </a>
                  ))
                )
              ) : (
                props.replay.NativeFileName.map((name, key) => (
                  <span key={key}>
                    <CloseRoundedIcon
                      onClick={() =>
                        props.deleteFile(
                          props._key,
                          key,
                          `NativeFile`,
                          `NativeFileName`
                        )
                      }
                    />
                    {name}
                  </span>
                ))
              )}
            </div>
            {props.props.readOnly ? (
              ''
            ) : (
              <React.Fragment>
                <input
                  className='d-none'
                  type='file'
                  id={`native_${props._key}`}
                  multiple
                  onChange={e =>
                    props.handleUpload(
                      e,
                      `NativeFile_${props._key}`,
                      `NativeFileName_${props._key}`
                    )
                  }
                />
                <label
                  className='upload-label signEnglish'
                  htmlFor={`native_${props._key}`}
                >
                  {props.state.loading === `NativeFile_${props._key}` ? (
                    <Loading className='form-loader w-auto mr-2 ml-0' />
                  ) : (
                    <AttachFileIcon className='mr-2 ml-0' />
                  )}
                  upload
                </label>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  )
  // }
}
export default AddReplay
