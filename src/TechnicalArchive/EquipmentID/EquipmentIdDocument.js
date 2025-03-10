import React, { Component } from 'react'
import Form from '../../Form/Form'
import axios from 'axios'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import StaticData from '../../staticData'
export default class EquipmentIdDocument extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemForm: [
        { name: 'Tank Name', value: 'tank_name' },
        { name: 'Purchase Order No', value: 'purchase_order_no' },
        { name: 'Design Code', value: 'design_code' },
        { name: 'Appendix', value: 'appendix' },
        { name: 'DIM.', value: 'dim' },
        { name: 'Geometrical Capacity', value: 'geometrical_capacity' },
        { name: 'Working Capacity', value: 'working_capacity' },
        { name: 'DES. Press', value: 'des_press' },
        { name: 'Design TEMP.', value: 'design_temp' },
        { name: 'Operating Press', value: 'operating_press' },
        { name: 'Operating TEMP', value: 'operating_temp' },
        { name: 'PWHT', value: 'pwht' },
        { name: 'Stored Fluid', value: 'stored_fluid' },
        { name: 'Design Liquid Level', value: 'design_liquid_level' },
        { name: 'Fluid Density', value: 'fluid_density' },
        { name: 'DES. Metal TEMP', value: 'des_metal_temp' },
        { name: 'C. A.', value: 'c_a' },
        { name: 'Weight', value: 'weight' },
        { name: 'MFRS Serial No', value: 'mfrs_serial_no' },
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
        { name: 'آپلود تصاویر', value: 'imageFiles', upload: true, accept: '*' }
      ],
      upload_image: false,
      imageFiles: [],
      imageFilesName: []
    }
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleUpload = async (e, files, names) => {
    await e.preventDefault()
    await this.setState({ loading: files })
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = await new FileReader()
      await reader.readAsDataURL(e.target.files[i])
      await this.GetLink(
        files,
        e.target.files[i],
        names,
        e.target.files.length,
        i
      )
    }
  }
  GetLink = (nameState, file, names, length, i) => {
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/equipmentid`,
      data: datareg,
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(async response => {
        if (i + 1 === length) {
          this.setState({ loading: '' })
        }
        if (response.status === 200) {
          await this.setState({
            [nameState]: [...this.state[nameState], response.data.content],
            [names]: [...this.state[names], file.name]
          })
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
  }
  deleteFile = async (num, files, names) => {
    let fileList = await this.state[files],
      nameList = await this.state[names]
    if (fileList && nameList) {
      await nameList.splice(num, 1)
      await fileList.splice(num, 1)
      await this.setState({ [files]: fileList, [names]: nameList })
    }
  }
  render () {
    return (
      <Form
        {...this}
        handleState={(name, value) => this.setState({ [name]: value })}
      />
    )
  }
}
