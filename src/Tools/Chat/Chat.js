import React, { Component } from 'react'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import ContactsList from './ContactsList'
import BoxChat from './BoxChat'
import UserProfile from './UserProfile'
export default class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contacts: [
        {
          name: 'گسترش اندیشه دارا- ریکو',
          about: '',
          phone: '0912 868 22 48',
          email: 'info@rieco.ir',
          location: 'ایران - تهران',
          avatar: '/img/logo.png'
        }
      ],
      userSelected: null
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
              <Menu nameRole='Home' nameUrl={this.props.nameUrl} />
              <div className='w-100 row m-0 main-box-dashboard'>
                <div className='boxes-dashboard m-0 pr-0 pl-0'>
                  <div className='w-100 row mr-0 ml-0 h-100 chat'>
                    <ContactsList
                      {...this}
                      handleState={(name, value) =>
                        this.setState({ [name]: value })
                      }
                    />
                    {this.state.userSelected ? (
                      <React.Fragment>
                        <BoxChat {...this} />
                        <UserProfile {...this} />
                      </React.Fragment>
                    ) : (
                      ''
                    )}
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
