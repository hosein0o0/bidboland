import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import Cookies from 'js-cookie'
import DatePicker from 'react-datepicker2'
import Select from 'react-select'
import axios from 'axios'
import Permision from '../../permision/permision'
import StaticData from '../../staticData'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import RJ from './RJ'
import AN from './AN'
import CM from './CM'
import Loading from '../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
export default class Transmittal extends Component {
  constructor (props) {
    super(props)
    this.Date = null
    this.text = 'BRS-CS-'
    this.state = {
      popUp: false,
      foucs: '',
      token: Cookies.get('token'),
      cc: '',
      commentSheetDate: '',
      contractNumber: '',
      documentList: [],
      from: '',
      to: '',
      transmittalDate: '',
      transmittalNumber: '',
      CommentSheetNo: this.text,
      MomDate: null,
      MOM: '',
      documentNumberSelected: '',
      documentDetail: {},
      status2: 'AP',
      LetNo: '',
      data: {},
      pictureShow: '',
      redirect: false,
      disabled: false,
      detail: {},
      dateDisabld: '',
      redirectContinue: false
    }
  }
  componentDidMount () {
    this.setState(this.props)
    this.Date = this.props.commentSheetDate
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.props = nextProps
      this.setState(this.props)
      this.Date = this.props.commentSheetDate
    }
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = async e => {
    await this.setState({ [e.target.name]: e.target.value })
  }
  handleBlurCommentSheetNo = e => {
    this.setState({ foucs: '' })
    if (
      !this.state.CommentSheetNo.includes(this.text) &&
      handleCheckText(e.target.value)
    ) {
      this.setState({ CommentSheetNo: this.text + e.target.value })
    }
  }
  handleDocumentNumber = async newValue => {
    await this.setState({ documentNumberSelected: newValue })
    await axios
      .get(
        `${StaticData.domainIp}/commentSheet/getByDocumentCode?documentCode=${newValue.value}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }
      )
      .then(response => {
        if (response.status === 200) {
          let permision = new Permision()
          if (
            permision.handlePermision(response.data.role, 'main_transmittal')
          ) {
            this.setState({
              documentDetail: response.data.content,
              disabled: response.data.content.readonly
            })
            if (response.data.content.readonly) {
              this.setState({
                CommentSheetNo: response.data.content.commentsheet.commentNo,
                commentSheetDate:
                  response.data.content.commentsheet.commentSheetDate,
                LetNo: response.data.content.commentsheet.letterNo,
                MOM: response.data.content.commentsheet.momNo,
                status2: response.data.content.commentsheet.status,
                detail: response.data.content.commentsheet.detail,
                dateDisabld: response.data.content.commentsheet.momDate
              })
            } else {
              this.setState({
                CommentSheetNo: '',
                commentSheetDate: this.Date,
                LetNo: '',
                MOM: '',
                status2: 'AP',
                detail: {}
              })
            }
          }
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
          if (err.response.status === 404) {
            setTimeout(() => {
              this.props.handleBack(true)
            }, 5000)
          }
        }
      })
  }
  handleShow = () => {
    if (this.state.status2 === 'RJ') {
      return (
        <RJ
          foucs={this.state.foucs}
          OnFocus={this.OnFocus}
          OnBlur={this.OnBlur}
          getData={e => this.setState({ data: e })}
          disabled={this.state.disabled}
          detail={this.state.detail}
        />
      )
    } else if (this.state.status2 === 'AN') {
      return (
        <AN
          foucs={this.state.foucs}
          OnFocus={this.OnFocus}
          OnBlur={this.OnBlur}
          getData={e => this.setState({ data: e })}
          disabled={this.state.disabled}
          detail={this.state.detail}
        />
      )
    } else if (this.state.status2 === 'CM') {
      return (
        <CM
          foucs={this.state.foucs}
          OnFocus={this.OnFocus}
          OnBlur={this.OnBlur}
          getData={e => this.setState({ data: e })}
          disabled={this.state.disabled}
          detail={this.state.detail}
        />
      )
    }
  }
  getCustomFormat (inputValue, isGregorian) {
    if (!inputValue) return ''
    const inputFormat = isGregorian ? 'YYYY/M/D' : 'jYYYY/jM/jD'
    return isGregorian
      ? inputValue.locale('es').format(inputFormat)
      : inputValue.locale('fa').format(inputFormat)
  }
  handleSubmit = async status => {
    if (
      this.props.id &&
      handleCheckText(this.state.documentNumberSelected) &&
      handleCheckText(this.state.from) &&
      handleCheckText(this.state.to) &&
      handleCheckText(this.state.cc) &&
      handleCheckText(this.state.CommentSheetNo) &&
      handleCheckText(this.state.status2)
    ) {
      if (status === 'continue') {
        this.setState({ loading: 'submit-continue' })
      } else {
        this.setState({ loading: 'submit' })
      }
      setTimeout(async () => {
        let result = {}
        if (this.state.status2 === 'CM') {
          for (let i = 0; i < this.state.data.length; i++) {
            let CmAttachmentFileResult = await {}
            await this.state.data[i].AttachmentFile.forEach(
              async (data, key) => {
                CmAttachmentFileResult[key] = await data
              }
            )
            this.state.data[i].AttachmentFile = await CmAttachmentFileResult
            let CmNativeFileResult = await {}
            await this.state.data[i].NativeFile.forEach(async (data, key) => {
              CmNativeFileResult[key] = await data
            })
            this.state.data[i].NativeFile = await CmNativeFileResult
            result[i] = await this.state.data[i]
          }
        } else if (this.state.status2 === 'RJ' || this.state.status2 === 'AN') {
          let AttachmentFileResult = await {}
          await this.state.data.AttachmentFile.forEach(async (data, key) => {
            AttachmentFileResult[key] = await data
          })
          this.state.data.AttachmentFile = await AttachmentFileResult
          let NativeFileResult = await {}
          this.state.data.NativeFile.forEach(async (data, key) => {
            NativeFileResult[key] = await data
          })
          this.state.data.NativeFile = await NativeFileResult
          result = await this.state.data
        }
        let datareg = await new FormData()
        await datareg.append('transmittal_id', this.props.id)
        await datareg.append(
          'documentCode',
          this.state.documentNumberSelected.value
        )
        await datareg.append('from', this.state.from)
        await datareg.append('to', this.state.to)
        await datareg.append('cc', this.state.cc)
        await datareg.append('commentNo', this.state.CommentSheetNo)
        await datareg.append('letterNo', this.state.LetNo)
        await datareg.append(
          'momDate',
          this.getCustomFormat(this.state.MomDate, false)
        )
        await datareg.append('momNo', this.state.MOM)
        await datareg.append('status', this.state.status2)
        await datareg.append('detail', JSON.stringify(result))
        await axios({
          method: 'post',
          url: `${StaticData.domainIp}/commentSheet/create`,
          data: datareg,
          headers: {
            Authorization: `Bearer ${
              this.state.token ? this.state.token : null
            }`
          }
        })
          .then(async response => {
            this.setState({ loading: '' })
            if (response.status === 200) {
              Notification.notify(Message.text(900), 'success')
              if (status === 'continue') {
                window.location.reload(true)
              } else {
                await this.setState({ redirect: true })
              }
            } else {
              Notification.notify(Message.text(response.status), 'error')
            }
          })
          .catch(err => {
            this.setState({ loading: '' })
            if (err.response) {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          })
      }, 100)
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to='/project-engineering' />
      } else {
        return (
          <div className='form row justify-content-start ltr'>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form data ${
                  handleCheckText(this.state.transmittalDate) ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>
                    Transmittal Date
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <input
                    className='text-left'
                    readOnly={true}
                    name='transmittalDate'
                    value={handleString(this.state.transmittalDate)}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  handleCheckText(this.state.transmittalNumber) ? 'active' : ''
                }`}
              >
                <label>
                  Transmittal No
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='transmittalNumber'
                  value={handleString(this.state.transmittalNumber)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  handleCheckText(this.state.from) ? 'active' : ''
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
                  handleCheckText(this.state.contractNumber) ? 'active' : ''
                }`}
              >
                <label>
                  Contarct No.
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='contractNumber'
                  value={handleString(this.state.contractNumber)}
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
                className={`field-form data ${
                  handleCheckText(this.state.CommnetSheetDate) ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>
                    Comment Sheet Date.
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <input
                    className='text-left'
                    readOnly={true}
                    name='commentSheetDate'
                    value={handleString(this.state.commentSheetDate)}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div className='field-form selectBox ltr'>
                <Select
                  onChange={newValue => this.handleDocumentNumber(newValue)}
                  name='documentNumberSelected'
                  options={this.state.documentList}
                  value={handleString(this.state.documentNumberSelected)}
                  className='basic-multi-select'
                  classNamePrefix='select'
                  placeholder={
                    <label>
                      Document No
                      <span className='star IranSans_Bold'>*</span>
                    </label>
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.foucs === 'MomDate' ||
                  this.state.MomDate !== null ||
                  handleCheckText(this.state.dateDisabld)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>MOM Date</label>
                  {this.state.disabled ? (
                    <input
                      className='text-left'
                      value={handleString(this.state.dateDisabld)}
                      readOnly={true}
                    />
                  ) : (
                    <DatePicker
                      className='text-left'
                      value={handleString(this.state.MomDate)}
                      persianDigits={true}
                      isGregorian={true}
                      timePicker={false}
                      onChange={MomDate => this.setState({ MomDate })}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.foucs === 'MOM' || handleCheckText(this.state.MOM)
                    ? 'active'
                    : ''
                }`}
              >
                <label>MOM No. (For Open Status)</label>
                <input
                  className='text-left'
                  readOnly={this.state.disabled}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  name='MOM'
                  value={handleString(this.state.MOM)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.foucs === 'CommentSheetNo' ||
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
                  className='text-left'
                  name='CommentSheetNo'
                  value={handleString(this.state.CommentSheetNo)}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={e => this.handleBlurCommentSheetNo(e)}
                  readOnly={this.state.disabled}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.documentTitle ? 'active' : ''
                }`}
              >
                <label>Document Title</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='documentTitle'
                  value={
                    this.state.documentDetail.documentTitle
                      ? this.state.documentDetail.documentTitle
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.revision ? 'active' : ''
                }`}
              >
                <label>Rev</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='revision'
                  value={
                    this.state.documentDetail.revision
                      ? this.state.documentDetail.revision
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.status ? 'active' : ''
                }`}
              >
                <label>P.O.I</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='status'
                  value={
                    this.state.documentDetail.status
                      ? this.state.documentDetail.status
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.replySheetNumber ? 'active' : ''
                }`}
              >
                <label>Reply Sheet No</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='replySheetNumber'
                  value={
                    this.state.documentDetail.replySheetNumber
                      ? this.state.documentDetail.replySheetNumber
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.replySheetDate ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>Reply Sheet Date</label>
                  <input
                    readOnly={true}
                    className='text-left'
                    name='replySheetDate'
                    value={
                      this.state.documentDetail.replySheetDate
                        ? this.state.documentDetail.replySheetDate
                        : ''
                    }
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.disc ? 'active' : ''
                }`}
              >
                <label>Discipline</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='disc'
                  value={
                    this.state.documentDetail.disc
                      ? this.state.documentDetail.disc
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.class ? 'active' : ''
                }`}
              >
                <label>Class</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='class'
                  value={
                    this.state.documentDetail.class
                      ? this.state.documentDetail.class
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.foucs === 'LetNo' ||
                  handleCheckText(this.state.LetNo)
                    ? 'active'
                    : ''
                }`}
              >
                <label>LET No</label>
                <input
                  className='text-left'
                  name='LetNo'
                  readOnly={this.state.disabled}
                  value={handleString(this.state.LetNo)}
                  onChange={this.handleChange}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
              <div className='field-radio w-100'>
                <label>
                  status :<span className='star IranSans_Bold'>*</span>
                </label>
                <div className='main-radio'>
                  <div className='radio-button mr-auto ml-auto'>
                    {this.state.disabled ? (
                      ''
                    ) : (
                      <input
                        className='d-none'
                        type='radio'
                        id='AP'
                        onClick={() => this.setState({ status2: 'AP' })}
                      />
                    )}
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
                    {this.state.disabled ? (
                      ''
                    ) : (
                      <input
                        className='d-none'
                        type='radio'
                        id='AN'
                        onClick={() => this.setState({ status2: 'AN' })}
                      />
                    )}
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
                    {this.state.disabled ? (
                      ''
                    ) : (
                      <input
                        className='d-none'
                        type='radio'
                        id='NCM'
                        onClick={() => this.setState({ status2: 'NCM' })}
                      />
                    )}
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
                    {this.state.disabled ? (
                      ''
                    ) : (
                      <input
                        className='d-none'
                        type='radio'
                        id='CM'
                        onClick={() => this.setState({ status2: 'CM' })}
                      />
                    )}
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
                    {this.state.disabled ? (
                      ''
                    ) : (
                      <input
                        className='d-none'
                        type='radio'
                        id='RJ'
                        onClick={() => this.setState({ status2: 'RJ' })}
                      />
                    )}
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
            {this.handleShow()}
            {handleCheckText(this.state.status2) ? (
              <React.Fragment>
                <div className='title-password col-12'>
                  <h2 className='IranSans_Bold'>Consultant</h2>
                  <div className='line mr-0 ml-3'></div>
                </div>
                {this.state.approvedBy ? (
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div className={`field-form`}>
                      <label>
                        {`${this.state.approvedBy.first_name} ${this.state.approvedBy.last_name}`}
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <label
                        className='upload-label signEnglish'
                        onClick={() =>
                          this.setState({
                            popUp: true,
                            pictureShow: this.state.approvedBy.sign
                          })
                        }
                      >
                        sign
                        <AttachFileIcon />
                      </label>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {this.state.popUp ? (
                  <Sign
                    close={e => this.setState({ popUp: e, pictureShow: '' })}
                    pictureShow={this.state.pictureShow}
                  />
                ) : (
                  ''
                )}
              </React.Fragment>
            ) : (
              ''
            )}
            {this.state.disabled ? (
              ''
            ) : (
              <div className='submit-form justify-content-end col-12 mt-3 mb-3'>
                <button
                  className='justify-content-center'
                  onClick={() => this.handleSubmit('')}
                >
                  ثبت اطلاعات
                  {this.state.loading === 'submit' ? (
                    <Loading className='form-loader' />
                  ) : (
                    <DoneIcon />
                  )}
                </button>
                <button
                  className='ml-3 continue justify-content-center'
                  onClick={() => this.handleSubmit('continue')}
                >
                  ثبت و ادامه
                  {this.state.loading === 'submit-continue' ? (
                    <Loading className='form-loader mr-0 ml-1' />
                  ) : (
                    <DoneIcon className='mr-0 ml-1' />
                  )}
                </button>
              </div>
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
