import React, { Component } from 'react'
import Cookies from 'js-cookie'
import StaticData from '../../staticData'
import { Redirect } from 'react-router-dom'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import Header from './header'
import InBox from './Inbox/InBox'
import AddEmail from './AddEmail'
import DeleteEmail from './DeleteEmail'
import Drafts from './Drafts/Drafts'
export default class ManagementEmail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      select: 'drafts',
      addEmail: false,
      delete: false,
      listEmails: [
        { value: 'hosein@Rieco.ir', label: 'hosein@Rieco.ir' },
        { value: 'alireza@Rieco.ir', label: 'alireza@Rieco.ir' },
        { value: 'hamid@Rieco.ir', label: 'hamid@Rieco.ir' }
      ]
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - مدیریت پست الکترونیک`
  }
  handleState = (name, value) => {
    this.setState({ [name]: value })
  }
  handlleShow = () => {
    const { select } = this.state
    switch (select) {
      case 'inbox':
        return <InBox {...this} />
      case 'drafts':
        return <Drafts {...this} />
      default:
        return ''
    }
  }
  render () {
    if (this.state.token === undefined) {
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
                <Menu
                  nameRole='email_management'
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-email'>
                      <Header {...this} />
                      <div className='main-content-email'>
                        {this.handlleShow()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.addEmail && <AddEmail {...this} />}
          {this.state.delete && <DeleteEmail {...this} />}
        </div>
      )
    }
  }
}
