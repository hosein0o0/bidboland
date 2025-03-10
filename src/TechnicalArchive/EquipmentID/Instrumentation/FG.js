import React, { Component } from 'react'
import Form from '../../../Form/Form'
import Loading from '../../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import CancelButton from '../../../layout/CancelButton'
export default class FG extends Component {
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
        { name: 'Device Type', value: 'device_type' },
        { name: 'Location Of Equipment', value: 'location_equipment' },
        { name: 'Calibration Gas', value: 'calibration_gas' },
        { name: 'Correction Factor', value: 'correction_factor' },
        {
          name: 'Block Diagram',
          value: 'block_diagram',
          select: true,
          listItem: [
            { label: 'test', value: 'test' },
            { label: 'test2', value: 'test2' }
          ]
        },
        {
          name: 'Location Diagram',
          value: 'location_diagram',
          select: true,
          listItem: [
            { label: 'test', value: 'test' },
            { label: 'test2', value: 'test2' }
          ]
        },
        {
          name: 'Cause & Effect',
          value: 'cause_and_effect',
          select: true,
          listItem: [
            { label: 'test', value: 'test' },
            { label: 'test2', value: 'test2' }
          ]
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
      device_type: '',
      location_equipment: '',
      calibration_gas: '',
      correction_factor: '',
      block_diagram: '',
      location_diagram: '',
      cause_and_effect: '',
      importance_report: '',
      Location_images: '',
      test: '',
      test2: '',
      image_description: '',
      lessons_learned: '',
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
            status={4}
          />
        </div>
      </React.Fragment>
    )
  }
}
