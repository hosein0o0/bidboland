import React, { Component } from 'react'
import Loading from '../../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import axios from 'axios'
import StaticData from '../../staticData'
import AddIcon from '@material-ui/icons/Add'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
export default class CM extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Note: '',
      loading: '',
      array: [
        {
          text: '',
          AttachmentFile: [],
          AttachmentFileName: [],
          NativeFile: [],
          NativeFileName: [],
          DocumentFile: [],
          DocumentFileName: []
        }
      ]
    }
  }
  componentDidMount () {
    if (this.props.disabled) {
      let array = []
      for (let value in this.props.detail) {
        array.push(this.props.detail[value])
      }
      if (Object.keys(this.props.detail).length > 0) {
        this.setState({
          array: array
        })
      }
    } else if (this.props.edit) {
      if (Object.keys(this.props.detail).length > 0) {
        let detail = Object.keys(this.props.detail).map(data => {
          this.props.detail[data].AttachmentFile = Object.keys(
            this.props.detail[data].AttachmentFile
          ).map(_data => {
            return this.props.detail[data].AttachmentFile[_data]
          })
          this.props.detail[data].NativeFile = Object.keys(
            this.props.detail[data].NativeFile
          ).map(_data1 => {
            return this.props.detail[data].NativeFile[_data1]
          })
          this.props.detail[data].DocumentFile = Object.keys(
            this.props.detail[data].DocumentFile
          ).map(_data2 => {
            return this.props.detail[data].DocumentFile[_data2]
          })
          return this.props.detail[data]
        })
        this.setState({ array: detail })
      }
    }
  }
  handleBlur = () => {
    this.props.OnBlur()
    this.props.getData(this.state.array)
  }
  handleUpload = async (e, files, names) => {
    await this.setState({ loading: files })
    let key = await parseInt(names.split('_')[1])
    names = await names.split('_')[0]
    files = await files.split('_')[0]
    if (!this.state[files]) {
      await this.setState({ [files]: [] })
    }
    if (!this.state[names]) {
      await this.setState({ [names]: [] })
    }
    await e.preventDefault()
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = await new FileReader()
      await reader.readAsDataURL(e.target.files[i])
      await this.GetLink(
        files,
        e.target.files[i],
        names,
        e.target.files.length,
        key,
        i
      )
    }
  }
  GetLink = (nameState, file, names, length, key, i) => {
    let array = this.state.array[key][nameState],
      arrayName = this.state.array[key][names]
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/cmmentSheet-CM`,
      data: datareg,
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(async response => {
        if (i + 1 === length) {
          this.setState({ loading: '' })
        }
        if (response.status === 200) {
          await array.push(response.data.content)
          await arrayName.push(file.name)
          let Document = await this.state.array
          let obj = await Document[key]
          obj[nameState] = await array
          obj[names] = await arrayName
          await this.setState({ array: Document })
          setTimeout(async () => {
            await this.props.getData(this.state.array)
          }, 100)
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        this.setState({ loading: '' })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  deleteFile = async (key, num, files, names) => {
    let Document = await this.state.array
    let obj = await Document[key]
    let data1 = await obj[files]
    let data2 = await obj[names]
    await data1.splice(num, 1)
    await data2.splice(num, 1)
    await this.setState({ array: Document })
  }
  handleChange = e => {
    let Document = this.state.array
    let key = parseInt(e.target.name.split('_')[1])
    let obj = Document[key]
    let name = e.target.name.split('_')[0]
    obj[name] = e.target.value
    Document[key] = obj
    this.setState({ array: Document })
  }
  handleAdd = () => {
    let obj = {
      text: '',
      AttachmentFile: [],
      AttachmentFileName: [],
      NativeFile: [],
      NativeFileName: [],
      DocumentFile: [],
      DocumentFileName: []
    }
    this.setState({ array: [...this.state.array, obj] })
  }
  Convertor = (obj, list) => {
    let data = []
    // let counter = 0
    for (let value in obj) {
      let result = {}
      result['link'] = obj[value]
      result['name'] = list[value]
      data.push(result)
      // counter++
    }
    return data
  }
  render () {
    return (
      <React.Fragment>
        {this.state.array.map((data, i) => (
          <div className='col-12'>
            <div className='w-100 row m-0 main-list-from' key={i}>
              <div className='col-xl-12 col-lg-12 col-md-12 col-12 p-0'>
                <div
                  className={`field-form textarea ltr ${
                    this.props.foucs === `text_${i}` || handleCheckText(data.text)
                      ? 'active'
                      : ''
                  }`}
                >
                  <div className='col p-0'>
                    <label className='textarea'>
                      {`text ${i + 1}`}
                      <span className='star IranSans_Bold'>*</span>
                    </label>
                    <textarea
                      className='w-100 text-left'
                      type='text'
                      name={`text_${i}`}
                      value={handleString(data.text)}
                      onFocus={e => this.props.OnFocus(e.target.name)}
                      onChange={e => this.handleChange(e)}
                      onBlur={this.handleBlur}
                      readOnly={this.props.disabled}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className='col-xl-12 col-lg-12 col-md-12 col-12 p-0'>
                <div className={`field-form`}>
                  <label>PDF Attachment</label>
                  <div
                    className={`allName english col row m-0 justify-content-end ${
                      this.props.disabled ? 'pr-2' : ''
                    }`}
                  >
                    {this.props.disabled ? (
                      this.Convertor(
                        data.AttachmentFile,
                        data.AttachmentFileName
                      ).length === 0 ? (
                        <span>موردی وجود ندارد</span>
                      ) : (
                        this.Convertor(
                          data.AttachmentFile,
                          data.AttachmentFileName
                        ).map((file, index) => (
                          <a
                            href={file.link}
                            key={index}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <span>{file.name ? file.name : file.link}</span>
                          </a>
                        ))
                      )
                    ) : (
                      this.Convertor(
                        data.AttachmentFile,
                        data.AttachmentFileName
                      ).map((file, index) => (
                        <span key={index}>
                          <CloseRoundedIcon
                            onClick={() =>
                              this.deleteFile(
                                i,
                                index,
                                `AttachmentFile`,
                                `AttachmentFileName`
                              )
                            }
                          />
                          <a href={file.link} target='_blank' rel='noreferrer'>
                            <span className='p-0'>
                              {file.name ? file.name : file.link}
                            </span>
                          </a>
                        </span>
                      ))
                    )}
                  </div>
                  {this.props.disabled ? (
                    ''
                  ) : (
                    <React.Fragment>
                      <input
                        className='d-none'
                        type='file'
                        id={`pdf_${i}`}
                        multiple
                        onChange={e =>
                          this.handleUpload(
                            e,
                            `AttachmentFile_${i}`,
                            `AttachmentFileName_${i}`
                          )
                        }
                      />
                      <label
                        className='upload-label signEnglish'
                        htmlFor={`pdf_${i}`}
                      >
                        {this.state.loading === `AttachmentFile_${i}` ? (
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
                      this.props.disabled ? 'pr-2' : ''
                    }`}
                  >
                    {this.props.disabled ? (
                      this.Convertor(data.NativeFile, data.NativeFileName)
                        .length === 0 ? (
                        <span>موردی وجود ندارد</span>
                      ) : (
                        this.Convertor(
                          data.NativeFile,
                          data.NativeFileName
                        ).map((file, index) => (
                          <a
                            href={file.link}
                            key={index}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <span>{file.name ? file.name : file.link}</span>
                          </a>
                        ))
                      )
                    ) : (
                      this.Convertor(data.NativeFile, data.NativeFileName).map(
                        (file, index) => (
                          <span key={index}>
                            <CloseRoundedIcon
                              onClick={() =>
                                this.deleteFile(
                                  i,
                                  index,
                                  `NativeFile`,
                                  `NativeFileName`
                                )
                              }
                            />
                            <a
                              href={file.link}
                              target='_blank'
                              rel='noreferrer'
                            >
                              <span className='p-0'>
                                {file.name ? file.name : file.link}
                              </span>
                            </a>
                          </span>
                        )
                      )
                    )}
                  </div>
                  {this.props.disabled ? (
                    ''
                  ) : (
                    <React.Fragment>
                      <input
                        className='d-none'
                        type='file'
                        id={`native_${i}`}
                        multiple
                        onChange={e =>
                          this.handleUpload(
                            e,
                            `NativeFile_${i}`,
                            `NativeFileName_${i}`
                          )
                        }
                      />
                      <label
                        className='upload-label signEnglish'
                        htmlFor={`native_${i}`}
                      >
                        {this.state.loading === `NativeFile_${i}` ? (
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
                  <label>Document Attachment</label>
                  <div
                    className={`allName english col row m-0 justify-content-end ${
                      this.props.disabled ? 'pr-2' : ''
                    }`}
                  >
                    {this.props.disabled ? (
                      this.Convertor(data.DocumentFile, data.DocumentFileName)
                        .length === 0 ? (
                        <span>موردی وجود ندارد</span>
                      ) : (
                        this.Convertor(
                          data.DocumentFile,
                          data.DocumentFileName
                        ).map((file, index) => (
                          <a
                            href={file.link}
                            key={index}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <span>{file.name ? file.name : file.link}</span>
                          </a>
                        ))
                      )
                    ) : (
                      this.Convertor(
                        data.DocumentFile,
                        data.DocumentFileName
                      ).map((file, index) => (
                        <span key={index}>
                          <CloseRoundedIcon
                            onClick={() =>
                              this.deleteFile(
                                i,
                                index,
                                `DocumentFile`,
                                `DocumentFileName`
                              )
                            }
                          />
                          <a href={file.link} target='_blank' rel='noreferrer'>
                            <span className='p-0'>
                              {file.name ? file.name : file.link}
                            </span>
                          </a>
                        </span>
                      ))
                    )}
                  </div>
                  {this.props.disabled ? (
                    ''
                  ) : (
                    <React.Fragment>
                      <input
                        className='d-none'
                        type='file'
                        id={`document_${i}`}
                        multiple
                        onChange={e =>
                          this.handleUpload(
                            e,
                            `DocumentFile_${i}`,
                            `DocumentFileName_${i}`
                          )
                        }
                      />
                      <label
                        className='upload-label signEnglish'
                        htmlFor={`document_${i}`}
                      >
                        {this.state.loading === `DocumentFile_${i}` ? (
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
        ))}
        {this.props.disabled ? (
          ''
        ) : (
          <div className='button-add col-12' onClick={this.handleAdd}>
            <button>
              <AddIcon />
              افزودن مورد جدید
            </button>
          </div>
        )}
      </React.Fragment>
    )
  }
}
