import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import Loading from '../../layout/loading'
import Form from '../../Form/Form'
import StaticData from '../../staticData'
import DoneIcon from '@material-ui/icons/Done'
export default class CreateInternalPhonebokk extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      itemForm: [
        { name: 'بخش', value: 'part', rtl: true, require: true },
        // { name: "سمت", value: 'position', rtl: true, require: true },
        {
          name: 'سمت',
          value: 'position',
          select: true,
          rtl: true,
          listItem: [
            { label: 'رئیس آتش نشانی', value: 'رئیس آتش نشانی' },
            { label: 'فکس دفترHSE', value: 'فکس دفترHSE' }
          ]
        },
        { name: 'نام و نام خانوادگی', value: 'name', rtl: true, require: true },
        { name: 'شماره داخلی', value: 'tel', rtl: true, require: true }
      ]
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ایجاد دفترچه تلفن`
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/internal-phonebook`
          }}
        />
      )
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
                <Menu
                  nameRole='internal_tell_create'
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>ایجاد دفترچه تلفن جدید</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row rtl'>
                          <Form {...this} />
                          <div className='submit-form rtl col-12 mt-5'>
                            <button
                              // onClick={this.handleSubmit}
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
}
