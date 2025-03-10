import React, { Component } from 'react'
import Cookies from 'js-cookie'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import TechnicalServiceApplication from './tsr1/TechnicalServiceApplication'
import ListSign from './ListSign'
import TabsTsr from './tabs'
export default class NewTsr extends Component {
  constructor (props) {
    super(props)
    this.ListSign = ListSign
    this.state = {
      token: Cookies.get('token'),
      ListTab: TabsTsr,
      select: 1,
      listData: []
    }
  }
  hadnleTab = () => {
    let listNumber = []
    if (this.state.select === 1) {
      listNumber = [1, 2, 3, 4]
    } else if (this.state.select > 9) {
      listNumber = [9, 10, 11, 12]
    } else {
      listNumber = [
        this.state.select - 1,
        this.state.select,
        this.state.select + 1,
        this.state.select + 2
      ]
    }
    return listNumber
  }
  handleShowTab = data => {
    let filter = this.state.ListTab.filter(tab => parseInt(tab.id) === data)[0]
    return filter
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
              <Menu
                nameRole=''
                nameUrl={this.props.nameUrl}
                previous={{ name: 'درخواست خدمات فنی', url: 'index-TSR' }}
              />
              <div className='w-100 row m-0 main-box-dashboard'>
                <div className='boxes-dashboard row m-0 p-0'>
                  <div className='main-form'>
                    <div className='title-from'>
                      <h2>{this.state.ListTab[this.state.select - 1].title}</h2>
                    </div>
                    <div className='tab-form rtl'>
                      <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start'>
                        {this.hadnleTab().map((data, key) => (
                          <div
                            className={`col-xl-3 col-lg-3 col-3 mr-0 pr-3 pl-0`}
                            key={key}
                          >
                            <div
                              className={`item-tab rtl mr-0 w-100 p-0 col-12 ${
                                this.state.select ===
                                this.handleShowTab(data).id
                                  ? 'active IranSans_Bold'
                                  : ''
                              }`}
                            >
                              <span>
                                <label
                                  className={`${
                                    this.state.select ===
                                    this.handleShowTab(data).id
                                      ? 'IranSans_Bold'
                                      : ''
                                  }`}
                                >
                                  {this.handleShowTab(data).id}.
                                </label>
                                {this.handleShowTab(data).nameTab}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='col-xl-8 col-lg-12 col-md-12 col-12'>
                      <TechnicalServiceApplication {...this} create={true} />
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
