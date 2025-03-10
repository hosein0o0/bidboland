import React, { Component } from 'react'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import VisibilityIcon from '@material-ui/icons/VisibilityRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Loading from '../../../../layout/loading'
import Cookies from 'js-cookie'
import StaticData from '../../../../staticData'
import axios from 'axios'
import Permision from '../../../../permision/permision'
import Notification from '../../../../notification/notification'
import Message from '../../../../notification/Message'
import DoneIcon from '@material-ui/icons/Done'
import handleCheckText from '../../../../handleCheckText'
import handleString from '../../../../handleString'

export default class TransmittalDisabled extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      popUp: false,
      foucs: '',
      counter: 1,
      token: Cookies.get('token'),
      approveBy: {},
      redirect: false,
      permision: '',
      documents: [],
      pictureShow: '',
      back: false,
      reject: false,
      loading: '',
      disabled: false,
      role: null
    }
  }
  componentDidMount () {
    this.setState(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.props = nextProps
      this.setState(this.props)
    }
  }
  haldeShowName = obj => {
    let allData = []
    for (let value in obj) {
      allData.push(obj[value])
    }
    return allData
  }
  handleSubmit = async (status, message) => {
    if (
      this.state.token &&
      this.Permision.handlePermision(this.state.role, 'transmittal_verify')
    ) {
      let datareg = new FormData()
      if (status === 1) {
        await this.setState({ loading: 'submit' })
        await datareg.append('status', true)
      } else if (status === 0) {
        await datareg.append('status', false)
        await datareg.append('message', message)
        await this.setState({ loading: 'submit-unaccept' })
      }
      this.setState({ disabled: true })
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/transmittal/verify/${this.state.id}`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          await this.setState({ loading: '', popUp: false })
          if (response.status === 200) {
            Notification.notify(Message.text(902), 'success')
            setTimeout(async () => {
              await this.props.changeRedirect(true)
            }, 5000)
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(async err => {
          await this.setState({ loading: '', popUp: false })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  render () {
    return (
      <React.Fragment>
        <div className='form row justify-content-end'>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form ${
                handleCheckText(this.state.id) ? 'active' : ''
              }`}
            >
              <label>
                Transmittal No.
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={true}
                className='text-left'
                name='id'
                value={handleString(this.state.id)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form data ${
                handleCheckText(this.state.created_at) ? 'active' : ''
              }`}
            >
              <div className='icon-field'>
                <DateRangeRoundedIcon />
              </div>
              <div className='col p-0'>
                <label>
                  Transmittal Date.
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='created_at'
                  value={handleString(this.state.created_at)}
                />
              </div>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form ${
                handleCheckText(this.state.contractNo) ? 'active' : ''
              }`}
            >
              <label>
                Contract No.
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={true}
                className='text-left'
                name='contractNo'
                value={handleString(this.state.contractNo)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form ${
                handleCheckText(this.state._from) ? 'active' : ''
              }`}
            >
              <label>
                From.
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={true}
                className='text-left'
                name='_from'
                value={handleString(this.state._from)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form ${
                handleCheckText(this.state.letterNo) ? 'active' : ''
              }`}
            >
              <label>Letter NO.</label>
              <input
                readOnly={true}
                className='text-left'
                name='letterNo'
                value={handleString(this.state.letterNo)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form ${
                handleCheckText(this.state.cc) ? 'active' : ''
              }`}
            >
              <label>CC.</label>
              <input
                readOnly={true}
                name='cc'
                className='text-left'
                value={handleString(this.state.cc)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form ${
                handleCheckText(this.state._to) ? 'active' : ''
              }`}
            >
              <label>
                To.
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={true}
                className='text-left'
                name='_to'
                value={handleString(this.state._to)}
              />
            </div>
          </div>
          <div className='col-12'>
            {this.state.documents.map((data, key) => (
              <div className={`box-add row`} key={key}>
                <div className='w-100 row m-0'>
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div
                      className={`field-form ${
                        handleCheckText(data.disc) ? 'active' : ''
                      }`}
                    >
                      <label>
                        Discipline
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <input
                        name={`disc_${key}`}
                        readOnly={true}
                        value={handleString(data.disc)}
                        className='text-left'
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div
                      className={`field-form ${
                        handleCheckText(data.documentNumber) ? 'active' : ''
                      }`}
                    >
                      <label>
                        Document No.
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <input
                        readOnly={true}
                        className='text-left'
                        name={`documentNumber_${key}`}
                        value={handleString(data.documentNumber)}
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div
                      className={`field-form ${
                        handleCheckText(data.docType) ? 'active' : ''
                      }`}
                    >
                      <label>
                        Doc. Type.
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <input
                        readOnly={true}
                        className='text-left'
                        name={`docType_${key}`}
                        value={handleString(data.docType)}
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div
                      className={`field-form ${
                        handleCheckText(data.description) ? 'active' : ''
                      }`}
                    >
                      <label>
                        Document Description
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <input
                        readOnly={true}
                        className='text-left'
                        name={`description_${key}`}
                        value={handleString(data.description)}
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div
                      className={`field-form ${
                        handleCheckText(data.revision) ? 'active' : ''
                      }`}
                    >
                      <label>
                        Rev.
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <input
                        readOnly={true}
                        className='text-left'
                        read
                        name={`revision_${key}`}
                        value={handleString(data.revision)}
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div
                      className={`field-form ${
                        handleCheckText(data.class) ? 'active' : ''
                      }`}
                    >
                      <label>
                        Doc. Class
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <input
                        readOnly={true}
                        className='text-left'
                        name={`class_${key}`}
                        value={handleString(data.class)}
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div
                      className={`field-form ${
                        handleCheckText(data.size) ? 'active' : ''
                      }`}
                    >
                      <label>
                        Size
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <input
                        readOnly={true}
                        className='text-left'
                        name={`size_${key}`}
                        value={handleString(data.size)}
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div
                      className={`field-form ${
                        handleCheckText(data.pageNumber) ? 'active' : ''
                      }`}
                    >
                      <label>
                        NO. Of Page
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <input
                        readOnly={true}
                        className='text-left'
                        name={`pageNumber_${key}`}
                        value={handleString(data.pageNumber)}
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div
                      className={`field-form ${
                        handleCheckText(data.poi) ? 'active' : ''
                      }`}
                    >
                      <label>
                        P.O.I
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <input
                        readOnly={true}
                        className='text-left'
                        name={`POI_${key}`}
                        value={handleString(data.poi)}
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div
                      className={`field-form ${
                        handleCheckText(data.copiesNumber) ? 'active' : ''
                      }`}
                    >
                      <label>
                        No. Of Coples
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <input
                        readOnly={true}
                        className='text-left'
                        name={`copiesNumber_${key}`}
                        value={handleString(data.copiesNumber)}
                      />
                    </div>
                  </div>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                    <div className={`field-form persian`}>
                      <label>
                        پیوست فایل PDF
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <div className='pl-1 allName col row m-0 justify-content-end'>
                        {this.haldeShowName(data.attachment).map(
                          (data, key) => (
                            <a href={data} target='_blank' rel='noreferrer'>
                              <span key={key}>
                                <VisibilityIcon className='ml-1' />
                                {`پیوست ${key + 1}`}
                              </span>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                    <div className={`field-form persian`}>
                      <label>
                        پیوست فایل اصلی
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <div className='pl-1 allName col row m-0 justify-content-end'>
                        {this.haldeShowName(data.native).map((data, key) => (
                          <a
                            key={key}
                            href={data}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <span>
                              <VisibilityIcon className='ml-1' />
                              {`پیوست ${key + 1}`}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  {data.replyAttachment && data.replyAttachment.length > 0 ? (
                    <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                      <div className={`field-form persian`}>
                        <label>فایل ضمیمه reply</label>
                        <div className='pl-1 allName col row m-0 justify-content-end'>
                          {data.replyAttachment.map((data, key) => (
                            <a
                              key={key}
                              href={data}
                              target='_blank'
                              rel='noreferrer'
                            >
                              <span>
                                <VisibilityIcon className='ml-1' />
                                {`فایل ضمیمه ${key + 1}`}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ))}
            {this.state.status === '2' &&
            this.Permision.handlePermision(
              this.state.role,
              'transmittal_verify'
            ) ? (
              <div className='submit-form col-12 mt-3 mb-3 justify-content-center'>
                <button
                  className='mr-2 m-2 accept'
                  onClick={() => this.handleSubmit(1, '')}
                  disabled={this.state.disabled}
                >
                  {this.state.loading === 'submit' ? (
                    <Loading className='form-loader' />
                  ) : (
                    <DoneIcon />
                  )}
                  تائید
                </button>
                <button
                  className='mr-2 m-2'
                  onClick={() => this.setState({ reject: true, popUp: true })}
                  disabled={this.state.disabled}
                >
                  <CloseRoundedIcon />
                  رد
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='col-12'>
            <div className='guide'>
              <div className='row-guide'>
                <label>Type:</label>
                <p>G: Original , P: Print , C: Compact Disk</p>
              </div>
              <div className='row-guide'>
                <label>Purpose of Issue (P.O.I):</label>
                <p>
                  IFC: First Issued For Comment , AFC: Approved For Construction
                  , IFA: Issued For Approval , Fis: Final Issued , IFI: Issued
                  For Information , FI: First Issue (Endorsement Report)
                </p>
              </div>
              <div className='row-guide'>
                <label>Class:</label>
                <p>
                  Class A: Issue for Approval (AFC) , Class B: Issue for
                  Approval (Approved) , Class C: Issue for Information
                </p>
              </div>
            </div>
          </div>
        </div>
        {this.state.popUp ? (
          <Sign
            close={e => this.setState({ popUp: e, reject: e })}
            pictureShow={this.state.pictureShow}
            reject={this.state.reject}
            handleSubmit={this.handleSubmit}
            loading={this.state.loading}
            disabled={this.state.disabled}
          />
        ) : (
          ''
        )}
      </React.Fragment>
    )
  }
}
class Sign extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorText: ''
    }
  }
  render () {
    return (
      <div
        className='backGroundPopup'
        onClick={() => (!this.props.reject ? this.props.close(false) : '')}
      >
        {this.props.reject ? (
          <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
            <div className='box-wellcome'>
              <div className='main-textarea'>
                <textarea
                  onChange={e => this.setState({ errorText: handleString(e.target.value) })}
                  placeholder='لطفا دلیل خود را وارد کنید'
                  value={handleString(this.state.errorText)}
                ></textarea>
              </div>
              <div className='buttons-wellcome justify-content-center'>
                <button
                  className='accept pt-0 pb-0'
                  onClick={() =>
                    this.state.errorText !== ''
                      ? this.props.handleSubmit(0, this.state.errorText)
                      : ''
                  }
                  disabled={this.state.errorText === ''}
                >
                  {this.props.loading === 'submit-unaccept' ? (
                    <Loading className='form-loader mr-0 ml-2' />
                  ) : (
                    <DoneIcon className='ml-2 mt-2 mb-2' />
                  )}
                  ثبت
                </button>
                <button
                  className='pt-0 pb-0'
                  onClick={() => this.props.close(false)}
                >
                  <CloseRoundedIcon className='ml-2' />
                  بستن
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='col-xl-6 col-lg-10 col-12'>
            <img src={this.props.pictureShow} alt='sign' />
          </div>
        )}
      </div>
    )
  }
}
