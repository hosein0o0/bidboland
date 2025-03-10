import React, { Component } from 'react'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import Loading from '../../layout/loading'
// import DoneIcon from '@material-ui/icons/Done';
import AttachFileIcon from '@material-ui/icons/AttachFile'
// import StaticData from '../../staticData'
// import axios from 'axios'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'

export default class AddReplay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ReplayList: [],
      foucs: ''
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
    }
  }
  handleMerge = (list1, list2) => {
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
  handleReadOnly = () => {
    if (this.props.props.checkVendor) {
      if (this.props.props.verify === '0') {
        return false
      } else if (
        this.props.props.verify !== '1' &&
        this.props.props.verify !== '2' &&
        !this.props.props.readOnly
      ) {
        return false
      } else return true
    } else return true
  }
  render () {
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
                  {this.handleReadOnly() ? (
                    ''
                  ) : (
                    <input
                      className='d-none'
                      type='radio'
                      id={`yes_${this.props._key}`}
                      onClick={() =>
                        this.props.ChangeStatusComment(`A_${this.props._key}`)
                      }
                    />
                  )}
                  <label htmlFor={`yes_${this.props._key}`}>
                    {this.props.replay.statusComment === `A` ? (
                      <RadioButtonCheckedIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                    Conclusion Required
                  </label>
                </div>
                <div className='radio-button'>
                  {this.handleReadOnly() ? (
                    ''
                  ) : (
                    <input
                      className='d-none'
                      type='radio'
                      id={`no_${this.props._key}`}
                      onClick={() =>
                        this.props.ChangeStatusComment(`NA_${this.props._key}`)
                      }
                    />
                  )}
                  <label htmlFor={`no_${this.props._key}`}>
                    {this.props.replay.statusComment === `NA` ? (
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
                handleCheckText(this.props.replay.text) ||
                this.props.state.foucs === `text_${this.props._key}`
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
                  name={`text_${this.props._key}`}
                  value={handleString(this.props.replay.text)}
                  readOnly={this.handleReadOnly()}
                  onFocus={e =>
                    this.handleReadOnly()
                      ? ''
                      : this.props.OnFocus(e.target.name)
                  }
                  onChange={e =>
                    this.handleReadOnly() ? '' : this.props.handleChange(e)
                  }
                  onBlur={() =>
                    this.handleReadOnly() ? '' : this.props.OnBlur()
                  }
                ></textarea>
              </div>
            </div>
          </div>

          <div className='col-xl-12 col-lg-12 col-md-12 col-12 p-0'>
            <div className={`field-form`}>
              <label>PDF Attachment</label>

              <div
                className={`allName english col row m-0 justify-content-end ${
                  this.handleReadOnly() ? 'pr-2' : ''
                }`}
              >
                {this.handleReadOnly() ? (
                  this.props.replay.AttachmentFileName.length === 0 ? (
                    <span>موردی وجود ندارد</span>
                  ) : (
                    this.handleMerge(
                      this.props.replay.AttachmentFile,
                      this.props.replay.AttachmentFileName
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
                  this.props.replay.AttachmentFileName.map((name, key) => (
                    <span key={key}>
                      <CloseRoundedIcon
                        onClick={() =>
                          this.props.deleteFile(
                            this.props._key,
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
              {this.handleReadOnly() ? (
                ''
              ) : (
                <React.Fragment>
                  <input
                    className='d-none'
                    type='file'
                    id={`pdf_${this.props._key}`}
                    multiple
                    onChange={e =>
                      this.props.handleUpload(
                        e,
                        `AttachmentFile_${this.props._key}`,
                        `AttachmentFileName_${this.props._key}`
                      )
                    }
                  />
                  <label
                    className='upload-label signEnglish'
                    htmlFor={`pdf_${this.props._key}`}
                  >
                    {this.props.state.loading ===
                    `AttachmentFile_${this.props._key}` ? (
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
                  this.handleReadOnly() ? 'pr-2' : ''
                }`}
              >
                {this.handleReadOnly() ? (
                  this.props.replay.NativeFileName.length === 0 ? (
                    <span>موردی وجود ندارد</span>
                  ) : (
                    this.handleMerge(
                      this.props.replay.NativeFile,
                      this.props.replay.NativeFileName
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
                  this.props.replay.NativeFileName.map((name, key) => (
                    <span key={key}>
                      <CloseRoundedIcon
                        onClick={() =>
                          this.props.deleteFile(
                            this.props._key,
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
              {this.handleReadOnly() ? (
                ''
              ) : (
                <React.Fragment>
                  <input
                    className='d-none'
                    type='file'
                    id={`native_${this.props._key}`}
                    multiple
                    onChange={e =>
                      this.props.handleUpload(
                        e,
                        `NativeFile_${this.props._key}`,
                        `NativeFileName_${this.props._key}`
                      )
                    }
                  />
                  <label
                    className='upload-label signEnglish'
                    htmlFor={`native_${this.props._key}`}
                  >
                    {this.props.state.loading ===
                    `NativeFile_${this.props._key}` ? (
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
  }
}
