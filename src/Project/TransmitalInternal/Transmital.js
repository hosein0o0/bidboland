import React, { Component } from 'react'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import { Redirect } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import Cookies from 'js-cookie'
import StaticData from '../../staticData'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Loading from '../../layout/loading'
import DeleteIcon from '@material-ui/icons/Delete'
import axios from 'axios'
import DoneIcon from '@material-ui/icons/Done'
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Permision from '../../permision/permision'
import CreatableSelect from 'react-select/creatable'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import { handleFilter } from '../../table/OutputFilter'
export default class Transmittal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      popUp: false,
      foucs: '',
      counter: 1,
      token: Cookies.get('token'),
      Selected: 0,
      SignFile: '',
      SignName: '',
      Transmittal_No: '',
      last_Transmittal_NO: '',
      Transmittal_Date: '',
      Cotract_No: '',
      From: '',
      Letter_NO: '',
      CC: '',
      To: '',
      approvedBy: {},
      redirect: false,
      permision: '',
      Document: [
        {
          Discipline: '',
          DocumentNo: '',
          DocClass: '',
          DocumentDescription: '',
          Rev: '',
          DocType: '',
          Size: '',
          NoPage: '',
          POI: '',
          NoCoples: '',
          statuCopies: true,
          PyvastPdf: [],
          PyvastPdfName: [],
          PeyvastFile: [],
          PeyvastFileName: [],
          readOnly: false,
          error: '',
          valueDocument: ''
        }
      ],
      listDocuments: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - فرم ترنسمیتال`
    this.fetchData()
  }
  fetchData = () => {
    axios
      .get(`${StaticData.domainIp}/transmittal/getFirstDetail`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          let permision = new Permision()
          if (
            permision.handlePermision(response.data.role, 'main_transmittal')
          ) {
            this.setState({
              Transmittal_No: response.data.content.thisNumber,
              last_Transmittal_NO: response.data.content.lastNumber,
              Transmittal_Date: response.data.content.created_at,
              Cotract_No: response.data.content.contractNo,
              From: response.data.content.from,
              To: response.data.content.to,
              approvedBy: response.data.content.approvedBy,
              CC: response.data.content.cc,
              listDocuments: response.data.content.documents
            })
          }
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
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
  handleChangeADD = e => {
    let Document = this.state.Document
    let key = parseInt(e.target.name.split('_')[1])
    let obj = Document[key]
    let name = e.target.name.split('_')[0]
    obj[name] = e.target.value
    function PoiStatus () {
      switch (e.target.value) {
        case 'IFC':
          return { readOnly: false, value: '' }
          break
        case 'AFC':
          return { readOnly: true, value: '5' }
          break
        case 'IFA':
          return { readOnly: true, value: '-' }
          break
        case 'FIS':
          return { readOnly: true, value: '1' }
          break
        case 'IFI':
          return { readOnly: true, value: '-' }
          break
        case 'FI':
          return { readOnly: false, value: '' }
          break
        default:
          return false
      }
    }
    if (name === 'POI') {
      if (PoiStatus()) {
        obj['NoCoples'] = PoiStatus().value
        obj['statuCopies'] = PoiStatus().readOnly
      }
    }
    Document[key] = obj
    this.setState({ Document: Document })
  }
  DeleteDocument = async (num, row = false) => {
    let Document = await this.state.Document
    let obj = await Document[num]
    let DocumentNo = await obj.DocumentNo
    if (DocumentNo === '') {
      await Document.splice(num, 1)
      await this.setState({ Document: Document })
    } else {
      let datareg = await new FormData()
      await datareg.append('documentNumber', DocumentNo)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/transmittal/deleteDocument`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          if (response.status === 200) {
            if (!row) {
              await Document.splice(num, 1)
              await this.setState({
                Document: Document,
                Selected: this.state.Selected - 1
              })
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
    }
  }
  deleteFile = async (key, num, files, names) => {
    let Document = await this.state.Document
    let obj = await Document[key]
    let data1 = await obj[files]
    let data2 = await obj[names]
    await data1.splice(num, 1)
    await data2.splice(num, 1)
    await this.setState({ Document: Document })
  }
  handleUpload = async (e, files, names) => {
    await e.preventDefault()
    await this.setState({ loading: files })
    names = await names.split('_')[0]
    let key = await parseInt(files.split('_')[1])
    files = await files.split('_')[0]
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = await new FileReader()
      await reader.readAsDataURL(e.target.files[i])
      await this.GetLink(
        files,
        e.target.files[i],
        names,
        e.target.files.length,
        key,
        i
      )
    }
  }
  GetLink = (nameState, file, names, length, key, i) => {
    let datareg = new FormData()
    let array = this.state.Document[key][nameState],
      arrayName = this.state.Document[key][names]
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/Transmittal`,
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
          await array.push(response.data.content)
          await arrayName.push(file.name)
          let Document = await this.state.Document
          let obj = await Document[key]
          obj[nameState] = await array
          obj[names] = await arrayName
          await this.setState({ Document: Document })
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
  handleAddDocument = () => {
    let obj = this.state.Document[this.state.Document.length - 1]
    if (
      handleCheckText(obj.Discipline) &&
      handleCheckText(obj.DocumentNo) &&
      handleCheckText(obj.DocClass) &&
      handleCheckText(obj.DocumentDescription) &&
      handleCheckText(obj.Rev) &&
      handleCheckText(obj.DocType) &&
      handleCheckText(obj.Size) &&
      handleCheckText(obj.NoPage) &&
      handleCheckText(obj.POI) &&
      handleCheckText(obj.NoCoples) &&
      obj.PyvastPdf.length > 0 &&
      obj.PyvastPdfName.length > 0 &&
      obj.PeyvastFile.length > 0 &&
      obj.PeyvastFileName.length > 0
    ) {
      let objPush = {
        Discipline: '',
        DocumentNo: '',
        DocClass: '',
        DocumentDescription: '',
        Rev: '',
        DocType: '',
        Size: '',
        NoPage: '',
        POI: '',
        NoCoples: '',
        statuCopies: true,
        PyvastPdf: [],
        PyvastPdfName: [],
        PeyvastFile: [],
        PeyvastFileName: [],
        readOnly: false,
        error: '',
        valueDocument: ''
      }
      let Document = this.state.Document
      Document.push(objPush)
      this.setState({ Document: Document, Selected: this.state.Selected + 1 })
    } else {
      Notification.notify(Message.text(904), 'error')
    }
  }
  SetDocument = async (nextValue, key) => {
    let Document = await this.state.Document
    let obj = await Document[key]
    let PreviousValue = await obj.DocumentNo
    if (handleCheckText(PreviousValue)) {
      await this.DeleteDocument(key, true)
    }
    await axios
      .get(
        `${StaticData.domainIp}/transmittal/getDocumentDetail?documentNumber=${nextValue.value}`,
        {
          data: nextValue.value,
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }
      )
      .then(response => {
        if (response.status === 200 && response.statusText === 'OK') {
          obj.DocumentNo = nextValue.value
          obj.Discipline = response.data.content.disc
          obj.DocumentDescription = response.data.content.documentDescription
          obj.DocType = response.data.content.docType
          obj.readOnly = true
          obj.error = ''
          obj.valueDocument = nextValue
          this.setState({ Document: Document })
        } else {
          Notification.notify(Message.text(response.status), 'error')
          // if (response.status === 312 || response.status === 313 || response.status === 314){
          obj.Discipline = ''
          obj.DocumentDescription = ''
          obj.DocType = ''
          obj.readOnly = false
          obj.error = ''
          obj.DocumentNo = ''
          obj.valueDocument = ''
          this.setState({ Document: Document })
          // }
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
          // if (err.response.status === 312 || err.response.status === 313 || err.response.status === 314){
          obj.Discipline = ''
          obj.DocumentDescription = ''
          obj.DocType = ''
          obj.readOnly = false
          obj.error = ''
          obj.DocumentNo = ''
          obj.valueDocument = ''
          this.setState({ Document: Document })
          // }
        }
      })
  }
  handleSubmit = async () => {
    let result = await {}
    let check = await false
    this.state.Document.filter(elm => {
      check =
        handleCheckText(elm.Discipline) &&
        handleCheckText(elm.DocumentNo) &&
        handleCheckText(elm.DocClass) &&
        handleCheckText(elm.DocumentDescription) &&
        handleCheckText(elm.Rev) &&
        handleCheckText(elm.DocType) &&
        handleCheckText(elm.Size) &&
        handleCheckText(elm.NoPage) &&
        handleCheckText(elm.POI) &&
        handleCheckText(elm.NoCoples) &&
        elm.PyvastPdf.length > 0 &&
        elm.PeyvastFile.length > 0
    })
    this.setState({ loading: 'submit' })
    if (
      check &&
      handleCheckText(this.state.Transmittal_No) &&
      handleCheckText(this.state.last_Transmittal_NO) &&
      handleCheckText(this.state.Transmittal_Date) &&
      handleCheckText(this.state.Cotract_No) &&
      handleCheckText(this.state.From) &&
      handleCheckText(this.state.To)
    ) {
      let a = []
      this.state.Document.filter(e => {
        e.PyvastPdf = Object.assign({}, e.PyvastPdf)
        e.PeyvastFile = Object.assign({}, e.PeyvastFile)
        a.push(e)
      })
      let result = await Object.assign({}, a)
      let datareg = await new FormData()
      await datareg.append('letterNo', this.state.Letter_NO)
      await datareg.append('cc', this.state.CC)
      await datareg.append('documentsObject', JSON.stringify(result))
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/transmittal/create`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              await this.setState({ redirect: true })
            }, 5000)
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
    } else {
      this.setState({ loading: '' })
      Notification.notify(Message.text(99), 'error')
    }
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
                    nameRole='secondary_transmittal_create'
                    nameUrl={this.props.nameUrl}
                  />
                  <div className='w-100 row m-0 main-box-dashboard'>
                    <div className='boxes-dashboard row m-0 p-0'>
                      <div className='main-form'>
                        <div className='title-from'>
                          <h2>انتقال سند داخلی - Document Transmittal</h2>
                        </div>
                        <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                          <div className='form row justify-content-end'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div className={`field-form active`}>
                                <label>
                                  Transmittal No.
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='Transmittal_No'
                                  value={this.state.Transmittal_No}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(
                                    this.state.last_Transmittal_NO
                                  )
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  last Transmittal NO.
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='last_Transmittal_NO'
                                  value={handleString(
                                    this.state.last_Transmittal_NO
                                  )}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form data ${
                                  handleCheckText(this.state.Transmittal_Date)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='icon-field'>
                                  <DateRangeRoundedIcon />
                                </div>
                                <div className='col p-0'>
                                  <label>
                                    Transmittal Date.
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <input
                                    className='text-left'
                                    readOnly={true}
                                    name='Transmittal_Date'
                                    value={handleString(
                                      this.state.Transmittal_Date
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.Cotract_No)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Contract No.
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='text-left'
                                  readOnly={true}
                                  name='Cotract_No'
                                  value={handleString(this.state.Cotract_No)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.From)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  From.
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='From'
                                  value={handleString(this.state.From)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  this.state.foucs === 'Letter_NO' ||
                                  handleCheckText(this.state.Letter_NO)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>Letter NO.</label>
                                <input
                                  className='text-left'
                                  name='Letter_NO'
                                  value={handleString(this.state.Letter_NO)}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.CC) ? 'active' : ''
                                }`}
                              >
                                <label>CC.</label>
                                <input
                                  name='CC'
                                  readOnly={true}
                                  className='text-left'
                                  value={handleString(this.state.CC)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.To) ? 'active' : ''
                                }`}
                              >
                                <label>
                                  To.
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  className='text-left'
                                  name='To'
                                  value={handleString(this.state.To)}
                                />
                              </div>
                            </div>
                            <div className='col-12'>
                              {this.state.Document.map((data, key) => (
                                <div
                                  className={`box-add row ${
                                    this.state.Selected !== key
                                      ? 'CloseBox'
                                      : ''
                                  }`}
                                  key={key}
                                >
                                  <div className='title-box-add'>
                                    <span
                                      className={`col p-0 ${
                                        this.state.Selected !== key
                                          ? 'cursor'
                                          : ''
                                      }`}
                                      onClick={() =>
                                        this.state.Selected !== key
                                          ? this.setState({
                                              Selected:
                                                this.state.Selected === key
                                                  ? this.state.Document.length -
                                                    1
                                                  : key
                                            })
                                          : ''
                                      }
                                    >
                                      مورد {key + 1}
                                    </span>
                                    {this.state.Selected !== key ? (
                                      <div
                                        className='delete-Document'
                                        onClick={() => this.DeleteDocument(key)}
                                      >
                                        <span>
                                          <DeleteIcon />
                                          حذف
                                        </span>
                                      </div>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                  <div className='w-100 row m-0'>
                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div
                                        className={`field-form ${
                                          handleCheckText(data.Discipline)
                                            ? 'active'
                                            : ''
                                        }`}
                                      >
                                        <label>
                                          Discipline
                                          <span className='star IranSans_Bold'>
                                            *
                                          </span>
                                        </label>
                                        <input
                                          name={`Discipline_${key}`}
                                          readOnly={true}
                                          value={handleString(data.Discipline)}
                                          className='text-left'
                                        />
                                      </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div className='field-form selectBox'>
                                        <CreatableSelect
                                          className='text-left ltr'
                                          onChange={newValue =>
                                            this.SetDocument(newValue, key)
                                          }
                                          options={this.state.listDocuments}
                                          value={handleString(
                                            data.valueDocument
                                          )}
                                          placeholder={
                                            <label>
                                              Document No.
                                              <span className='star IranSans_Bold'>
                                                *
                                              </span>
                                            </label>
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div
                                        className={`field-form ${
                                          handleCheckText(data.DocType)
                                            ? 'active'
                                            : ''
                                        }`}
                                      >
                                        <label>
                                          Doc. Type.
                                          <span className='star IranSans_Bold'>
                                            *
                                          </span>
                                        </label>
                                        <input
                                          className='text-left'
                                          readOnly={true}
                                          name={`DocType_${key}`}
                                          value={handleString(data.DocType)}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div
                                        className={`field-form ${
                                          handleCheckText(
                                            data.DocumentDescription
                                          )
                                            ? 'active'
                                            : ''
                                        }`}
                                      >
                                        <label>
                                          Document Description
                                          <span className='star IranSans_Bold'>
                                            *
                                          </span>
                                        </label>
                                        <input
                                          className='text-left'
                                          readOnly={true}
                                          name={`DocumentDescription_${key}`}
                                          value={handleString(
                                            data.DocumentDescription
                                          )}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div
                                        className={`field-form ${
                                          this.state.foucs === `Rev_${key}` ||
                                          handleCheckText(data.Rev)
                                            ? 'active'
                                            : ''
                                        }`}
                                      >
                                        <label>
                                          Rev.
                                          <span className='star IranSans_Bold'>
                                            *
                                          </span>
                                        </label>
                                        <input
                                          className='text-left'
                                          name={`Rev_${key}`}
                                          value={handleString(data.Rev)}
                                          onFocus={e =>
                                            this.OnFocus(e.target.name)
                                          }
                                          onBlur={this.OnBlur}
                                          onChange={this.handleChangeADD}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div
                                        className={`field-form ${
                                          this.state.foucs ===
                                            `DocClass_${key}` ||
                                          handleCheckText(data.DocClass)
                                            ? 'active'
                                            : ''
                                        }`}
                                      >
                                        <label>
                                          Doc. Class
                                          <span className='star IranSans_Bold'>
                                            *
                                          </span>
                                        </label>
                                        <input
                                          className='text-left'
                                          name={`DocClass_${key}`}
                                          value={handleString(data.DocClass)}
                                          onFocus={e =>
                                            this.OnFocus(e.target.name)
                                          }
                                          onBlur={this.OnBlur}
                                          onChange={this.handleChangeADD}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div
                                        className={`field-form ${
                                          this.state.foucs === `Size_${key}` ||
                                          handleCheckText(data.Size)
                                            ? 'active'
                                            : ''
                                        }`}
                                      >
                                        <label>
                                          Size
                                          <span className='star IranSans_Bold'>
                                            *
                                          </span>
                                        </label>
                                        <input
                                          className='text-left'
                                          name={`Size_${key}`}
                                          value={handleString(data.Size)}
                                          onFocus={e =>
                                            this.OnFocus(e.target.name)
                                          }
                                          onBlur={this.OnBlur}
                                          onChange={this.handleChangeADD}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div
                                        className={`field-form ${
                                          this.state.foucs ===
                                            `NoPage_${key}` ||
                                          handleCheckText(data.NoPage)
                                            ? 'active'
                                            : ''
                                        }`}
                                      >
                                        <label>
                                          NO. Of Page
                                          <span className='star IranSans_Bold'>
                                            *
                                          </span>
                                        </label>
                                        <input
                                          className='text-left'
                                          name={`NoPage_${key}`}
                                          value={handleString(data.NoPage)}
                                          onFocus={e =>
                                            this.OnFocus(e.target.name)
                                          }
                                          onBlur={this.OnBlur}
                                          onChange={this.handleChangeADD}
                                        />
                                      </div>
                                    </div>

                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div
                                        className={`field-form ${
                                          this.state.foucs ===
                                            `NoCoples_${key}` ||
                                          handleCheckText(data.NoCoples)
                                            ? 'active'
                                            : ''
                                        }`}
                                      >
                                        <label>
                                          No. Of Coples
                                          <span className='star IranSans_Bold'>
                                            *
                                          </span>
                                        </label>
                                        <input
                                          className='text-left'
                                          name={`NoCoples_${key}`}
                                          readOnly={data.statuCopies}
                                          value={handleString(data.NoCoples)}
                                          onFocus={e =>
                                            this.OnFocus(e.target.name)
                                          }
                                          onBlur={this.OnBlur}
                                          onChange={this.handleChangeADD}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div
                                        className={`field-form ${
                                          this.state.foucs === `POI_${key}` ||
                                          handleCheckText(data.POI)
                                            ? 'active'
                                            : ''
                                        }`}
                                      >
                                        <label>
                                          P.O.I
                                          <span className='star IranSans_Bold'>
                                            *
                                          </span>
                                        </label>
                                        <select
                                          name={`POI_${key}`}
                                          value={handleString(data.POI)}
                                          onFocus={e =>
                                            this.OnFocus(e.target.name)
                                          }
                                          onBlur={this.OnBlur}
                                          onChange={this.handleChangeADD}
                                        >
                                          <option className='d-none'></option>
                                          <option value='IFC'>IFC</option>
                                          <option value='AFC'>AFC</option>
                                          <option value='IFA'>IFA</option>
                                          <option value='FIS'>FIS</option>
                                          <option value='IFI'>IFI</option>
                                          <option value='FI'>FI</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                      <div className={`field-form persian`}>
                                        <label>
                                          پیوست فایل PDF
                                          <span className='star IranSans_Bold'>
                                            *
                                          </span>
                                        </label>
                                        <div className='allName col row m-0 justify-content-end'>
                                          {data.PyvastPdfName.map(
                                            (name, index) => (
                                              <span key={index}>
                                                <CloseRoundedIcon
                                                  onClick={() =>
                                                    this.deleteFile(
                                                      key,
                                                      index,
                                                      'PyvastPdf',
                                                      'PyvastPdfName'
                                                    )
                                                  }
                                                />
                                                {name}
                                              </span>
                                            )
                                          )}
                                        </div>
                                        <input
                                          name={`PyvastPdf_${key}`}
                                          className='d-none'
                                          type='file'
                                          id={`PyvastPdf_${key}`}
                                          multiple
                                          onChange={e =>
                                            this.handleUpload(
                                              e,
                                              `PyvastPdf_${key}`,
                                              `PyvastPdfName_${key}`
                                            )
                                          }
                                          accept='application/pdf'
                                        />
                                        <label
                                          className='upload-label'
                                          htmlFor={`PyvastPdf_${key}`}
                                        >
                                          {this.state.loading ===
                                          `PyvastPdf_${key}` ? (
                                            <Loading className='form-loader w-auto' />
                                          ) : (
                                            <AttachFileIcon />
                                          )}
                                          آپلود فایل
                                        </label>
                                      </div>
                                    </div>
                                    <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                      <div className={`field-form persian`}>
                                        <label>
                                          پیوست فایل اصلی
                                          <span className='star IranSans_Bold'>
                                            *
                                          </span>
                                        </label>
                                        <div className='allName col row m-0 justify-content-end'>
                                          {data.PeyvastFileName.map(
                                            (name, index) => (
                                              <span key={index}>
                                                <CloseRoundedIcon
                                                  onClick={() =>
                                                    this.deleteFile(
                                                      key,
                                                      index,
                                                      'PeyvastFile',
                                                      'PeyvastFileName'
                                                    )
                                                  }
                                                />
                                                {name}
                                              </span>
                                            )
                                          )}
                                        </div>
                                        <input
                                          name={`PeyvastFile_${key}`}
                                          className='d-none'
                                          type='file'
                                          id={`PeyvastFile_${key}`}
                                          multiple
                                          onChange={e =>
                                            this.handleUpload(
                                              e,
                                              `PeyvastFile_${key}`,
                                              `PeyvastFileName_${key}`
                                            )
                                          }
                                        />
                                        <label
                                          className='upload-label'
                                          htmlFor={`PeyvastFile_${key}`}
                                        >
                                          {this.state.loading ===
                                          `PeyvastFile_${key}` ? (
                                            <Loading className='form-loader w-auto' />
                                          ) : (
                                            <AttachFileIcon />
                                          )}
                                          آپلود فایل
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className='button-add col-12'>
                              <button onClick={this.handleAddDocument}>
                                <AddIcon />
                                افزودن مورد جدید
                              </button>
                            </div>
                            <div className='col-12'>
                              <div className='guide'>
                                <div className='row-guide'>
                                  <label>Type:</label>
                                  <p>
                                    G: Original , P: Print , C: Compact Disk
                                  </p>
                                </div>
                                <div className='row-guide'>
                                  <label>Purpose of Issue (P.O.I):</label>
                                  <p>
                                    IFC: First Issued For Comment , AFC:
                                    Approved For Construction , IFA: Issued For
                                    Approval , Fis: Final Issued , IFI: Issued
                                    For Information , FI: First Issue
                                    (Endorsement Report)
                                  </p>
                                </div>
                                <div className='row-guide'>
                                  <label>Class:</label>
                                  <p>
                                    Class A: Issue for Approval (AFC) , Class B:
                                    Issue for Approval (Approved) , Class C:
                                    Issue for Information
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div className={`field-form`}>
                                <label>{`${this.state.approvedBy.first_name}  ${this.state.approvedBy.last_name}`}</label>
                                <label
                                  className='upload-label signEnglish'
                                  onClick={() =>
                                    this.state.approvedBy.sign
                                      ? this.setState({ popUp: true })
                                      : ''
                                  }
                                >
                                  sign
                                  <AttachFileIcon />
                                </label>
                              </div>
                            </div>
                            <div className='submit-form col-12 mt-5'>
                              <button onClick={this.handleSubmit}>
                                {this.state.loading === 'submit' ? (
                                  <Loading className='form-loader' />
                                ) : (
                                  <DoneIcon />
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
