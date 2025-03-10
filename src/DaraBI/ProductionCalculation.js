import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import Form from '../Form/Form'
import Cookies from 'js-cookie'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import StaticData from '../staticData'
import handleCheckText from '../handleCheckText'
import getCustomFormat from '../getCustomFormat'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import PopUpTable from '../table/PopUpTable'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
// import { keys } from '@amcharts/amcharts4/.internal/core/utils/Object'
import handleString from '../handleString'
export default class ProductionCalculation extends Component {
  constructor (props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    // this.getCustomFormat = GetCustomFormat.getCustomFormat
    this.state = {
      token: Cookies.get('token'),
      itemForm: [
        {
          name: 'تاریخ شروع',
          value: 'startDate',
          require: true,
          rtl: true,
          date: true
        },
        {
          name: 'تاریخ پایان',
          value: 'endDate',
          require: true,
          rtl: true,
          date: true,
          disabled: true
        },
        {
          name: 'متان ارسالی به خط سراسری',
          value: 'sentMethaneToNationalLine',
          rtl: true,
          label: 'ورودی محاسبات متان'
        },
        { name: 'گاز سوخت مصرفی', value: 'gasConsumption', rtl: true },
        {
          name: 'مجموع مقدار ارسالی',
          value: 'pentanePlus',
          rtl: true,
          label: 'ورودی محاسبات پنتان پلاس'
        },
        {
          name: 'مقدار گاز شرین',
          value: 'sweetGas',
          rtl: true,
          label: 'ورودی محاسبات گاز شیرین'
        }
      ],
      startDate: undefined,
      endDate: undefined,
      sentMethaneToNationalLine: '',
      gasConsumption: '',
      pentanePlus: '',
      sweetGas: '',
      popup: false,
      dataPopUp: null
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - محاسبات تولید`
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
  handleSubmit = async () => {
    let {
      startDate,
      endDate,
      sentMethaneToNationalLine,
      gasConsumption,
      pentanePlus,
      sweetGas
    } = await this.state
    const check =
      (await startDate) !== undefined &&
      endDate !== undefined &&
      handleCheckText(sentMethaneToNationalLine)
        ? handleCheckText(gasConsumption)
        : handleCheckText(gasConsumption)
        ? handleCheckText(sentMethaneToNationalLine)
        : true
    if (check) {
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      await datareg.append('startDate', this.getCustomFormat(startDate, true))
      await datareg.append('endDate', this.getCustomFormat(endDate, true))
      await datareg.append(
        'sentMethaneToNationalLine',
        sentMethaneToNationalLine
      )
      await datareg.append('gasConsumption', gasConsumption)
      await datareg.append('pentanePlus', pentanePlus)
      await datareg.append('sweetGas', sweetGas)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/productionProcessFormula/getAllFormula`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(response => {
          this.setState({ loading: '', disabled: false })
          if (response.status === 200) {
            if (response.data.content) {
              this.setState({
                popup: true,
                dataPopUp: response.data.content
              })
            } else {
              Notification.notify(Message.text(925), 'warning')
              this.setState({ popup: false, dataPopUp: null })
            }
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({ loading: '', disabled: false })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  Reset = () => {
    this.setState({
      startDate: undefined,
      endDate: undefined,
      sentMethaneToNationalLine: '',
      gasConsumption: '',
      pentanePlus: '',
      sweetGas: '',
      popup: false,
      dataPopUp: null
    })
  }
  ChangeDate = (name, value) => {
    let itemForm = this.state.itemForm
    if (name === 'startDate') {
      itemForm = Object.keys(this.state.itemForm).map(item => {
        if (this.state.itemForm[item].value === 'endDate') {
          this.state.itemForm[item].disabled = false
          this.state.itemForm[item].min = value
        }
        return this.state.itemForm[item]
      })
    }
    this.setState({
      [name]: value,
      itemForm: itemForm,
      endDate: name === 'startDate' ? undefined : value
    })
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
                      <h2>تنظیم محاسبات تولید</h2>
                    </div>
                    <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                      <div className='form row rtl'>
                        <Form
                          {...this}
                          handleState={(name, value) =>
                            this.ChangeDate(name, value)
                          }
                        />
                        <div className='submit-form rtl col-12 mt-5'>
                          <button
                            onClick={this.handleSubmit}
                            disabled={this.state.disabled}
                          >
                            {this.state.loading === 'submit' ? (
                              <Loading className='form-loader' />
                            ) : (
                              <DoneIcon />
                            )}
                            ثبت اطلاعات
                          </button>
                          <button
                            className='continue mr-2'
                            onClick={this.Reset}
                          >
                            <RotateLeftIcon />
                            تازه سازی
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.popup && (
                    <PopUpTable
                      {...this}
                      handleState={(name, value) =>
                        this.setState({ [name]: value })
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
