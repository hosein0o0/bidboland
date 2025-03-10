import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import BasicData from './basicData'
import Cookies from 'js-cookie'
import PositioningExcel from './PositioningExcel'
import ColumnDefinition from './ColumnDefinition'
import RowDrag from './RowDrag'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import StaticData from '../staticData'
import PopupConfirm from '../layout/popupConfirm'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import axios from 'axios'
import handleString from '../handleString'
export default class IndexBuilder extends Component {
  constructor (props) {
    super(props)
    this.that = null
    this.state = {
      token: Cookies.get('token'),
      fileName: '',
      tableTitle: '',
      lineNumberStarted: '',
      history_type: '',
      historical_point_list: '',
      number_of_points: '',
      number_of_samples: '',
      columnDefinition: {
        tagName: '',
        title: '',
        dataType: 'string'
        // dataBaseTitle: ''
      },
      definedColumnsList: [],
      deletedSelected: '',
      loading: '',
      numberEdit: '',
      foucs: '',
      listDataType: [
        { value: 'string', label: 'string' },
        { value: 'text', label: 'text' },
        { value: 'longtext', label: 'longtext' },
        { value: 'enum', label: 'enum' },
        { value: 'int', label: 'int' },
        { value: 'float', label: 'float' },
        { value: 'decimal', label: 'decimal' },
        { value: 'timestamp', label: 'timestamp' },
        { value: 'time', label: 'time' },
        { value: 'boolean', label: 'boolean' }
      ],
      disabled: false,
      redirect: false
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - فرم ساز`
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
  handleChangeLIst = (e, nameState) => {
    let list = this.state[nameState]
    let name = e.target.name.split('_')[0]
    let key = e.target.name.split('_')[1]
    let obj = list[key]
    obj[name] = handleString(e.target.value)
    this.setState({ [nameState]: list })
  }
  handleAddRow = async (obj, checkvalue) => {
    const { definedColumnsList } = await this.state
    let emptyObj = await {
      tagName: '',
      title: '',
      dataType: 'string'
      // dataBaseTitle: ''
    }
    // let ListDataBaseTitle = Object.keys(definedColumnsList).map((data) => { return definedColumnsList[data].dataBaseTitle })
    // let checkRepeat = !ListDataBaseTitle.includes(obj.dataBaseTitle)
    if (checkvalue && this.that !== null) {
      // if (checkRepeat) {
      await this.setState({
        definedColumnsList: [...definedColumnsList, obj],
        columnDefinition: emptyObj
      })
      await this.that.handleUpdate(this.state.definedColumnsList)
      // } else {
      //     Notification.notify(Message.text(922), 'warning');
      // }
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  handleDelete = async () => {
    await this.setState({ loading: 'delete' })
    const { id } = this.state.deletedSelected
    let data = await this.state.definedColumnsList
    await data.splice(id, 1)
    await this.setState({
      definedColumnsList: data,
      deletedSelected: '',
      loading: ''
    })
    await this.that.handleUpdate(this.state.definedColumnsList)
  }
  handleSelectDelete = data => {
    let obj = data.item
    obj['id'] = data.index
    this.setState({ deletedSelected: obj })
  }
  handleEdit = async index => {
    await this.setState({
      numberEdit: this.state.numberEdit === index ? '' : index
    })
  }
  handleUpdata = (obj, key) => {
    let list = this.state.definedColumnsList
    list[key] = obj
    this.setState({ definedColumnsList: list, numberEdit: '' })
  }
  handleSubmit = async () => {
    const {
      tableTitle,
      fileName,
      lineNumberStarted,
      definedColumnsList,
      history_type,
      historical_point_list,
      number_of_points,
      number_of_samples
    } = await this.state
    // let checkExcel = history_type !== '' && historical_point_list !== '' && number_of_points !== '' && number_of_samples !== ''
    if (
      tableTitle &&
      fileName &&
      lineNumberStarted &&
      definedColumnsList.length > 0
    ) {
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      await datareg.append('title', tableTitle)
      await datareg.append('history_type', history_type)
      await datareg.append('historical_point_list', historical_point_list)
      await datareg.append('number_of_points', number_of_points)
      await datareg.append('number_of_samples', number_of_samples)
      await datareg.append('file_name', fileName)
      await datareg.append('data_start_from', lineNumberStarted)
      await datareg.append(
        'table_columns',
        JSON.stringify(Object.assign({}, definedColumnsList))
      )
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/indexMaker/create`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          await this.setState({ loading: '' })
          if (response.status === 200) {
            Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              await this.setState({ disabled: false, redirect: true })
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
  just_english = str => {
    let p = /^[\u0600-\u06FF\s]+$/
    if (!p.test(str)) {
      return true
    }
  }
  render () {
    if (!this.state.token) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return <Redirect to='/list-indexes' />
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
                        <h2>فرم ساز</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row justify-content-start'>
                          <BasicData {...this} />
                          <div className='w-100 mt-2 ltr'>
                            <div className='title-password col-12 rtl'>
                              <h2 className='IranSans_Bold'>
                                تعیین موقعیت اطلاعات در اکسل
                              </h2>
                              <div className='line'></div>
                            </div>
                            <PositioningExcel {...this} />
                          </div>
                          <div className='w-100 mt-2'>
                            <div className='title-password col-12'>
                              <h2 className='IranSans_Bold'>تعریف ستون</h2>
                              <div className='line'></div>
                            </div>
                            <ColumnDefinition
                              {...this}
                              handleState={(name, value) =>
                                this.setState({ [name]: value })
                              }
                            />
                          </div>
                          <div className='w-100 mt-2'>
                            <div className='title-password col-12'>
                              <h2 className='IranSans_Bold'>
                                مدیریت ستون‌های تعریف شده
                              </h2>
                              <div className='line'></div>
                            </div>
                            <RowDrag
                              {...this}
                              getThis={that => (this.that = that)}
                              handleState={(name, value) =>
                                this.setState({ [name]: value })
                              }
                              objFiltered={this.state.objFiltered} 
                            />
                          </div>
                          <div className='submit-form col-12 mt-5'>
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
          {this.state.deletedSelected ? (
            <PopupConfirm
              handleSubmit={this.handleDelete}
              close={() => this.setState({ deletedSelected: '' })}
              number={this.state.deletedSelected.title}
              label={'ستون'}
              loading={this.state.loading}
            />
          ) : (
            ''
          )}
        </div>
      )
    }
  }
}
