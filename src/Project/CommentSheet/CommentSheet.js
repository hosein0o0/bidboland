import React, { Component } from 'react'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import { Redirect } from 'react-router-dom'
// import AddIcon from '@material-ui/icons/Add';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import Cookies from 'js-cookie'
import StaticData from '../../staticData'
// import AttachFileIcon from '@material-ui/icons/AttachFile';
// import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
// import Loading from '../../layout/loading'
// import DeleteIcon from '@material-ui/icons/Delete';
// import axios from 'axios'
// import DoneIcon from '@material-ui/icons/Done';
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
// import Permision from '../../permision/permision'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'

export default class CommentSheet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      popUp: false,
      foucs: '',
      token: Cookies.get('token'),
      CommentSheetNo: '',
      contractNO: '',
      disc: '',
      CommnetSheetDate: '',
      ReplySheetNo: '',
      Rev: '',
      MOM: '',
      ReplayDate: '',
      to: '',
      from: '',
      status: '',
      cc: '',
      TransmittalNo: '',
      class: '',
      MomDate: '',
      TransmittalDate: '',
      documentTitle: '',
      documentNumber: '',
      status2: 'AP',
      LetNumber: ''
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - فرم ترنسمیتال`
    this.fetchData()
  }
  fetchData = () => {
    // axios.get(`${StaticData.domainIp}/transmittal/getFirstDetail`,{
    //     headers: {
    //         'Authorization' : `Bearer ${this.state.token}`
    //     }
    // })
    // .then((response)=>{
    //     if(response.status === 200) {
    //         // this.handlePermision(response.data.role)
    //         let permision = new Permision()
    //         if(permision.handlePermision(response.data.role , 'main_transmittal')){
    //             this.setState({
    //                 Transmittal_No : response.data.content.thisNumber,
    //                 last_Transmittal_NO : response.data.content.lastNumber ,
    //                 Transmittal_Date : response.data.content.created_at ,
    //                 Cotract_No : response.data.content.contractNo ,
    //                 From : response.data.content.from ,
    //                 To : response.data.content.to ,
    //                 approvedBy : response.data.content.approvedBy ,
    //             })
    //         }
    //         //
    //         // this.setState(response.data.content)
    //     }
    // })
    // .catch((err)=>{
    //     this.setState({_404 : true})
    // })
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: handleString(e.target.value) })
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to='/transmittal' />
      } else {
        return (
          <div className='main'>
            <div className='col-12 p-0'>
              <div className='row m-0'>
                <Sidebar
                  handleState={(name, value) =>
                    this.setState({ [name]: value })
                  }
                />
                <div
                  className={`${
                    this.state._close
                      ? 'mainSideClose'
                      : 'col-xl-10 col-lg-10 p-0'
                  } dashboard`}
                >
                  <Menu
                    nameRole='transmittal_comment_sheet'
                    nameUrl={this.props.nameUrl}
                  />
                  <div className='w-100 row m-0 main-box-dashboard'>
                    <div className='boxes-dashboard row m-0 p-0'>
                      <div className='main-form'>
                        <div className='title-from'>
                          <h2>Comment & Reply Sheet</h2>
                        </div>
                        <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                          <div className='form row justify-content-start'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.CommentSheetNo)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  CommentSheet No.
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='CommentSheetNo'
                                  value={handleString(
                                    this.state.CommentSheetNo
                                  )}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.contractNO)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Contarct No.
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='contractNO'
                                  value={handleString(this.state.contractNO)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.disc)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Discipline
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='disc'
                                  value={handleString(this.state.disc)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form data ${
                                  handleCheckText(this.state.CommnetSheetDate)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='icon-field'>
                                  <DateRangeRoundedIcon />
                                </div>
                                <div className='col p-0'>
                                  <label>
                                    Commnet Sheet Date.
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <input
                                    className='text-left'
                                    readOnly={true}
                                    name='CommnetSheetDate'
                                    value={handleString(
                                      this.state.CommnetSheetDate
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.ReplySheetNo)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Reply Sheet No
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='ReplySheetNo'
                                  value={handleString(this.state.ReplySheetNo)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.Rev)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Rev
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='Rev'
                                  value={handleString(this.state.Rev)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.MOM)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  MOM No. (For Open Status)
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='MOM'
                                  value={handleString(this.state.MOM)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.ReplayDate)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Reply Date Sheet
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='ReplayDate'
                                  value={handleString(this.state.ReplayDate)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.to) ? 'active' : ''
                                }`}
                              >
                                <label>
                                  TO
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='to'
                                  value={handleString(this.state.to)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.from)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  From
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='from'
                                  value={handleString(this.state.from)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.status)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Status
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='status'
                                  value={handleString(this.state.status)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.cc) ? 'active' : ''
                                }`}
                              >
                                <label>
                                  CC
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='cc'
                                  value={handleString(this.state.cc)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.TransmittalNo)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Transmittal No
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='TransmittalNo'
                                  value={handleString(this.state.TransmittalNo)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.class)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Class
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='class'
                                  value={handleString(this.state.class)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.MomDate)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  MOM Date
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='MomDate'
                                  value={handleString(this.state.MomDate)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form data ${
                                  handleCheckText(this.state.TransmittalDate)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='icon-field'>
                                  <DateRangeRoundedIcon />
                                </div>
                                <div className='col p-0'>
                                  <label>
                                    Transmittal Date
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <input
                                    className='text-left'
                                    readOnly
                                    name='TransmittalDate'
                                    value={handleString(
                                      this.state.TransmittalDate
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.documentTitle)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Document Title
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='documentTitle'
                                  value={handleString(this.state.documentTitle)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.documentNumber)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Document No
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='documentNumber'
                                  value={handleString(
                                    this.state.documentNumber
                                  )}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
                              <div className='field-radio ltr w-100'>
                                <label>
                                  status :
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <div className='main-radio'>
                                  <div className='radio-button mr-auto ml-auto'>
                                    <input
                                      className='d-none'
                                      type='radio'
                                      id='AP'
                                      onClick={() =>
                                        this.setState({ status2: 'AP' })
                                      }
                                    />
                                    <label htmlFor='AP'>
                                      {this.state.status2 === 'AP' ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      AP
                                    </label>
                                  </div>
                                  <div className='radio-button mr-auto ml-auto'>
                                    <input
                                      className='d-none'
                                      type='radio'
                                      id='AN'
                                      onClick={() =>
                                        this.setState({ status2: 'AN' })
                                      }
                                    />
                                    <label htmlFor='AN'>
                                      {this.state.status2 === 'AN' ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      AN
                                    </label>
                                  </div>
                                  <div className='radio-button mr-auto ml-auto'>
                                    <input
                                      className='d-none'
                                      type='radio'
                                      id='NCM'
                                      onClick={() =>
                                        this.setState({ status2: 'NCM' })
                                      }
                                    />
                                    <label htmlFor='NCM'>
                                      {this.state.status2 === 'NCM' ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      NCM
                                    </label>
                                  </div>
                                  <div className='radio-button mr-auto ml-auto'>
                                    <input
                                      className='d-none'
                                      type='radio'
                                      id='CM'
                                      onClick={() =>
                                        this.setState({ status2: 'CM' })
                                      }
                                    />
                                    <label htmlFor='CM'>
                                      {this.state.status2 === 'CM' ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      CM
                                    </label>
                                  </div>
                                  <div className='radio-button mr-auto ml-auto'>
                                    <input
                                      className='d-none'
                                      type='radio'
                                      id='RJ'
                                      onClick={() =>
                                        this.setState({ status2: 'RJ' })
                                      }
                                    />
                                    <label htmlFor='RJ'>
                                      {this.state.status2 === 'RJ' ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      RJ
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  this.state.foucs === 'LetNumber' ||
                                  handleCheckText(this.state.LetNumber)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>Let No</label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='LetNumber'
                                  value={handleString(this.state.LetNumber)}
                                  onChange={this.handleChange}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                />
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
            {this.state.popUp ? (
              <Sign
                close={e => this.setState({ popUp: e })}
                pictureShow={this.state.approvedBy.sign}
              />
            ) : (
              ''
            )}
          </div>
        )
      }
    }
  }
}
class Sign extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className='backGroundPopup' onClick={() => this.props.close(false)}>
        <div className='col-xl-6 col-lg-10 col-12'>
          <img src={this.props.pictureShow} alt='sign' />
        </div>
      </div>
    )
  }
}
