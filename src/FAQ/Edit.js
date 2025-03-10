import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import StaticData from '../staticData'
import Form from '../Form/Form'
import Cookies from 'js-cookie'
import FormDrag from './FormDrag'
import ListFiled from './ListFiled'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import handleCheckText from '../handleCheckText'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import handleString from '../handleString'
export default class EditFAQ extends Component {
  constructor (props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    this.state = {
      token: Cookies.get('token'),
      itemForm: [
        { name: 'عنوان ماژول', value: 'title', require: true, rtl: true },
        { name: 'عنوان بخش اصطلاحات', value: 'idiom_title', rtl: true },
        { name: 'توضیحات', value: 'text', textArea: true, rtl: true }
      ],
      definedColumnsList: [],
      objectIdiom: {
        text: '',
        title: ''
      },
      idiom_object: [],
      objectFaq: {
        text: '',
        title: ''
      },
      faq_object: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ویرایش FAQ`
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    this.setState({ id: id })
    if (id) {
      this.fetchData(id)
    }
  }
  fetchData = id => {
    axios
      .get(`${StaticData.domainIp}/FAQ/get/${id}`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(async response => {
        if (response.status === 200) {
          let state = await response.data.content
          if (state) {
            state['faq_object'] = state.faq_object
              ? Object.keys(state.faq_object).map(data => {
                  return state.faq_object[data]
                })
              : []
            state['idiom_object'] = state.idiom_object
              ? Object.keys(state.idiom_object).map(_data => {
                  return state.idiom_object[_data]
                })
              : []
            state['copyTitle'] = state.title
            document.title = `${StaticData.Title} - ویرایش سوالات متداول ${state.title}`
            await this.setState(state)
          }
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
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
    this.setState({ [e.target.name]: handleString(e.target.value) })
  }
  handleEdit = async value => {
    await this.setState({
      numberEdit:
        this.state.numberEdit === `${value.that.props.nameList}_${value.index}`
          ? ''
          : `${value.that.props.nameList}_${value.index}`
    })
  }
  handleSelectDelete = data => {
    const nameList = data.that.props.nameList
    let array = this.state[nameList]
    let key = data.index
    if (array) {
      array.splice(key, 1)
      this.setState({ [nameList]: array })
    }
  }
  handleUpdata = (obj, key, name) => {
    let list = this.state[name]
    list[key] = obj
    this.setState({ [name]: list, numberEdit: '' })
  }
  handleSubmit = async () => {
    let {
      title,
      text,
      idiom_title,
      idiom_object,
      faq_object,
      token,
      module_name,
      id
    } = this.state
    const Ckeck = handleCheckText(title) && handleCheckText(module_name)
    if (Ckeck && id) {
      if (module_name) {
        await this.setState({ loading: 'submit', disabled: true })
        let datareg = await new FormData()
        await datareg.append('module_name', module_name)
        await datareg.append('title', title)
        await datareg.append('text', text)
        await datareg.append('idiom_title', idiom_title)
        await datareg.append(
          'idiom_object',
          JSON.stringify(Object.assign({}, idiom_object))
        )
        await datareg.append(
          'faq_object',
          JSON.stringify(Object.assign({}, faq_object))
        )
        await axios({
          method: 'post',
          url: `${StaticData.domainIp}/FAQ/update/${id}`,
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
                await this.setState({ disabled: false })
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
      }
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  render () {
    return (
      <div className='main'>
        <div className='col-12 p-0'>
          <div className='row m-0'>
            <Sidebar
              handleState={(name, value) => this.setState({ [name]: value })}
            />
            <div
              className={`${
                this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
              } dashboard`}
            >
              <Menu nameRole='faq_create' nameUrl={this.props.nameUrl} />
              <div className='w-100 row m-0 main-box-dashboard'>
                <div className='boxes-dashboard row m-0 p-0'>
                  <div className='main-form'>
                    <div className='title-from'>
                      <h2>ویرایش سوالات متداول {this.state.copyTitle}</h2>
                    </div>
                    <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                      <div className='form row rtl'>
                        <Form {...this} />
                        <div className='w-100 mt-2'>
                          <div className='title-password col-12'>
                            <h2 className='IranSans_Bold mr-2'>اصطلاحات</h2>
                            <div className='line'></div>
                          </div>
                          <ListFiled
                            {...this}
                            handleState={(name, value) =>
                              this.setState({ [name]: value })
                            }
                            name='objectIdiom'
                            nameList='idiom_object'
                          />
                          <FormDrag
                            {...this}
                            getThis={that => (this.that = that)}
                            nameList='idiom_object'
                            handleState={(name, value) =>
                              this.setState({ [name]: value })
                            }
                          />
                        </div>
                        <div className='w-100 mt-2'>
                          <div className='title-password col-12'>
                            <h2 className='IranSans_Bold mr-2'>
                              سوالات متداول
                            </h2>
                            <div className='line'></div>
                          </div>
                          <ListFiled
                            {...this}
                            handleState={(name, value) =>
                              this.setState({ [name]: value })
                            }
                            name='objectFaq'
                            nameList='faq_object'
                          />
                          <FormDrag
                            {...this}
                            getThis={that => (this.that = that)}
                            nameList='faq_object'
                            handleState={(name, value) =>
                              this.setState({ [name]: value })
                            }
                          />
                        </div>
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
