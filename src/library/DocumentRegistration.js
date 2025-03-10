import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import Form from '../Form/Form'
import { Redirect } from 'react-router-dom'
// import handleCheckText from '../handleCheckText'
// import getCustomFormat from '../getCustomFormat'
import CancelButton from '../layout/CancelButton'
import handleCheckText from '../handleCheckText'
export default class DocumentRegistration extends Component {
  constructor (props) {
    super(props)
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.author = []
    this.category = []
    this.language = []
    this.publisher = []
    this.state = {
      token: Cookies.get('token'),
      itemForm: [],
      file_address: [],
      file_addressName: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ایجاد مدرک`
    this.fetchData()
  }
  handleItemForm = content => {
    const list = [
      { name: 'عنوان', value: 'title', rtl: true, require: true },
      { name: 'زیرعنوان', rtl: true, value: 'subtitle', require: true },
      {
        name: 'شماره بازنگری',
        value: 'edition',
        require: true,
        rtl: true,
        require: true
      },
      {
        name: 'دسته بندی',
        value: 'category',
        select: true,
        rtl: true,
        listItem: content.category,
        require: true
      },
      {
        name: 'فایل',
        value: 'file_address',
        upload: true,
        accept: '*',
        rtl: true,
        single: true,
        require: true
      },
      {
        name: 'نویسنده',
        value: '_author',
        rtl: true,
        multi: true,
        list: content.author,
        multiselect: false,
        require: true
      },
      {
        name: 'ناشر',
        value: 'publisher',
        select: true,
        rtl: true,
        listItem: content.publisher,
        require: true
      },
      {
        name: 'سال انتشار',
        value: 'year',
        require: true,
        rtl: true,
        type: 'number',
        maxLength: 4
      },
      {
        name: 'حجم فایل',
        value: 'size',
        rtl: true
      },
      {
        name: 'پسوند فایل',
        value: 'ext',
        rtl: true
      },
      {
        name: 'تعداد صفحه',
        value: 'pages',
        require: true,
        rtl: true,
        type: 'number'
      },
      {
        name: 'زبان',
        value: 'language',
        select: true,
        rtl: true,
        listItem: content.language
      },
      {
        name: 'پیش نویس',
        value: 'draft',
        rtl: true,
        checkBox: true
      }
    ]
    return list
  }
  fetchData = async () => {
    const { token } = this.state
    let url = `${StaticData.domainIp}/LibraryManager/getFirstDetail`
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async response => {
        this.setState({ loading: '' })
        if (response.status === 200) {
          const content = response.data.content
          await this.handleItemForm(content)
          await this.setState({
            role: response.data.role,
            itemForm: this.handleItemForm(content)
          })
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
  handleChange = e => {
    const { value, maxLength, name } = e.target
    this.setState({
      [name]: maxLength !== -1 ? value.slice(0, maxLength) : value
    })
  }
  handleUpload = async (e, files, names) => {
    await e.preventDefault()
    await this.setState({ loading: files })
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = await new FileReader()
      await reader.readAsDataURL(e.target.files[i])
      await this.GetLink(
        files,
        e.target.files[i],
        names,
        e.target.files.length,
        i
      )
    }
  }
  GetLink = (nameState, file, names, length, i) => {
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/equipmentid`,
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
            [nameState]: [response.data.content],
            [names]: [file.name]
          })
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
  deleteFile = async (num, files, names) => {
    let fileList = await this.state[files],
      nameList = await this.state[names]
    if (fileList && nameList) {
      await nameList.splice(num, 1)
      await fileList.splice(num, 1)
      await this.setState({ [files]: fileList, [names]: nameList })
    }
  }
  Reset = () => {
    let obj = {
      category: '',
      edition: '',
      _author: '',
      title: '',
      subtitle: '',
      publisher: '',
      year: '',
      pages: '',
      language: '',
      file_address: [],
      file_addressName: [],
      size: '',
      ext: '',
      draft: false
    }
    this.setState(obj)
  }
  handleSubmit = async status => {
    const {
      category,
      edition,
      _author,
      title,
      subtitle,
      publisher,
      year,
      pages,
      language,
      file_address,
      size,
      ext,
      draft,
      token
    } = await this.state
    const check =
      handleCheckText(category) &&
      handleCheckText(edition) &&
      _author !== undefined &&
      handleCheckText(_author.value) &&
      handleCheckText(title) &&
      handleCheckText(subtitle) &&
      handleCheckText(publisher) &&
      handleCheckText(year) &&
      handleCheckText(pages) &&
      handleCheckText(language) &&
      file_address.length > 0 &&
      handleCheckText(file_address[0])
    if (check) {
      await this.setState({
        disabled: true,
        loading: status ? 'continue' : 'submit'
      })
      let url = `${StaticData.domainIp}/LibraryManager/create`
      let datareg = await new FormData()
      await datareg.append('category', category)
      await datareg.append('edition', edition)
      await datareg.append('_author', _author.value)
      await datareg.append('title', title)
      await datareg.append('subtitle', subtitle)
      await datareg.append('publisher', publisher)
      await datareg.append('year', year)
      await datareg.append('pages', pages)
      await datareg.append('language', language)
      await datareg.append('file_address', file_address[0])
      await datareg.append('size', size)
      await datareg.append('ext', ext)
      await datareg.append('draft', draft ? true : false)
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          await this.setState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              await this.setState({ redirect: !status, disabled: false })
              if (status) {
                this.Reset()
              }
            }, 5000)
          } else {
            await this.setState({ disabled: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({ loading: '', disabled: false })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/library-manager`
          }}
        />
      )
    }
    return (
      <div className='main'>
        <div className='row m-0'>
          <Sidebar
            handleState={(name, value) => this.setState({ [name]: value })}
          />
          <div
            className={`${
              this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
            } dashboard`}
          >
            <Menu nameRole='' nameUrl={this.props.nameUrl} />
            <div className='w-100 row m-0 main-box-dashboard'>
              <div className='boxes-dashboard row m-0 p-0'>
                <div className='main-form'>
                  <div className='title-from'>
                    <h2>ایجاد سند جدید</h2>
                  </div>
                  <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                    <div className='form row rtl'>
                      <Form
                        {...this}
                        handleState={(name, value) =>
                          this.setState({ [name]: value })
                        }
                      />
                      <div className='submit-form rtl col-12 mt-5'>
                        <button
                          onClick={this.handleSubmit}
                          disabled={this.state.disabled}
                        >
                          {this.state.loading === 'submit' ? (
                            <Loading className='form-loader' />
                          ) : (
                            <DoneIcon />
                          )}
                          ثبت اطلاعات
                        </button>
                        <button
                          className='continue mr-3'
                          onClick={() => this.handleSubmit(true)}
                          disabled={this.state.disabled}
                        >
                          {this.state.loading === 'continue' ? (
                            <Loading className='form-loader' />
                          ) : (
                            <DoneIcon />
                          )}
                          ثبت و ادامه
                        </button>
                        <CancelButton redirect='library-manager' />
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
