import React, { Component } from 'react'
import Menu from '../layout/menu'
import Sidebar from '../layout/sidebar'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Loading from '../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import DoneIcon from '@material-ui/icons/Done'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class UploadlistDatas extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      listData: [
        { name: 'علیرضا کیان', TCLFile: [], TCLFileName: [], description: '' },
        {
          name: 'سید حسین درخشانی',
          TCLFile: [],
          TCLFileName: [],
          description: ''
        },
        {
          name: 'حمیدرضا کوچک زاده',
          TCLFile: [],
          TCLFileName: [],
          description: ''
        }
      ]
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title}- بارگزاری اسناد و توضیحات`
  }
  deleteFile = async (key, num, files, names) => {
    let listData = await this.state.listData
    let obj = await listData[key]
    let data1 = await obj[files]
    let data2 = await obj[names]
    await data1.splice(num, 1)
    await data2.splice(num, 1)
    await this.setState({ listData: listData })
  }
  handleUpload = async (e, files, names) => {
    await e.preventDefault()
    await this.setState({ loading: files })
    names = await names.split('_')[0]
    let key = await parseInt(files.split('_')[1])
    files = await files.split('_')[0]
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
    let datareg = new FormData()
    let array = this.state.listData[key][nameState],
      arrayName = this.state.listData[key][names]
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/Transmittal`,
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
          let listData = await this.state.listData
          let obj = await listData[key]
          obj[nameState] = await array
          obj[names] = await arrayName
          await this.setState({ listData: listData })
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
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChangeList = e => {
    let list = this.state.listData
    let key = e.target.name.split('_')[1]
    let name = e.target.name.split('_')[0]
    let obj = list[key]
    obj[name] = e.target.value
    this.setState({ listData: list })
  }
  render () {
    if (!this.state.token) {
      return <Redirect to='/Login' />
    } else {
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              <Sidebar
                handleState={(name, value) => this.setState({ [name]: value })}
              />
              <div
                className={`${
                  this.state._close
                    ? 'mainSideClose'
                    : 'col-xl-10 col-lg-10 p-0'
                } dashboard`}
              >
                <Menu nameRole='' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>بارگزاری اسناد و توضیحات</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row justify-content-start'>
                          {this.state.listData.map((data, key) => (
                            <div className='w-100 mt-1 mb-2' key={key}>
                              <div className='title-password col-12 mt-2 mb-3'>
                                <h2 className='IranSans_Bold'>
                                  ارسال TCL به سازنده
                                  <strong className='mr-1'>
                                    ({data.name})
                                  </strong>
                                </h2>
                                <div className='line'></div>
                              </div>
                              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                <div className={`field-form persian`}>
                                  <label>
                                    پیوست فایل PDF
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <div className='allName col row m-0 justify-content-end'>
                                    {data.TCLFileName.map((name, index) => (
                                      <span key={index}>
                                        <CloseRoundedIcon
                                          onClick={() =>
                                            this.deleteFile(
                                              key,
                                              index,
                                              'TCLFile',
                                              'TCLFileName'
                                            )
                                          }
                                        />
                                        {name}
                                      </span>
                                    ))}
                                  </div>
                                  <input
                                    name={`TCLFile_${key}`}
                                    className='d-none'
                                    type='file'
                                    id={`TCLFile_${key}`}
                                    multiple
                                    onChange={e =>
                                      this.handleUpload(
                                        e,
                                        `TCLFile_${key}`,
                                        `TCLFileName_${key}`
                                      )
                                    }
                                    accept='*'
                                  />
                                  <label
                                    className='upload-label'
                                    htmlFor={`TCLFile_${key}`}
                                  >
                                    {this.state.loading === `TCLFile_${key}` ? (
                                      <Loading className='form-loader w-auto' />
                                    ) : (
                                      <AttachFileIcon />
                                    )}
                                    آپلود فایل
                                  </label>
                                </div>
                              </div>
                              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                <div
                                  className={`field-form persian textarea ${
                                    this.state.foucs === `description_${key}` ||
                                    handleCheckText(data.description)
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <div className='col p-0'>
                                    <label className='textarea'>توضیحات</label>
                                    <textarea
                                      className='w-100'
                                      type='text'
                                      name={`description_${key}`}
                                      onFocus={e => this.OnFocus(e.target.name)}
                                      onBlur={this.OnBlur}
                                      value={handleString(data.description)}
                                      onChange={this.handleChangeList}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className='submit-form col-12 mt-5'>
                            <button disabled={this.state.disabled}>
                              {this.state.loading === 'submit' ? (
                                <Loading className='form-loader' />
                              ) : (
                                <DoneIcon />
                              )}
                              ثبت اطلاعات
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
