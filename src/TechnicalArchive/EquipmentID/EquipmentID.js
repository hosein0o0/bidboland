import React, { Component } from 'react'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import HeaderForm from './HeaderForm'
// import EquipmentIdDocument from './EquipmentIdDocument'
import Instrumentation from './Instrumentation'
export default class EquipmentID extends Component {
  constructor (props) {
    super(props)
    this.state = {
      equipment_discipline: ''
    }
  }
  handleShow = () => {
    const { equipment_discipline } = this.state
    switch (equipment_discipline) {
      case 'instrumentation':
        return <Instrumentation {...this} />
      default:
        return ''
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
              <Menu nameRole='' nameUrl={this.props.nameUrl} />
              <div className='w-100 row m-0 main-box-dashboard'>
                <div className='boxes-dashboard row m-0 p-0'>
                  <div className='main-form'>
                    <div className='title-from'>
                      <h2>ایجاد مدرک شناسنامه تجهیزات</h2>
                    </div>
                    <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                      <div className='form row ltr'>
                        <div className='w-100 row mx-0'>
                          <HeaderForm
                            {...this}
                            handleState={(name, value) =>
                              this.setState({ [name]: value })
                            }
                          />
                          <div className='col-12'>
                            <div className='line'>
                              <hr />
                            </div>
                          </div>
                        </div>
                        {this.handleShow()}
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
