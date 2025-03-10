import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import NotificationsActiveRoundedIcon from '@material-ui/icons/NotificationsActiveRounded'
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded'
import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Cookies from 'js-cookie'
import axios from 'axios'
import StaticData from '../staticData'
import NOtification from '../notification/notification'
import Message from '../notification/Message'
import FirstLoading from './firstLoading'
import Bulletin from './Bulletin'
import Permision from '../permision/permision'
import ItemSide from './itemSide.js'
import { PanoramaHorizontalSharp } from '@material-ui/icons'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
// import StarIcon from '@material-ui/icons/Star'
import LinkReality from './LinkReality'
export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.wrapperRef = React.createRef()
    this.Permision = new Permision()
    this.state = {
      userDetail: {},
      check: false,
      role: null,
      token: Cookies.get('token'),
      loading: true,
      help: false,
      viedo: false,
      noti: false,
      _404: false,
      event: [],
      unreadMessageNumber: 0,
      swapNumber: 0,
      projectName: '',
      indexMaker: [],
      data: [],
      breadList: null,
      showFAQ: true
      // help : true
    }
  }
  componentDidMount() {
    console.clear()
    // this.GetNotification()
    document.addEventListener('mousedown', this.handleClickOutside)
    this.getRole()
    this.checkByName()
    window.addEventListener('offline', ev => {
      if (ev.type === 'offline') {
        NOtification.notify(Message.text(408), 'error')
      }
    })
    if (this.props.ThisMenu) {
      this.props.ThisMenu(this)
    }
    setInterval(() => {
      this.GetNotification()
    }, 600000)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.checkByName()
      // this.handlleBreadCrumbs()
      if (this.props.ThisMenu) {
        this.props.ThisMenu(this)
      }
    }
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleClickOutside = async event => {
    let { help, titleDetail, reality } = this.refs
    let { swapNumber, noti } = this.state
    if (help && !help.contains(event.target)) {
      this.setState({
        help: false
      })
    }
    if (reality && !reality.contains(event.target)) {
      this.setState({
        open_reality: false
      })
    }
    if (this.wrapperRef) {
      if (noti) {
        if (this.wrapperRef.current !== null) {
          if (
            this.wrapperRef &&
            !this.wrapperRef.current.contains(event.target)
          ) {
            this.setState({
              noti: false,
              unreadMessageNumber: swapNumber
            })
          }
        }
      }
    }
    if (titleDetail && !titleDetail.contains(event.target)) {
      setTimeout(() => {
        this.setState({
          check: false
        })
      }, 200)
    }
  }
  getRole = async () => {
    await this.Permision.GetRole(this, 'menu')
  }
  handleResponse = async (response, status) => {
    setTimeout(() => {
      this.setState({ loading: false })
      this.GetNotification()
    }, 1500)
    if (status === 'response') {
      const { userDetail, role, content } = response.data
      let detail = userDetail || {}
      await this.setState({
        projectName: detail.project,
        role: role,
        checkVendor: role === 'vendor',
        indexMaker: content.indexMaker ? content.indexMaker : [],
        userDetail: detail
      })
      if (response.status === 200) {
        if (StaticData.ProjectName === 'RAMPCO') {
          if (ItemSide.defaultItem[StaticData.ProjectName]) {
            await this.setState({
              data: ItemSide.defaultItem[StaticData.ProjectName]
            })
          }
        } else if (StaticData.ProjectName === 'BIDBOLAND') {
          if (detail.project === 'EDMS') {
            if (ItemSide.defaultItem['BIDBOLAND']) {
              await this.setState({ data: ItemSide.defaultItem['BIDBOLAND'] })
            }
          } else if (detail.project === 'PPC') {
            let list = []
            if (content.indexMaker) {
              await content.indexMaker.forEach(async data => {
                data['path'] = await `dynamic-index-${data.id}`
                await list.push(data)
              })
            }
            if (ItemSide.defaultItem['PPC']) {
              let _list = await ItemSide.defaultItem['PPC']
              let obj = await _list[1]
              obj.items = await list
              await this.setState({ data: _list })
            }
          }
        }
        // await this.handlleBreadCrumbs()
        if (this.props.handleState) {
          this.props.handleState('role', role)
        }
        if (this.props.getRole) {
          this.props.getRole(response, 'response')
        }
      } else {
        NOtification.notify(Message.text(response.status), 'error')
      }
    } else if (status === 'catch') {
      if (this.props.getRole) {
        this.props.getRole(response, 'catch')
      }
      if (response.response) {
        if (response.response.status === 313) {
          this.setState({ _404: true })
        }
        NOtification.notify(Message.text(response.response.status), 'error')
      }
    }
  }
  // handlleBreadCrumbs = () => {
  //   const bd = bidboland,
  //     { data } = this.state
  //   let array = bd.props.children.props.children
  //   let obj = {}
  //   let li = window.location.href.split('/')
  //   let url = li[li.length - 1]
  //   if (array) {
  //     let found = array.filter(
  //       item => item.props.nameUrl === this.props.nameUrl
  //     )
  //     if (found) {
  //       obj = found[0]
  //       if (obj) {
  //         if (this.props.nameUrl === obj.props.nameUrl) {
  //           let filter = data.filter(itemSide =>
  //             itemSide.nameRole.includes(this.props.nameRole)
  //           )
  //           if (filter.length) {
  //             this.setState({ breadList: filter ? filter[0] : null, url: url })
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  logUot = () => {
    Cookies.remove('token')
    Cookies.remove('userDetail')
    window.location.reload(true)
  }
  handleShow = () => {
    if (StaticData.ProjectName === 'BIDBOLAND') {
      if (this.state.projectName === 'EDMS') {
        return (
          <BIDBOLAND
            role={this.state.role}
            Permision={this.Permision}
            handleCheckRole={this.handleCheckRole}
          />
        )
      } else if (this.state.projectName === 'PPC') {
        return (
          <PPC
            role={this.state.role}
            Permision={this.Permision}
            indexMaker={this.state.indexMaker}
          />
        )
      }
    } else if (StaticData.ProjectName === 'RAMPCO') {
      return <Rampco role={this.state.role} Permision={this.Permision} />
    } else if (StaticData.ProjectName === 'Pars') {
      return <Pars role={this.state.role} Permision={this.Permision} />
    }
  }
  showNotification = data => {
    let options = {
      body: data.title,
      icon: '/img/NotificationLogo.png',
      dir: 'rtl'
    }
    new Notification('DARA IDMS', options)
  }
  GetNotification = () => {
    const { token, unreadMessageNumber } = this.state
    axios
      .get(`${StaticData.domainIp}/notification/getLast`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          if (unreadMessageNumber > 0) {
            if (response.data.unreadMessageNumber >= unreadMessageNumber) {
              const list = response.data.event
              const filter = list.filter(data => data.seen === '0')
              filter.forEach(data => this.showNotification(data))
            }
          }
          let state = response.data
          state['swapNumber'] = response.data.unreadMessageNumber
          this.setState(state)
        } else {
          NOtification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        setTimeout(() => {
          this.setState({ loading: false })
        }, 1000)
        if (err.response) {
          NOtification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  handleNotification = async () => {
    if (!this.state.noti) {
      await this.setState({ noti: true })
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/notification/openList`,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          if (response.status === 200) {
            let counter = await 0
            let list = Object.keys(this.state.event).map(data => {
              if (
                !this.state.event[data].url &&
                this.state.event[data].seen === '0'
              ) {
                this.state.event[data].seen = '1'
                counter++
              }
              return this.state.event[data]
            })
            this.setState({
              swapNumber: this.state.swapNumber - counter,
              event: list
            })

            // await this.setState({ noti: true })
          } else {
            NOtification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          if (err.response) {
            NOtification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      await this.setState({ noti: false })
    }
  }
  handleCheckRole = list => {
    let i = 0
    let check = false
    while (i < list.length) {
      check = this.Permision.handlePermision(this.state.role, list[i])
      if (check) {
        break
      }
      i++
    }
    return check
  }
  checkByName = async () => {
    if (this.props.nameUrl) {
      let datareg = await new FormData()
      await datareg.append('name', this.props.nameUrl)
      await axios({
        method: 'get',
        url: `${StaticData.domainIp}/FAQ/checkByName?name=${this.props.nameUrl}`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          let state = this.state
          state['role'] = response.data.role
          state['hasFaq'] = response.data.content
          if (response.status === 200) {
            this.setState(state)
          } else {
            NOtification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          if (err.response) {
            NOtification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  handleFAQ = () => {
    if (this.state.hasFaq) {
      return {
        status: true,
        path: `FAQ-${this.props.nameUrl}`
      }
    } else {
      return {
        status: this.Permision.handlePermision(this.state.role, 'faq_create'),
        path: 'Create-FAQ'
      }
    }
  }
  handleState = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  render() {
    let {
      token,
      checkVendor,
      _404,
      loading,
      role,
      showFAQ,
      noti,
      unreadMessageNumber,
      check,
      userDetail
      // top
    } = this.state
    const { firstLoading, BI, nameUrl } = this.props
    if (token === undefined) {
      return <Redirect href='/Login' />
    } else if (checkVendor) {
      return <Redirect href='/purchase-engineering' />
    } else if (_404) {
      return <Redirect href='/404' />
    } else
      return (
        <div className='menu row m-0'>
          {/* <BreadCrumbs {...this} /> */}
          {loading || firstLoading ? (
            <FirstLoading BI={BI ? true : false} />
          ) : (
            ''
          )}
          {/* {viedo ? (
            <PopUpVideo close={e => this.setState({ viedo: e })} />
          ) : (
            ''
          )} */}
          <div className='col-xl col-lg row m-0 p-0 align-items-center'>
            {this.handleShow()}
            <div className='detail col-xl-6 col-lg-6 col-12 row m-0'>
              {(role !== null) & (role !== 'vendor') ? (
                <React.Fragment>
                  <div className='icon'>
                    <a href='/general-search'>
                      <SearchRoundedIcon />
                    </a>
                    <div className='tooltip'>
                      <span>جستجو</span>
                    </div>
                  </div>
                  <div className='icon' ref='reality'>
                    <span onClick={() => this.setState({ open_reality: !this.state.open_reality })}>
                      <PanoramaHorizontalSharp />
                    </span>
                    {this.state.open_reality ?
                      <LinkReality />
                      :
                      <div className='tooltip'>
                        <span>واقعیت مجازی</span>
                      </div>
                    }
                  </div>
                  {showFAQ && (
                    <div
                      className='icon'
                      ref='help'
                    // onClick={() => this.setState({ help: !help })}
                    >
                      {this.handleFAQ().path === 'FAQ-IndexTSR' ? (
                        <span className='counter-noti _360'></span>
                      ) : (
                        ''
                      )}
                      {this.handleFAQ().status && (
                        <Link
                          to={{
                            pathname: `/${this.handleFAQ().path}`,
                            state: { nameUrl: nameUrl }
                          }}
                        >
                          <ContactSupportRoundedIcon />
                        </Link>
                      )}

                      {/* {help && (
                        <HelpVideo
                          handlePopUpVideo={e => this.setState({ viedo: e })}
                          viedo={viedo}
                        />
                      )} */}
                      <div className='tooltip'>
                        <span>راهنمایی</span>
                      </div>
                    </div>
                  )}
                  {this.Permision.handlePermision(role, 'internal_tell') && (
                    <div className='icon'>
                      <a href='/internal-phonebook'>
                        <PeopleRoundedIcon />
                      </a>
                      <div className='tooltip'>
                        <span>دفترچه تلفن</span>
                      </div>
                    </div>
                  )}
                  <div
                    className={`icon pointer ${noti ? 'justify-content-end' : 'justify-content-center'
                      }`}
                    ref={this.wrapperRef}
                  // onClick={async()=>await this.handleNotification()}
                  >
                    {unreadMessageNumber > 0 && (
                      <span
                        className='counter-noti'
                        onClick={this.handleNotification}
                      >
                        {unreadMessageNumber}
                      </span>
                    )}
                    <span className='item' onClick={this.handleNotification}>
                      <NotificationsActiveRoundedIcon />
                    </span>
                    {noti ? (
                      <Bulletin {...this} />
                    ) : (
                      <div className='tooltip'>
                        <span>اعلانات</span>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ) : (
                ''
              )}
              <div className={`detail-name ${check ? 'active' : ''}`}>
                <div
                  className={`main-tittle-detail ${check ? 'active' : ''}`}
                  ref='titleDetail'
                  onClick={() => this.setState({ check: true })}
                >
                  <div
                    className={`box-name ${handleCheckText(userDetail.profile) ? 'p-0' : ''
                      }`}
                  >
                    {handleCheckText(userDetail.profile) ? (
                      <img src={userDetail.profile} alt='avatar' />
                    ) : (
                      <span>
                        {handleString(userDetail.first_name).charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className='name'>
                    {`${handleString(userDetail.first_name)} ${handleString(
                      userDetail.last_name
                    )}`}
                    <ArrowDropDownIcon />
                  </span>
                </div>
                <div className={`main-detail ${check ? 'active' : 'd-none'}`}>
                  <div className='main-row-detail'>
                    <div className='row-detail'>
                      <a href='/Edit-Profile'>
                        <SettingsIcon />
                        <span> تنظیمات کاربری </span>
                      </a>
                    </div>
                  </div>
                  <div className='row-detail logout' onClick={this.logUot}>
                    <ExitToAppIcon />
                    <span> خروج از حساب </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
function Rampco(props) {
  return (
    <div className='items col-xl-6 col-lg-6 col-12'>
      {(props.role !== null) & (props.role !== 'vendor') ? (
        <ul>
          {props.Permision.handlePermision(props.role, 'TQ') && (
            <li>
              <a href='/tq-index' className='IranSans_Regular'>
                درخواست فنی
              </a>
            </li>
          )}
          {props.Permision.handlePermision(props.role, 'main_transmittal') && (
            <li>
              <a href='/dashboard-project-engineering' className='IranSans_Regular'>
                مهندسی تفصیلی
              </a>
            </li>
          )}
          {(props.Permision.handlePermision(props.role, 'purchase_package') ||
            props.Permision.handlePermision(props.role, 'vpis')) && (
              <li>
                <a href='/purchase-engineering' className='IranSans_Regular'>
                  مهندسی خرید
                </a>
              </li>
            )}
          <li>
            <a href='/RFQ' className='IranSans_Regular'>
              درخواست خرید
            </a>
          </li>
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}
function BIDBOLAND(props) {
  return (
    <div className='items col-xl-6 col-lg-6 col-12'>
      {(props.role !== null) & (props.role !== 'vendor') ? (
        <ul>
          <React.Fragment>
            {props.Permision.handlePermision(props.role, 'tsr_show') && (
              <li className='px-1'>
                <a
                  href='/new-index-TSR'
                  className='IranSans_Regular d-flex align-items-center'
                >
                  TSR
                  {/* <StarIcon className='_star_new' /> */}
                </a>
              </li>
            )}
            {props.Permision.handlePermision(props.role, 'arp_show') && (
              <li className='px-1'>
                <a
                  href='/index-ARP'
                  className='IranSans_Regular d-flex align-items-center'
                >
                  ARP
                  {/* <StarIcon className='_star_new' /> */}
                </a>
              </li>
            )}
          </React.Fragment>
          {props.handleCheckRole([
            'basic_engineering',
            'detail_engineering',
            'builders_engineering'
          ]) && (
              <li className='px-1'>
                <a
                  href='/engineering-document'
                  className='IranSans_Regular'
                >
                  اسناد مهندسی
                </a>
              </li>
            )}
          {props.handleCheckRole([
            'pfd',
            'p&id',
            'line_list',
            'isometric',
            'instrument',
            '3d_model'
          ]) && (
              <li className='px-1'>
                <a href='/technical-document' className='IranSans_Regular'>
                  اسناد فنی
                </a>
              </li>
            )}
          {props.handleCheckRole([
            'engineering_final_data_book',
            'equipment_final_data_book',
            'construction_final_data_book'
          ]) && (
              <li className='px-1'>
                <a
                  href='/final-data-book'
                  className='IranSans_Regular'
                >
                  کتابچه‌های نهایی
                </a>
              </li>
            )}
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}
function PPC(props) {
  return (
    <div className='items col-xl-6 col-lg-6 col-12'>
      {(props.role !== null) & (props.role !== 'vendor') ? (
        <ul>
          {props.indexMaker.map(
            (data, key) =>
              key < 4 && (
                <li key={key}>
                  <a
                    href={`/dynamic-index-${data.id}`}
                    className='IranSans_Regular'
                  >
                    {data.ChName}
                  </a>
                </li>
              )
          )}
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}
function Pars() {
  return (
    <div className='items col-xl-6 col-lg-6 col-12'>
      <ul>
        <li className='px-1'>
          <a
            href='/engineering-document'
            className='IranSans_Regular'
          >
            جداول پروژه
          </a>
        </li>
      </ul>
    </div>
  )
}
// Menu.propTypes = {
//     children: PropTypes.element.isRequired,
// };
