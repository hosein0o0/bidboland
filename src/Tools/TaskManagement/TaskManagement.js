import React, { Component } from 'react'
import Cookies from 'js-cookie'
import StaticData from '../../staticData'
import { Redirect } from 'react-router-dom'
import Sidebar from '../../layout/sidebar'
import SearchTable from '../../table/SearchTable'
import Menu from '../../layout/menu'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SideTask from './SideTask'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded'
import AssignmentReturnRoundedIcon from '@material-ui/icons/AssignmentReturnRounded'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import AllTasks from './AllTasks'
export default class TaskManagement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      itemSide: [
        {
          name: 'تمام وظایف',
          value: 'duties',
          icon: () => <CheckCircleOutlineRoundedIcon />
        },
        {
          name: 'وظایف من',
          value: 'my_duties',
          icon: () => <AssignmentIndRoundedIcon />
        },
        {
          name: 'وظایف من',
          value: 'Assigned_tasks',
          icon: () => <AssignmentReturnRoundedIcon />
        },
        {
          name: 'انجام شده ها',
          value: 'doned',
          icon: () => <DoneAllIcon />
        }
      ],
      _select: 'duties'
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - مدیریت وظایف`
  }
  handleState = (name, value) => {
    this.setState({ [name]: value })
  }
  handleShow = () => {
    const { _select } = this.state
    switch (_select) {
      case 'duties':
        return <AllTasks {...this} />
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
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            <div className='icon'>
                              <a href='#'>
                                <AddCircleIcon />
                                <span>ایجاد کاربرگ</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <SearchTable
                          {...this}
                          handleState={(name, value) =>
                            this.setState({ [name]: value })
                          }
                        />
                      </div>
                    </div>
                    <div className='main-taskManagement'>
                      <div className='row mx-0 w-100'>
                        <SideTask {...this} />
                        <div className='col'>
                          <div className='main-content-taskManagement'>
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
        </div>
      )
    }
  }
}
