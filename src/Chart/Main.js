import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import Chart from './Chart'
export default class MainChart extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className='main'>
        <div className='col-12 p-0'>
          <div className='row m-0'>
            <Sidebar
              handleState={(name, value) => this.setState({ [name]: value })}
              resetStatus={true}
            />
            <div
              className={`${
                this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
              } dashboard`}
            >
              <Menu
                nameRole='Home'
                homeVendor={true}
                nameUrl={this.props.nameUrl}
              />
              <div className='w-100 row m-0 main-box-dashboard'>
                <div className='boxes-dashboard m-0'>
                  <Chart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
