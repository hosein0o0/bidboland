import React, { Component } from 'react'
import Form from '../../../Form/Form'
import Loading from '../../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import CancelButton from '../../../layout/CancelButton'
export default class VALVES extends Component {
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
        {
          name: 'MFR & Model',
          value: 'mdr_and_model_solenoid',
          label: 'Solenoid'
        },
        { name: 'Order No.', value: 'order_no_solenoid' },
        {
          name: 'MFR & Model',
          value: 'mdr_and_model_limit_switch',
          label: 'Limit Switch'
        },
        { name: 'Order No.', value: 'order_no_solenoid_limit_switch' },
        {
          name: 'MFR & Model',
          value: 'mdr_and_model_positioner',
          label: 'Positioner'
        },
        { name: 'Order No.', value: 'order_no_solenoid_positioner' },
        {
          name: 'MFR & Model',
          value: 'mdr_and_model_actuator',
          label: 'Actuator'
        },
        { name: 'Order No.', value: 'order_no_solenoid_actuator' },
        {
          name: 'Data Sheet',
          value: 'data_sheet',
          select: true,
          listItem: [
            { label: 'test', value: 'test' },
            { label: 'test2', value: 'test2' }
          ]
        },
        { name: 'MESC Code', value: 'mesc_code' },
        {
          name: 'Manufacturer Calibration Certificate',
          value: 'manufacturerFile',
          upload: true,
          accept: '*'
        },
        {
          name: 'Plant Initial Calibration Certificate',
          value: 'Plant',
          upload: true,
          accept: '*'
        },
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
          name: 'آپلود تصاویر',
          value: 'imageFile',
          upload: true,
          accept: '*',
          rtl: true
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
      upload_image: false,
      imageFile: [],
      imageFileName: []
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
            status={2}
          />
        </div>
      </React.Fragment>
    )
  }
}
