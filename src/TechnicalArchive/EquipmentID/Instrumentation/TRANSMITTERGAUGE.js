import React, { Component } from 'react'
import Form from '../../../Form/Form'
import Loading from '../../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import CancelButton from '../../../layout/CancelButton'
export default class TRANSMITTERGAUGE extends Component {
  constructor (props) {
    super(props)
    this.OnFocus = this.props.OnFocus
    this.OnBlur = this.props.OnBlur
    this.handleChange = this.props.handleChange
    this.handleUpload = this.props.handleUpload
    this.GetLink = this.props.GetLink
    this.deleteFile = this.props.deleteFile
    this.state = {
      itemForm: [
        { name: 'Device Description', value: 'device_description' },
        { name: 'P&ID No.', value: 'p_and_id_number' },
        { name: 'Manufacturer', value: 'manufacturer' },
        { name: 'Order No.', value: 'order_no' },
        { name: 'Instrument Range', value: 'instrument_range' },
        {
          name: 'Data Sheet',
          value: 'data_sheet',
          select: true,
          listItem: [
            { label: 'test', value: 'test' },
            { label: 'test2', value: 'test2' }
          ]
        },
        {
          name: 'Manufacturer Calibration Certificate',
          value: 'manufacturerFile',
          upload: true,
          accept: '*',
          ltr: true
        },
        {
          name: 'Plant Initial Calibration Certificate',
          value: 'Plant',
          upload: true,
          accept: '*'
        },
        { name: 'MESC Code', value: 'mesc_code' },
        {
          name: 'تصویری از تجهیز مربوط جهت آپلود وجود  دارد؟',
          value: 'upload_image',
          radio: true,
          rtl: true,
          items: [
            { name: 'بله', value: true },
            { name: 'خیر', value: false }
          ]
        },
        {
          name: 'میزان اهمیت گزارش',
          value: 'importance_report',
          select: true,
          rtl: true,
          listItem: [
            { label: 'test', value: 'test' },
            { label: 'test2', value: 'test2' }
          ]
        },
        {
          name: 'لوکیشن تصاویر',
          value: 'Location_images',
          location: true,
          rtl: true,
          listItem: [
            { label: 'test', value: 'test' },
            { label: 'test2', value: 'test2' }
          ]
        },
        {
          name: 'توضیحات تصویر',
          value: 'image_description',
          textArea: true,
          rtl: true
        },
        {
          name: 'درس آموخته',
          value: 'lessons_learned',
          textArea: true,
          rtl: true
        }
      ],
      manufacturerFile: [],
      manufacturerFileName: [],
      Plant: [],
      PlantName: [],
      upload_image: false
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.setState(this.props.state)
    }
  }
  render () {
    return (
      <React.Fragment>
        <Form
          {...this}
          handleState={(name, value) => this.setState({ [name]: value })}
        />
        <div className='submit-form rtl col-12 mt-5'>
          <button
          // onClick={this.handleSubmit}
          // disabled={this.state.disabled}
          >
            {this.state.loading === 'submit' ? (
              <Loading className='form-loader' />
            ) : (
              <DoneIcon />
            )}
            ثبت اطلاعات
          </button>
          <CancelButton
            redirect='equipment-identify'
            status={1}
          />
        </div>
      </React.Fragment>
    )
  }
}
