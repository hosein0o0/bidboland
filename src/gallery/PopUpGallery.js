import React, { Component } from 'react'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import PopupConfirm from '../layout/popupConfirm'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import Permision from '../permision/permision'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

export default class PopUpGallery extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      select: 0,
      confirm: false,
      loading: '',
      token: Cookies.get('token')
    }
  }
  componentDidMount () {
    this.setState({ role: this.props.role })
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.setState({ role: this.props.role })
    }
  }
  changeSilde = status => {
    switch (status) {
      case 'left':
        if (
          this.props.Covertor(
            this.props.detail.img
              ? this.props.detail.img
              : this.props.detail.pictures
          )[this.state.select - 1]
        ) {
          this.setState({ select: this.state.select - 1 })
        }
        break
      case 'right':
        if (
          this.props.Covertor(
            this.props.detail.img
              ? this.props.detail.img
              : this.props.detail.pictures
          )[this.state.select + 1]
        ) {
          this.setState({ select: this.state.select + 1 })
        }
        break
      default:
        return false
    }
  }
  handleDelete = async () => {
    if (this.props.detail.id) {
      this.setState({ loading: 'delete' })
      let datareg = await new FormData()
      await datareg.append('id', this.props.detail.id)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/gallery/deleteGallery`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          await this.setState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(909), 'success')
            await this.props.fetchData()
            await this.props.close(false)
          } else {
            await Notification.notify(Message.text(response.status), 'error')
            await this.props.close(false)
          }
        })
        .catch(err => {
          this.setState({ loading: '' })
          this.props.close(false)
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  render () {
    const { detail } = this.props
    return (
      <div className='backGroundPopup'>
        <div className='col-xl-10 col-lg-10 col-12 h-100 d-flex align-items-center'>
          <div className='box-gallery-popup row m-0'>
            <div className='box-gallery-popup-close'>
              <button onClick={() => this.props.close(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 h-100'>
              <div className='box-gallery-popup-detail'>
                <div className='100 main-item'>
                  <div className='box-gallery-popup-detail-item'>
                    <div className='w-100'>
                      <h4>توضیحات تصویر</h4>
                      <span>{detail.text}</span>
                    </div>
                  </div>
                  <div className='box-gallery-popup-detail-item'>
                    <div className='w-100'>
                      <h4>درس آموخته ها</h4>
                      <span>{detail.learned_lessons}</span>
                    </div>
                    <div className='box-shadow'></div>
                  </div>
                </div>
                <div className='box-gallery-popup-detail-item sender'>
                  <div
                    className={`${
                      this.props.not ? 'col-12' : 'col-8'
                    } p-0 h-100 row m-0 align-items-center`}
                  >
                    <div className='item'>
                      <label>ارسال کننده :</label>
                      <span>{detail.name}</span>
                    </div>
                    <div className='item'>
                      <label>تاریخ ارسال :</label>
                      <span>{detail.date}</span>
                    </div>
                    <div className='item'>
                      <label>لوکیشن تصاویر :</label>
                      <span>{detail.location}</span>
                    </div>
                    <div className='item'>
                      <label>نام تجهیز :</label>
                      <span>{detail.wbs}</span>
                    </div>
                    {detail.keywords && (
                      <div className='item'>
                        <label>کلمات کلیدی :</label>
                        <span>{detail.keywords}</span>
                      </div>
                    )}
                    {detail.unit && (
                      <div className='item'>
                        <label>Unit :</label>
                        <span>{detail.unit}</span>
                      </div>
                    )}
                    {detail.zone && (
                      <div className='item'>
                        <label>Zone :</label>
                        <span>{detail.zone}</span>
                      </div>
                    )}
                    {detail.disc && (
                      <div className='item'>
                        <label>Disc :</label>
                        <span>{detail.disc}</span>
                      </div>
                    )}
                    {detail.job_phase && (
                      <div className='item'>
                        <label>Job Phase :</label>
                        <span>{detail.job_phase}</span>
                      </div>
                    )}
                    {detail.document_number && (
                      <div className='item'>
                        <label>لیست مدارک مرتبط :</label>
                        <span>{detail.document_number}</span>
                      </div>
                    )}
                  </div>
                  {!this.props.not && (
                    <div className='col-4 p-0 h-100 main-action-gallery'>
                      {this.Permision.handlePermision(
                        this.state.role,
                        'gallery_delete'
                      ) ? (
                        <div
                          className='item-action delete'
                          onClick={() => this.setState({ confirm: true })}
                        >
                          <span>
                            <DeleteIcon />
                          </span>
                        </div>
                      ) : (
                        ''
                      )}
                      {this.Permision.handlePermision(
                        this.state.role,
                        'gallery_edit'
                      ) ? (
                        <div className='item-action edit'>
                          <Link
                            to={`/edit-gallery-${this.props.detail.id}`}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <span>
                              <EditIcon />
                            </span>
                          </Link>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 h-100'>
              <div className='box-gallery-popup-images'>
                {this.props.Covertor(
                  this.props.detail.img
                    ? this.props.detail.img
                    : this.props.detail.pictures
                )[this.state.select + 1] ? (
                  <button
                    className='change-slide right'
                    onClick={() => this.changeSilde('right')}
                  >
                    <ArrowForwardIcon />
                  </button>
                ) : (
                  ''
                )}
                {this.props
                  .Covertor(
                    this.props.detail.img
                      ? this.props.detail.img
                      : this.props.detail.pictures
                  )
                  .map((data, key) =>
                    this.state.select === key ? (
                      <img src={data} key={key} alt='' />
                    ) : (
                      ''
                    )
                  )}
                {this.props.Covertor(
                  this.props.detail.img
                    ? this.props.detail.img
                    : this.props.detail.pictures
                )[this.state.select - 1] ? (
                  <button
                    className='change-slide left'
                    onClick={() => this.changeSilde('left')}
                  >
                    <ArrowBackIcon />
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.confirm && !this.props.not ? (
          <PopupConfirm
            handleSubmit={this.handleDelete}
            close={e => this.setState({ confirm: e })}
            number={this.props.detail.name}
            label={'عکس های'}
            loading={this.state.loading}
          />
        ) : (
          ''
        )}
      </div>
    )
  }
}
