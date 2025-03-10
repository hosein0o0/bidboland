import React, { Component } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import Cookies from 'js-cookie'
import WarningIcon from '@material-ui/icons/Warning'
import { Link } from 'react-router-dom'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import StaticData from '../staticData'
export default class WelCome extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    let user = Cookies.get('userDetail')
    if (user) {
      user = JSON.parse(user)
      this.setState(user)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
    }
  }
  handleText = () => {
    switch (StaticData.ProjectName) {
      case 'BIDBOLAND':
        if (this.props.projectName === 'EDMS') {
          return 'این سامانه به منظور مدیریت و یکپارچه سازی اطلاعات و آرشیو الکترونیکی اسناد طراحی گردیده است.'
        } else if (this.props.projectName === 'PPC') {
          return 'این سامانه به منظور مدیریت و برنامه ریزی تولید محصولات با هدف یکپارچه سازی اطلاعات طراحی گردیده است.'
        }
        break
      case 'RAMPCO':
        return 'این سامانه به منظور مدیریت و یکپارچه سازی اطلاعات جهت کمک در تصمیم گیری های پروژه طراحی گردیده است.'
      default:
        break
    }
  }
  render () {
    return (
      <div className='backGroundPopup'>
        <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
          <div className='box-wellcome'>
            <div className='title-wellcome'>
              <span className='col p-0'>خوشامد گویی و راهنمای اولیه</span>
              <CloseIcon onClick={() => this.props.close(false)} />
            </div>
            <div className='main-text'>
              <p className='bold'>
                همکار عزیز ،{this.state.first_name + ' ' + this.state.last_name}
                <br />
                به {StaticData.status} خوش آمدید !
              </p>
              <p className='text'>{this.handleText()}</p>
            </div>
            <div className='danger'>
              <span className='title-danger'>
                <WarningIcon />
                توصیه ایمنی
              </span>
              <div className='w-100 d-flex align-items-center justify-content-center mt-3 mb-3'>
                <p className='text m-0'>
                  حتما در اولین فرصت رمز عبور خود را تغییر بدهید
                </p>
                <Link className='link-danger' to='/Edit-Profile'>
                  تغییر رمز عبور
                </Link>
              </div>
            </div>
            <div className='buttons-wellcome'>
              <button
                className='close-button'
                onClick={() => this.props.close(false)}
              >
                بستن
              </button>
              {StaticData.ProjectName === 'RAMPCO' && (
                <button className='learn'>
                  <Link to='#'>
                    <ContactSupportIcon />
                    ورود به بخش آموزشی
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
