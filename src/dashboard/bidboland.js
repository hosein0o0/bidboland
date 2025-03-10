import React, { Component } from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import BuildIcon from '@material-ui/icons/Build'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import DescriptionIcon from '@material-ui/icons/Description'
import AssignmentIcon from '@material-ui/icons/Assignment'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
// import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
// import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
// import DashboardIcon from '@material-ui/icons/Dashboard'
import handleString from '../handleString'
export default class dashboardBidBoland extends Component {
  constructor (props) {
    super(props)
    this.state = {
      boxes: [
        // {
        //   text: 'DARA BI',
        //   icon: e => <DashboardIcon style={{ fill: e }} />,
        //   backColor: '#eee8f6',
        //   textColor: '#673bb7',
        //   permission: [''],
        //   path: '/dashboard-report'
        // },
        {
          text: 'مدیریت مهندسی',
          icon: e => <SettingsIcon style={{ fill: e }} />,
          backColor: '#ffebed',
          textColor: '#f44236',
          path: `/dashboard-project-engineering`,
          target: '_blank',
          permission: ['project_engineering', 'main_transmittal', 'secondary_transmittal']
        },
        // {
        //   text: 'مهندسی خرید',
        //   icon: e => <ShoppingCartIcon style={{ fill: e }} />,
        //   backColor: '#f3e5f6',
        //   textColor: '#9c28b1',
        //   path: `/purchase-engineering`,
        //   target: '_blank',
        //   permission: ['purchase_package', 'vpis', 'builders_transmittal']
        // },
        {
          text: 'درخواست خدمات فنی',
          icon: e => <BuildIcon style={{ fill: e }} />,
          backColor: '#e8eaf6',
          textColor: '#3f51b5',
          path: `/new-index-TSR`,
          target: '_blank',
          permission: ['tsr_show']
        },
        {
          text: 'گزارش فنی حوادث',
          icon: e => <WhatshotIcon style={{ fill: e }} />,
          backColor: '#e1f5fe',
          textColor: '#03a9f5',
          path: `/index-ARP`,
          target: '_blank',
          permission: ['arp_show']
        },
        {
          text: 'اسناد مهندسی',
          icon: e => <DescriptionIcon style={{ fill: e }} />,
          backColor: '#e0f2f2',
          textColor: '#009788',
          path: `/engineering-document`,
          target: '_blank',
          permission: ['basic_engineering', 'detail_engineering', 'builders_engineering']
        },
        {
          text: 'اسناد فنی',
          icon: e => <AssignmentIcon style={{ fill: e }} />,
          backColor: '#ebfadb',
          textColor: '#82c236',
          path: `/technical-document`,
          target: '_blank',
          permission: [
            'pfd',
            'p&id',
            'line_list',
            'isometric',
            'instrument',
            '3d_model'
          ]
        },
        {
          text: 'کتابچه های نهایی',
          icon: e => <LibraryBooksIcon style={{ fill: e }} />,
          backColor: '#fffcdf',
          textColor: '#f9a825',
          path: `/final-data-book`,
          target: '_blank',
          permission: [
            'engineering_final_data_book',
            'equipment_final_data_book',
            'construction_final_data_book'
          ]
        },
        // {
        //   text: 'شناسنامه تجهیزات',
        //   icon: e => <FindInPageIcon style={{ fill: e }} />,
        //   backColor: '#fff2df',
        //   textColor: '#ef6c00',
        //   path: `/equipment-identify`,
        //   target: '_blank',
        //   permission: ['', '', '']
        // },
        {
          text: 'بانک استاندارد',
          icon: e => <ImportContactsIcon style={{ fill: e }} />,
          backColor: '#fbe4ec',
          textColor: '#ea1e63',
          path: '/indexLibrary-standard',
          permission: ['standard_bank']
        },
        {
          text: 'گالری تصاویر',
          icon: e => <PhotoLibraryIcon style={{ fill: e }} />,
          backColor: '#e8f6e9',
          textColor: '#4cb050',
          path: '/gallery',
          permission: ['gallery']
        },
        {
          text: 'سوالات متداول',
          icon: e => <FindInPageIcon style={{ fill: e }} />,
          backColor: '#e8f6e9',
          textColor: '#4cb050',
          path: '/index-FAQ',
          permission: ['IndexFAQ']
        },

        // {
        //   text: 'پست الکترونیک',
        //   icon: e => <AlternateEmailIcon style={{ fill: e }} />,
        //   backColor: '#e4f2fd',
        //   textColor: '#1d89e4',
        //   permission: ['email_management'],
        //   path: '/Management-Email'
        // }
      ],
      number: null
    }
  }
  render () {
    return this.state.boxes.map(
      (box, key) =>
        this.props.handleCheckRole(box.permission) && (
          <div
            key={key}
            className='col-xl-3 col-lg-4 col-md-6 col-12 p-2 main-box'
          >
            <a
              className='link-box-dashboard'
              href={box.path ? box.path : '#'}
              //  target={box.target ? box.target : ''}
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
                      {handleString(box.text)}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        )
    )
  }
}
