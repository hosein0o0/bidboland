import React, { Component } from 'react'
import Loading from '../../../../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import axios from 'axios'
import StaticData from '../../../../staticData'
import Notification from '../../../../notification/notification'
import Message from '../../../../notification/Message'
import handleString from '../../../../handleString'
import handleCheckText from '../../../../handleCheckText'
export default class AN extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      AttachmentFileName: [],
      AttachmentFile: [],
      loading: '',
      NativeFile: [],
      NativeFileName: []
    }
  }
  componentDidMount () {
    if (this.props.disabled) {
      this.setState(this.props.detail)
    } else if (this.props.edit) {
      let state = this.props.detail
      if (state.AttachmentFile && state.NativeFile) {
        state['AttachmentFile'] = Object.keys(
          this.props.detail.AttachmentFile
        ).map(data => {
          return this.props.detail.AttachmentFile[data]
        })
        state['NativeFile'] = Object.keys(this.props.detail.NativeFile).map(
          _data => {
            return this.props.detail.NativeFile[_data]
          }
        )
        this.setState(state)
      }
    }
  }
  handleBlur = () => {
    this.props.OnBlur()
    this.props.getData(this.state)
  }
  handleUpload = (e, files, names) => {
    e.preventDefault()
    this.setState({ loading: files })
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[i])
      this.GetLink(files, e.target.files[i], names, e.target.files.length, i)
    }
  }
  GetLink = (nameState, file, names, length, i) => {
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/transmittal`,
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
          await this.setState({
            [names]: [...this.state[names], file.name],
            [nameState]: [...this.state[nameState], response.data.content]
          })
          setTimeout(async () => {
            await this.props.getData(this.state)
          }, 100)
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
        this.setState({ loading: '' })
      })
  }
  deleteFile = (num, files, names) => {
    let data = this.state[`${files}`],
      data2 = this.state[`${names}`]
    data.splice(num, 1)
    data2.splice(num, 1)
    this.setState({ [files]: data, [names]: data2 })
  }
  Convertor = (obj, list) => {
    let data = []
    for (let value in obj) {
      let result = {}
      result['link'] = obj[value]
      result['name'] = list[value]
      data.push(result)
    }
    return data
  }
  render () {
    return (
      <div className='w-100 row m-0'>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div
            className={`field-form textarea ltr ${
              this.props.foucs === 'text' || handleCheckText(this.state.text)
                ? 'active'
                : ''
            }`}
          >
            <div className='col p-0'>
              <label className='textarea'>
                Note
                <span className='star IranSans_Bold'>*</span>
              </label>
              <textarea
                className='w-100 text-left'
                type='text'
                name='text'
                value={handleString(this.state.text)}
                onFocus={e => this.props.OnFocus(e.target.name)}
                onChange={e => this.setState({ text: e.target.value })}
                onBlur={this.handleBlur}
              ></textarea>
            </div>
          </div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div className={`field-form`}>
            <label>PDF Attachment</label>
            <div className={`allName english col row m-0 justify-content-end`}>
              {/* {this.props.disabled?
                        this.Convertor(this.state.AttachmentFile , this.state.AttachmentFileName).map((data , key)=>
                            <a href={data.link} key={key} target='_blank' rel='noreferrer'>
                                <span>{data.name}</span>
                            </a>
                        )
                        : */}
              {this.Convertor(
                this.state.AttachmentFile,
                this.state.AttachmentFileName
              ).map((data, key) => (
                <span key={key}>
                  <CloseRoundedIcon
                    onClick={() =>
                      this.deleteFile(
                        key,
                        'AttachmentFile',
                        'AttachmentFileName'
                      )
                    }
                  />
                  <a href={data.link} target='_blank' rel='noreferrer'>
                    <span className='p-0'>{data.name}</span>
                  </a>
                </span>
              ))}
            </div>
            {/* {this.props.disabled?
                        ''
                        : */}
            <React.Fragment>
              <input
                className='d-none'
                type='file'
                id='pdf'
                multiple
                onChange={e =>
                  this.handleUpload(e, 'AttachmentFile', 'AttachmentFileName')
                }
              />
              <label className='upload-label signEnglish' htmlFor='pdf'>
                {this.state.loading === 'AttachmentFile' ? (
                  <Loading className='form-loader w-auto mr-2 ml-0' />
                ) : (
                  <AttachFileIcon className='mr-2 ml-0' />
                )}
                upload
              </label>
            </React.Fragment>
            {/* } */}
          </div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div className={`field-form`}>
            <label>Native File Attachment</label>
            <div className={`allName english col row m-0 justify-content-end`}>
              {/* {this.props.disabled?
                        this.Convertor(this.state.NativeFile , this.state.NativeFileName).map((data , key)=>
                            <a href={data.link} key={key} target='_blank' rel='noreferrer'>
                                <span>{data.name}</span>
                            </a>
                        )
                        : */}
              {this.Convertor(
                this.state.NativeFile,
                this.state.NativeFileName
              ).map((data, key) => (
                <span key={key}>
                  <CloseRoundedIcon
                    onClick={() =>
                      this.deleteFile(key, 'NativeFile', 'NativeFileName')
                    }
                  />
                  <a href={data.link} target='_blank' rel='noreferrer'>
                    <span className='p-0'>{data.name}</span>
                  </a>
                </span>
              ))}
            </div>
            {/* {this.props.disabled ?
                        ''
                        : */}
            <React.Fragment>
              <input
                className='d-none'
                type='file'
                id='native'
                multiple
                onChange={e =>
                  this.handleUpload(e, 'NativeFile', 'NativeFileName')
                }
              />
              <label className='upload-label signEnglish' htmlFor='native'>
                {this.state.loading === 'NativeFile' ? (
                  <Loading className='form-loader w-auto mr-2 ml-0' />
                ) : (
                  <AttachFileIcon className='mr-2 ml-0' />
                )}
                upload
              </label>
            </React.Fragment>
            {/* } */}
          </div>
        </div>
      </div>
    )
  }
}
