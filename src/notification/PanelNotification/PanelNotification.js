import React, { Component } from 'react'
import Cookies from 'js-cookie'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import MultiSelectBox from '../../Customization/MultiSelectBox'
import CreatableSelect from 'react-select/creatable'
import GroupRoundedIcon from '@material-ui/icons/GroupRounded'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import Loading from '../../layout/loading'
import StaticData from '../../staticData'
export default class PanelNotification extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      mudule: {
        infrastructure: {
          title: 'زیر ساخت',
          list: [
            { value: 'ترنسمیتال زیر ساخت', label: 'ترنسمیتال زیر ساخت' },
            { value: 'ریپلای شیت زیر ساخت', label: 'ریپلای شیت زیر ساخت' },
            { value: 'کامنت شیت زیر ساخت', label: 'کامنت شیت زیر ساخت' }
          ]
        },
        process: {
          title: 'فرآیند',
          list: [
            { value: 'ترنسمیتال فرآیند', label: 'ترنسمیتال فرآیند' },
            { value: 'ریپلای شیت فرآیند', label: 'ریپلای شیت فرآیند' },
            { value: 'کامنت شیت فرآیند', label: 'کامنت شیت فرآیند' }
          ]
        },
        tool: {
          title: 'ابزار',
          list: [
            { value: 'ترنسمیتال ابزار', label: 'ترنسمیتال ابزار' },
            { value: 'ریپلای شیت ابزار', label: 'ریپلای شیت ابزار' },
            { value: 'کامنت شیت ابزار', label: 'کامنت شیت ابزار' }
          ]
        }
      },
      event: {
        infrastructure: {
          title: 'زیر ساخت',
          list: [
            { value: 'ترنسمیتال زیر ساخت', label: 'ترنسمیتال زیر ساخت' },
            { value: 'ریپلای شیت زیر ساخت', label: 'ریپلای شیت زیر ساخت' },
            { value: 'کامنت شیت زیر ساخت', label: 'کامنت شیت زیر ساخت' }
          ]
        },
        process: {
          title: 'فرآیند',
          list: [
            { value: 'ترنسمیتال فرآیند', label: 'ترنسمیتال فرآیند' },
            { value: 'ریپلای شیت فرآیند', label: 'ریپلای شیت فرآیند' },
            { value: 'کامنت شیت فرآیند', label: 'کامنت شیت فرآیند' }
          ]
        },
        tool: {
          title: 'ابزار',
          list: [
            { value: 'ترنسمیتال ابزار', label: 'ترنسمیتال ابزار' },
            { value: 'ریپلای شیت ابزار', label: 'ریپلای شیت ابزار' },
            { value: 'کامنت شیت ابزار', label: 'کامنت شیت ابزار' }
          ]
        }
      },
      userNamesInside: [],
      userNamesOut: [],
      list: [],
      typeEmailInside: 'Tol',
      typeEmailOut: 'Tol',
      notificationTypeInside: 'Notifivation',
      notificationTypeOut: 'Notifivation'
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - مدیریت اطلاع رسانی کاربران`
  }
  handleState = (name, value) => {
    this.setState({ [name]: value })
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
                      <h2>مدیریت اطلاع رسانی کاربران</h2>
                    </div>
                    <div className='col-xl-8 col-lg-12 col-md-12 col-12 pt-3'>
                      <div className='form row justify-content-start'>
                        <div className='w-100'>
                          <div className='title-password col-12 mt-3 mb-2'>
                            <h2 className='IranSans_Bold'>تعیین رویداد</h2>
                            <div className='line'></div>
                          </div>
                          <div className='w-100 my-2 col-12'>
                            <MultiSelectBox
                              {...this}
                              name='mudule'
                              tilte='ماژول'
                            />
                          </div>
                          <div className='w-100 my-2 col-12'>
                            <MultiSelectBox
                              {...this}
                              tilte='رویداد'
                              name='event'
                            />
                          </div>
                        </div>
                        <div className='w-100 row m-0'>
                          <div className='title-password col-12 mt-3 mb-2'>
                            <h2 className='IranSans_Bold'>
                              افزودن کاربران درون سیستمی
                            </h2>
                            <div className='line'></div>
                          </div>
                          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                            <div className='field-form selectBox'>
                              <div className='icon-field'>
                                <GroupRoundedIcon />
                              </div>
                              <div className='col px-0'>
                                <CreatableSelect
                                  value={this.state.userNamesInside}
                                  onChange={newValue =>
                                    this.setState({ userNamesInside: newValue })
                                  }
                                  options={this.state.list}
                                  placeholder={
                                    <label>
                                      نام کاربر/کاربران
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    </label>
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
                            <div className='field-radio align-items-center w-100'>
                              <label>
                                نوع اطلاع رسانی :
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <div className='main-radio'>
                                <div className='radio-button'>
                                  <input
                                    className='d-none'
                                    type='radio'
                                    id='Notifivation'
                                    onClick={() =>
                                      this.setState({
                                        notificationTypeInside: 'Notifivation'
                                      })
                                    }
                                  />
                                  <label htmlFor='Notifivation'>
                                    {this.state.notificationTypeInside ===
                                    'Notifivation' ? (
                                      <RadioButtonCheckedIcon />
                                    ) : (
                                      <RadioButtonUncheckedIcon />
                                    )}
                                    Notifivation
                                  </label>
                                </div>
                                <div className='radio-button'>
                                  <input
                                    className='d-none'
                                    type='radio'
                                    id='E-Mail'
                                    onClick={() =>
                                      this.setState({
                                        notificationTypeInside: 'E-Mail'
                                      })
                                    }
                                  />
                                  <label htmlFor='E-Mail'>
                                    {this.state.notificationTypeInside ===
                                    'E-Mail' ? (
                                      <RadioButtonCheckedIcon />
                                    ) : (
                                      <RadioButtonUncheckedIcon />
                                    )}
                                    E-Mail
                                  </label>
                                </div>
                                <div className='radio-button'>
                                  <input
                                    className='d-none'
                                    type='radio'
                                    id='SMS'
                                    onClick={() =>
                                      this.setState({
                                        notificationTypeInside: 'SMS'
                                      })
                                    }
                                  />
                                  <label htmlFor='SMS'>
                                    {this.state.notificationTypeInside ===
                                    'SMS' ? (
                                      <RadioButtonCheckedIcon />
                                    ) : (
                                      <RadioButtonUncheckedIcon />
                                    )}
                                    SMS
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
                            <div className='field-radio align-items-center w-100 font-normal'>
                              <label>
                                نوع ایمیل :
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <div className='main-radio'>
                                <div className='radio-button'>
                                  <input
                                    className='d-none'
                                    type='radio'
                                    id='To'
                                    onClick={() =>
                                      this.setState({ typeEmailInside: 'To' })
                                    }
                                  />
                                  <label htmlFor='To'>
                                    {this.state.typeEmailInside === 'To' ? (
                                      <CheckBoxRoundedIcon />
                                    ) : (
                                      <CheckBoxOutlineBlankRoundedIcon />
                                    )}
                                    To
                                  </label>
                                </div>
                                <div className='radio-button'>
                                  <input
                                    className='d-none'
                                    type='radio'
                                    id='CC'
                                    onClick={() =>
                                      this.setState({ typeEmailInside: 'CC' })
                                    }
                                  />
                                  <label htmlFor='CC'>
                                    {this.state.typeEmailInside === 'CC' ? (
                                      <CheckBoxRoundedIcon />
                                    ) : (
                                      <CheckBoxOutlineBlankRoundedIcon />
                                    )}
                                    CC
                                  </label>
                                </div>
                                <div className='radio-button'>
                                  <input
                                    className='d-none'
                                    type='radio'
                                    id='Bcc'
                                    onClick={() =>
                                      this.setState({ typeEmailInside: 'Bcc' })
                                    }
                                  />
                                  <label htmlFor='Bcc'>
                                    {this.state.typeEmailInside === 'Bcc' ? (
                                      <CheckBoxRoundedIcon />
                                    ) : (
                                      <CheckBoxOutlineBlankRoundedIcon />
                                    )}
                                    Bcc
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='button-add col-12'>
                            <button
                            // onClick={() => this.handleAdd('purchase_packages')}
                            >
                              <AddIcon />
                              افزودن مورد جدید
                            </button>
                          </div>
                        </div>
                        <div className='w-100 row'>
                          <div className='title-password col-12 mt-3 mb-2'>
                            <h2 className='IranSans_Bold'>
                              تعیین کاربران خارج از سیستم
                            </h2>
                            <div className='line'></div>
                          </div>
                          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                            <div className='field-form selectBox'>
                              <div className='icon-field'>
                                <GroupRoundedIcon />
                              </div>
                              <div className='col px-0'>
                                <CreatableSelect
                                  value={this.state.userNamesOut}
                                  onChange={newValue =>
                                    this.setState({ userNamesOut: newValue })
                                  }
                                  options={this.state.list}
                                  placeholder={
                                    <label>
                                      نام کاربر/کاربران
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    </label>
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
                            <div className='field-radio align-items-center w-100'>
                              <label>
                                نوع اطلاع رسانی :
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <div className='main-radio'>
                                <div className='radio-button'>
                                  <input
                                    className='d-none'
                                    type='radio'
                                    id='NotifivationOut'
                                    onClick={() =>
                                      this.setState({
                                        notificationTypeOut: 'NotifivationOut'
                                      })
                                    }
                                  />
                                  <label htmlFor='Notifivation'>
                                    {this.state.notificationTypeOut ===
                                    'NotifivationOut' ? (
                                      <RadioButtonCheckedIcon />
                                    ) : (
                                      <RadioButtonUncheckedIcon />
                                    )}
                                    Notifivation
                                  </label>
                                </div>
                                <div className='radio-button'>
                                  <input
                                    className='d-none'
                                    type='radio'
                                    id='E-MailOut'
                                    onClick={() =>
                                      this.setState({
                                        notificationTypeOut: 'E-MailOut'
                                      })
                                    }
                                  />
                                  <label htmlFor='E-Mail'>
                                    {this.state.notificationTypeOut ===
                                    'E-MailOut' ? (
                                      <RadioButtonCheckedIcon />
                                    ) : (
                                      <RadioButtonUncheckedIcon />
                                    )}
                                    E-Mail
                                  </label>
                                </div>
                                <div className='radio-button'>
                                  <input
                                    className='d-none'
                                    type='radio'
                                    id='SMSOut'
                                    onClick={() =>
                                      this.setState({
                                        notificationTypeOut: 'SMSOut'
                                      })
                                    }
                                  />
                                  <label htmlFor='SMS'>
                                    {this.state.notificationTypeOut ===
                                    'SMSOut' ? (
                                      <RadioButtonCheckedIcon />
                                    ) : (
                                      <RadioButtonUncheckedIcon />
                                    )}
                                    SMS
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
                            <div className='field-radio align-items-center w-100 font-normal'>
                              <label>
                                نوع ایمیل :
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <div className='main-radio'>
                                <div className='radio-button'>
                                  <input
                                    className='d-none'
                                    type='radio'
                                    id='ToOut'
                                    onClick={() =>
                                      this.setState({ typeEmailOut: 'ToOut' })
                                    }
                                  />
                                  <label htmlFor='ToOut'>
                                    {this.state.typeEmailOut === 'ToOut' ? (
                                      <CheckBoxRoundedIcon />
                                    ) : (
                                      <CheckBoxOutlineBlankRoundedIcon />
                                    )}
                                    To
                                  </label>
                                </div>
                                <div className='radio-button'>
                                  <input
                                    className='d-none'
                                    type='radio'
                                    id='CCOut'
                                    onClick={() =>
                                      this.setState({ typeEmailOut: 'CCOut' })
                                    }
                                  />
                                  <label htmlFor='CCOut'>
                                    {this.state.typeEmailOut === 'CCOut' ? (
                                      <CheckBoxRoundedIcon />
                                    ) : (
                                      <CheckBoxOutlineBlankRoundedIcon />
                                    )}
                                    CC
                                  </label>
                                </div>
                                <div className='radio-button'>
                                  <input
                                    className='d-none'
                                    type='radio'
                                    id='BccOut'
                                    onClick={() =>
                                      this.setState({ typeEmailOut: 'BccOut' })
                                    }
                                  />
                                  <label htmlFor='BccOut'>
                                    {this.state.typeEmailOut === 'BccOut' ? (
                                      <CheckBoxRoundedIcon />
                                    ) : (
                                      <CheckBoxOutlineBlankRoundedIcon />
                                    )}
                                    Bcc
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='button-add col-12'>
                            <button
                            // onClick={() => this.handleAdd('purchase_packages')}
                            >
                              <AddIcon />
                              افزودن مورد جدید
                            </button>
                          </div>
                        </div>
                        <div className='submit-form col-12'>
                          <button
                            // onClick={this.handleContinue}
                            disabled={this.state.disabled}
                          >
                            {this.state.loading === 'continue' ? (
                              <Loading className='form-loader' />
                            ) : (
                              <CheckIcon />
                            )}
                            ثبت اطلاعات
                          </button>
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
