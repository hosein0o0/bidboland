import React, { Component } from 'react'
import DonutLargeRoundedIcon from '@material-ui/icons/DonutLargeRounded'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import EmailRoundedIcon from '@material-ui/icons/EmailRounded'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded'
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded'
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded'
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded'
import TuneRoundedIcon from '@material-ui/icons/TuneRounded'
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded'
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded'
import AssessmentIcon from '@material-ui/icons/Assessment'
import StaticData from '../staticData'
import Permision from '../permision/permision'

export default class dashboardRampco extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      boxes: [
        {
          text: 'پروژه در یک نگاه',
          icon: e => <DonutLargeRoundedIcon style={{ fill: e }} />,
          backColor: '#ffebed',
          textColor: '#f44236',
          path: `${StaticData.FrontIp}/lastSituation`,
          target: '_blank',
          nameRole: ''
        },
        {
          text: 'داشبورد مهندسی',
          icon: e => <SettingsRoundedIcon style={{ fill: e }} />,
          backColor: '#f3e5f6',
          textColor: '#9c28b1',
          path: `#`,
          nameRole: ''
        },
        {
          text: 'مدیریت مکاتبات',
          icon: e => <EmailRoundedIcon style={{ fill: e }} />,
          backColor: '#e8eaf6',
          textColor: '#3f51b5',
          path: '/correspondence',
          nameRole: 'correspondence'
        },
        {
          text: 'تقویم',
          icon: e => <DateRangeRoundedIcon style={{ fill: e }} />,
          backColor: '#e1f5fe',
          textColor: '#03a9f5',
          nameRole: '',
          path: '/calendar'
        },
        {
          text: 'آخرین وضعیت پروژه',
          icon: e => <EqualizerRoundedIcon style={{ fill: e }} />,
          backColor: '#e0f2f2',
          textColor: '#009788',
          nameRole: ''
        },
        {
          text: 'مدیریت کالا',
          icon: e => <ShoppingCartRoundedIcon style={{ fill: e }} />,
          backColor: '#ebfadb',
          textColor: '#82c236',
          nameRole: ''
        },
        {
          text: 'مدیریت جلسات',
          icon: e => <SupervisorAccountRoundedIcon style={{ fill: e }} />,
          backColor: '#fffcdf',
          textColor: '#f9a825',
          path: '/index-metting',
          nameRole: ''
        },
        {
          text: 'کتاب خانه دارا',
          icon: e => <MenuBookRoundedIcon style={{ fill: e }} />,
          backColor: '#fff2df',
          textColor: '#ef6c00',
          path: '/dashboard_library',
          nameRole: ''
        },
        {
          text: 'گزارش روزانه',
          icon: e => <AssessmentIcon style={{ fill: e }} />,
          backColor: '#fbe4ec',
          textColor: '#ea1e63',
          path: '/daily-report',
          nameRole: ''
        },
        {
          text: 'مدیریت ساخت و نصب',
          icon: e => <TuneRoundedIcon style={{ fill: e }} />,
          backColor: '#eee8f6',
          textColor: '#673bb7',
          nameRole: ''
        },
        {
          text: 'دفترچه یادداشت',
          icon: e => <LibraryBooksRoundedIcon style={{ fill: e }} />,
          backColor: '#e4f2fd',
          textColor: '#1d89e4',
          nameRole: ''
        },
        {
          text: 'گالری تصاویر',
          icon: e => <PhotoLibraryRoundedIcon style={{ fill: e }} />,
          backColor: '#e8f6e9',
          textColor: '#4cb050',
          path: '/gallery',
          nameRole: 'gallery'
        }
      ],
      number: null
    }
  }
  render () {
    return this.state.boxes.map((box, key) =>
      this.Permision.handlePermision(this.props.role, box.nameRole) ? (
        <div
          key={key}
          className='col-xl-3 col-lg-4 col-md-6 col-12 p-2 main-box'
        >
          <a
            className='link-box-dashboard'
            href={box.path ? box.path : '#'}
            // target={box.target ? box.target : ''}
          >
            <div
              className='box-dashboard'
              style={
                this.state.number === key
                  ? { backgroundColor: box.backColor }
                  : null
              }
              onMouseOver={() => this.setState({ number: key })}
              onMouseOut={() => this.setState({ number: null })}
            >
              <div className='row m-0'>
                <div className='icon-box'>
                  {box.icon(
                    this.state.number === key ? box.textColor : '#363636'
                  )}
                </div>
                <div className='text-box'>
                  <span
                    className='IranSans_Bold'
                    style={
                      this.state.number === key
                        ? { color: box.textColor }
                        : null
                    }
                  >
                    {box.text}
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      ) : (
        ''
      )
    )
  }
}
