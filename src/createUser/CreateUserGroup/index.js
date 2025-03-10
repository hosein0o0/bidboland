import React, { Component } from 'react'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import StaticData from '../../staticData'
// import Submit from './Submit'
import SecondBox from './SecondBox'
import APICreate from './API/APICreate'
import UnitOffice from './UnitOffice'
import Category from './Category'
import Access from './access'
export default class CreateUserGroup extends Component {
  constructor(props) {
    super(props)
    this.API = new APICreate(this)
    this.Elm = {}
    this.state = {
      token: Cookies.get('token'),
      accessList: [],
      office_list: [],
      unit_list: [],
      permissionList: [],
      nameGroup_list: [
        { value: 'رئیس', label: 'رئیس' },
        { value: 'مدیر', label: 'مدیر' },
        { value: 'پیمانکار', label: 'پیمانکار' },
        { value: 'سایر', label: 'سایر' }
      ],
      unit_list_for_title: [],
    }
  }
  componentDidMount() {
    document.title = `${StaticData.Title} - ایجاد گروه کاربری`
    const { fetchDateAPI } = this.API
    fetchDateAPI()
  }
  handleState = obj => {
    this.setState(obj)
  }
  render() {
    const { token, redirect, _close } = this.state
    if (!token) {
      return <Redirect to='/Login' />
    } else if (redirect) {
      return <Redirect to='/index-user-group' />
    } else {
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              <Sidebar
                handleState={(name, value) => this.setState({ [name]: value })}
              />
              <div className={`${_close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'} dashboard`}>
                <Menu nameRole='' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>ایجاد گروه کاربری</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row justify-content-start persian'>
                          <Category {...this} />
                          <SecondBox {...this} />
                          <UnitOffice {...this} />
                          <Access {...this} />
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
