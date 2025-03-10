import React, { Component } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import Cookies from 'js-cookie'
// import WarningIcon from '@material-ui/icons/Warning';
// import {Link} from 'react-router-dom'
// import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleString from '../handleString'
export default class WelCome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dontShow: false,
      list: [
        {
          label: 'بروز رسانی ها',
          items: [
            {
              value:
                'جهت مشاهده بروز رسانی ها،بعد از وارد شدن به هر صفحه ای لطفا ctrl + f5 را بزنید'
            }
          ]
        },
        // {
        //   label: 'تغییرات',
        //   items: [
        //     {
        //       value:
        //         'به اطلاع رسانده می شود: جهت انتقال داده ها، (TSR 1~263) به حالت غیرفعال در می آیند.',
        //       className: 'strong'
        //     },
        //     {
        //       value: 'از همکاری و بردباری شما سپاسگزاریم.',
        //       noSvg: true,
        //       className: 'strong'
        //     }
        //   ]
        // }
      ]
    }
  }
  componentDidMount() {
    let user = Cookies.get('userDetail')
    if (user) {
      user = JSON.parse(user)
      this.setState(user)
    }
  }
  render() {
    const _list = this.props.list || this.state.list
    return (
      <div className='backGroundPopup'>
        <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
          <div className='box-wellcome'>
            <div className='title-wellcome'>
              <span className='col p-0'>
                {this.props.title || 'تغییرات به روز رسانی'}
                {/* <span className='IranSans_Bold_FA mr-1'>1400/09/08</span> */}
              </span>
              <CloseIcon
                onClick={() => this.props.close(false, this.state.dontShow)}
              />
            </div>
            <div className='main-text main-attention pt-2'>
              {_list.map((data, key) => (
                <div className='items-attention' key={key}>
                  <h1 className='IranSans_Medium_FA'>
                    {key + 1} - {data.label}
                  </h1>
                  <ul>
                    {data.items &&
                      data.items.map((item, index) => (
                        <li
                          className={`align-items-start d-flex my-1 IranSans_Medium_FA ${handleString(
                            item.className
                          )}`}
                          key={index}
                        >
                          <CheckBoxRoundedIcon
                            className={`ml-1 mt-1 ${item.noSvg ? 'opacity-0' : ''
                              }`}
                          />
                          {item.value}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className='row mr-0 ml-0 mt-1 w-100'>
              <div className='accept-dont-show col-6 p-0'>
                <input
                  className='d-none'
                  id='dontShow'
                  type='checkbox'
                  onChange={e => this.setState({ dontShow: e.target.checked })}
                />
                <label className='align-items-center d-flex' htmlFor='dontShow'>
                  {this.state.dontShow ? (
                    <CheckBoxRoundedIcon className='ml-1' />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon className='ml-1' />
                  )}
                  دیگر به من نشان نده
                </label>
              </div>
              <div className='buttons-wellcome col-6 m-0 justify-content-end p-0'>
                <button
                  className='close-button'
                  onClick={() => this.props.close(false, this.state.dontShow)}
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
