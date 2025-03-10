import React, { Component } from 'react'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import { Redirect } from 'react-router-dom'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import Cookies from 'js-cookie'
import StaticData from '../../staticData'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Loading from '../../layout/loading'
import axios from 'axios'
import DoneIcon from '@material-ui/icons/Done'
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Permision from '../../permision/permision'
import CreatableSelect from 'react-select/creatable'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
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
      created_at: '',
      contractNo: '',
      _from: '',
      Letter_NO: '',
      cc: '',
      _to: '',
      approveBy: {},
      redirect: false,
      permision: '',
      documents: [],
      masterDocumentList: [],
      copyList: [],
      status: '0',
      loading: '',
      disabled: false
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} -  ویرایش فرم ترنسمیتال`
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    if (id) {
      this.fetchData(id)
    }
  }
  fetchData = id => {
    axios
      .get(`${StaticData.domainIp}/transmittal/getForEdit/${id}`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(async response => {
        if (response.status === 200) {
          let permision = await new Permision()
          if (
            permision.handlePermision(response.data.role, 'main_transmittal')
          ) {
            for (let i = 0; i < response.data.content.documents.length; i++) {
              let attachment = await [],
                native = await []
              for (let attach in response.data.content.documents[i]
                .attachment) {
                await attachment.push(
                  response.data.content.documents[i].attachment[attach]
                )
              }
              for (let nati in response.data.content.documents[i].native) {
                await native.push(
                  response.data.content.documents[i].native[nati]
                )
              }
              response.data.content.documents[i].attachment = await attachment
              response.data.content.documents[i].native = await native
            }
            response.data.content['copyList'] = await response.data.content
              .masterDocumentList
            await this.setState(response.data.content)
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
              this.setState({ back: true })
            }, 5000)
          }
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
    let Document = this.state.documents
    let key = parseInt(e.target.name.split('_')[1])
    let obj = Document[key]
    let name = e.target.name.split('_')[0]
    obj[name] = e.target.value
    Document[key] = obj
    this.setState({ documents: Document })
  }
  DeleteDocument = async (num, row = false) => {
    let Document = await this.state.documents
    let obj = await Document[num]
    let DocumentNo = await obj.DocumentNo
    if (DocumentNo === '') {
      await Document.splice(num, 1)
      await this.setState({
        documents: Document,
        Selected: this.state.Selected
      })
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
                documents: Document,
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
  SetDocument = async (nextValue, key) => {
    let Document = await this.state.documents
    let obj = await Document[key]
    let PreviousValue = await obj.DocumentNo
    if (PreviousValue) {
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
          obj.disc = response.data.content.disc
          obj.description = response.data.content.documentDescription
          obj.docType = response.data.content.docType
          obj.readOnly = true
          obj.error = ''
          obj.selectedDocumentObject = nextValue
          this.setState({ documents: Document })
        } else {
          Notification.notify(Message.text(response.status), 'error')
          // if (response.status === 312 || response.status === 313 || response.status === 314){
          obj.disc = ''
          obj.description = ''
          obj.docType = ''
          obj.readOnly = false
          obj.error = ''
          obj.DocumentNo = ''
          obj.selectedDocumentObject = ''
          this.setState({ documents: Document })
          // }
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
          // if (err.response.status === 312 || err.response.status === 313 || err.response.status === 314){
          obj.disc = ''
          obj.description = ''
          obj.docType = ''
          obj.readOnly = false
          obj.error = ''
          obj.DocumentNo = ''
          obj.selectedDocumentObject = ''
          this.setState({ documents: Document })
          // }
        }
      })
  }
  deleteFile = async (key, num, files) => {
    let Document = await this.state.documents
    let obj = await Document[key]
    let data1 = await obj[files]
    await data1.splice(num, 1)
    await this.setState({ documents: Document })
  }
  handleUpload = async (e, files) => {
    await e.preventDefault()
    await this.setState({ loading: files })
    let key = await parseInt(files.split('_')[1])
    files = await files.split('_')[0]
    let Document = await this.state.documents
    let array = await Document[key][files]
    let minez = await 1
    if (array.length > 0) {
      minez = await 0
    }
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = await new FileReader()
      await reader.readAsDataURL(e.target.files[i])
      await this.GetLink(
        files,
        e.target.files[i],
        e.target.files.length,
        key,
        minez
      )
    }
  }
  GetLink = (nameState, file, length, key, minez) => {
    let datareg = new FormData()
    let array = this.state.documents[key][nameState]
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
        if (this.state.documents[key][nameState].length === length - minez) {
          this.setState({ loading: '' })
        }
        if (response.status === 200) {
          await array.push(response.data.content)
          let Document = await this.state.documents
          let obj = await Document[key]
          obj[nameState] = await array
          await this.setState({ documents: Document })
        } else {
          this.setState({ loading: '' })
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
    let obj = this.state.documents[this.state.documents.length - 1]
    if (
      handleCheckText(obj.disc) &&
      handleCheckText(obj.DocumentNo) &&
      handleCheckText(obj.class) &&
      handleCheckText(obj.description) &&
      handleCheckText(obj.revision) &&
      handleCheckText(obj.docType) &&
      handleCheckText(obj.size) &&
      handleCheckText(obj.pageNumber) &&
      handleCheckText(obj.poi) &&
      handleCheckText(obj.copiesNumber) &&
      obj.attachment.length > 0 &&
      obj.native.length > 0
    ) {
      let objPush = {
        disc: '',
        DocumentNo: '',
        class: '',
        description: '',
        revision: '',
        docType: '',
        size: '',
        pageNumber: '',
        poi: '',
        copiesNumber: '',
        attachment: [],
        native: [],
        selectedDocumentObject: ''
      }
      let Document = this.state.documents
      Document.push(objPush)
      this.setState({ documents: Document, Selected: this.state.Selected + 1 })
    } else {
      Notification.notify(Message.text(904), 'error')
    }
  }
  handleSubmit = async () => {
    let checkDocument = await false,
      result = await {},
      documents = this.state.documents
    for (let i = 0; i < this.state.documents.length; i++) {
      if (
        handleCheckText(documents[i].disc) &&
        handleCheckText(documents[i].DocumentNo) &&
        handleCheckText(documents[i].class) &&
        handleCheckText(documents[i].description) &&
        handleCheckText(documents[i].revision) &&
        handleCheckText(documents[i].docType) &&
        handleCheckText(documents[i].size) &&
        handleCheckText(documents[i].pageNumber) &&
        handleCheckText(documents[i].poi) &&
        handleCheckText(documents[i].copiesNumber) &&
        documents[i].attachment.length > 0 &&
        documents[i].native.length > 0
      ) {
        checkDocument = await true
        await this.setState({ loading: 'submit' })
        let attachmentResult = await {},
          nativeResult = await {},
          attachment = documents[i].attachment,
          native = documents[i].native
        attachment.forEach((file1, index) => {
          attachmentResult[`${index}`] = file1
        })
        native.forEach((file2, key) => {
          nativeResult[key] = file2
        })
        documents[i].attachment = attachmentResult
        documents[i].native = nativeResult
        result[i] = documents[i]
      } else {
        checkDocument = false
      }
    }
    if (checkDocument) {
      this.setState({ disabled: true })
      setTimeout(async () => {
        let datareg = await new FormData()
        await datareg.append('letterNo', this.state.Letter_NO)
        await datareg.append('cc', this.state.cc)
        await datareg.append('documentsObject', JSON.stringify(result))
        await datareg.append('transmittalId', this.state.id)
        // await axios({
        //     method: 'post',
        //     url: `${StaticData.domainIp}/transmittal/update`,
        //     data: datareg,
        //     headers: {
        //         'Authorization' : `Bearer ${this.state.token?this.state.token:null}`
        //     },
        // })
        // .then(async(response)=>{
        //     await this.setState({loading : '' , disabled : false})
        //     if(response.status === 200){
        //         Notification.notify(Message.text(100), 'success');
        //         setTimeout(async() => {
        //             // await this.setState({redirect : true})
        //         }, 5000);
        //     }else {
        //         Notification.notify(Message.text(response.status), 'error');
        //     }
        // })
        // .catch((err)=>{
        //     this.setState({loading : '' , disabled : false})
        //     if(err.response){
        //         Notification.notify(Message.text(err.response.status), 'error');
        //     }
        // })
      }, 1000)
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to='/transmittal' />
      } else if (this.state.status === '0') {
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
                    nameRole='internal_transmittal_edit'
                    nameUrl={this.props.nameUrl}
                  />
                  <div className='w-100 row m-0 main-box-dashboard'>
                    <div className='boxes-dashboard row m-0 p-0'>
                      <div className='main-form'>
                        <div className='title-from'>
                          <h2>انتقال سند - Document Transmittal</h2>
                        </div>
                        <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                          <div className='col-12'>
                            <div className='message-error'>
                              <label className='strong'>
                                ترنسمیتال به دلیل زیر رد شد :{' '}
                              </label>
                              <p className='m-0'>{this.state.message}</p>
                            </div>
                          </div>
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
                                  handleCheckText(this.state.created_at)
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
                                    name='created_at'
                                    value={handleString(this.state.created_at)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.contractNo)
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
                                  name='contractNo'
                                  value={handleString(this.state.contractNo)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state._from)
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
                                  name='_from'
                                  value={handleString(this.state._from)}
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
                                  handleCheckText(this.state.cc) ? 'active' : ''
                                }`}
                              >
                                <label>CC.</label>
                                <input
                                  name='cc'
                                  readOnly={true}
                                  className='text-left'
                                  value={handleString(this.state.cc)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state._to)
                                    ? 'active'
                                    : ''
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
                                                  ? this.state.documents
                                                      .length - 1
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
                                          handleCheckText(data.disc)
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
                                          value={handleString(data.disc)}
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
                                          onClick={() => alert('cscsklcsk')}
                                          options={this.state.copyList}
                                          value={handleString(
                                            data.selectedDocumentObject
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
                                          handleCheckText(data.docType)
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
                                          name={`docType_${key}`}
                                          value={handleString(data.docType)}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div
                                        className={`field-form ${
                                          handleCheckText(data.description)
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
                                          name={`description_${key}`}
                                          value={handleString(data.description)}
                                        />
                                      </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div
                                        className={`field-form ${
                                          this.state.foucs ===
                                            `revision_${key}` ||
                                          handleCheckText(data.revision)
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
                                          name={`revision_${key}`}
                                          value={handleString(data.revision)}
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
                                          this.state.foucs === `class_${key}` ||
                                          handleCheckText(data.class)
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
                                          name={`class_${key}`}
                                          value={handleString(data.class)}
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
                                          this.state.foucs === `size_${key}` ||
                                          handleCheckText(data.size)
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
                                          name={`size_${key}`}
                                          value={handleString(data.size)}
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
                                            `pageNumber_${key}` ||
                                          handleCheckText(data.pageNumber)
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
                                          name={`pageNumber_${key}`}
                                          value={handleString(data.pageNumber)}
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
                                          this.state.foucs === `poi_${key}` ||
                                          handleCheckText(data.poi)
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
                                          name={`poi_${key}`}
                                          value={handleString(data.poi)}
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
                                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                      <div
                                        className={`field-form ${
                                          this.state.foucs ===
                                            `copiesNumber_${key}` ||
                                          handleCheckText(data.copiesNumber)
                                            ? 'active'
                                            : ''
                                        }`}
                                      >
                                        <label>
                                          No. Of Copies
                                          <span className='star IranSans_Bold'>
                                            *
                                          </span>
                                        </label>
                                        <input
                                          className='text-left'
                                          name={`copiesNumber_${key}`}
                                          value={handleString(
                                            data.copiesNumber
                                          )}
                                          onFocus={e =>
                                            this.OnFocus(e.target.name)
                                          }
                                          onBlur={this.OnBlur}
                                          onChange={this.handleChangeADD}
                                        />
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
                                        <div className='allName col row m-0 justify-content-end align-items-center'>
                                          {data.attachment.length
                                            ? data.attachment.map(
                                                (data1, index1) => (
                                                  <span key={index1}>
                                                    <CloseRoundedIcon
                                                      onClick={() =>
                                                        this.deleteFile(
                                                          key,
                                                          index1,
                                                          'attachment'
                                                        )
                                                      }
                                                    />
                                                    {data1}
                                                  </span>
                                                )
                                              )
                                            : ''}
                                          <input
                                            name={`attachment_${key}`}
                                            className='d-none'
                                            type='file'
                                            id={`attachment_${key}`}
                                            multiple
                                            onChange={e =>
                                              this.handleUpload(
                                                e,
                                                `attachment_${key}`
                                              )
                                            }
                                          />
                                          <label
                                            className='upload-label'
                                            htmlFor={`attachment_${key}`}
                                          >
                                            {this.state.loading ===
                                            `attachment_${key}` ? (
                                              <Loading className='form-loader w-auto' />
                                            ) : (
                                              <AttachFileIcon />
                                            )}
                                            آپلود فایل
                                          </label>
                                        </div>
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
                                        <div className='allName col row m-0 justify-content-end align-items-center'>
                                          {data.native.length
                                            ? data.native.map(
                                                (data2, index2) => (
                                                  <span key={index2}>
                                                    <CloseRoundedIcon
                                                      onClick={() =>
                                                        this.deleteFile(
                                                          key,
                                                          index2,
                                                          'native'
                                                        )
                                                      }
                                                    />
                                                    {data2}
                                                  </span>
                                                )
                                              )
                                            : ''}
                                          <input
                                            name={`native_${key}`}
                                            className='d-none'
                                            type='file'
                                            id={`native_${key}`}
                                            multiple
                                            onChange={e =>
                                              this.handleUpload(
                                                e,
                                                `native_${key}`
                                              )
                                            }
                                          />
                                          <label
                                            className='upload-label'
                                            htmlFor={`native_${key}`}
                                          >
                                            {this.state.loading ===
                                            `native_${key}` ? (
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
                                <label>{`${this.state.approveBy.first_name}  ${this.state.approveBy.last_name}`}</label>
                                <label
                                  className='upload-label signEnglish'
                                  onClick={() =>
                                    this.state.approveBy.sign
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
                              <button
                                className='w-auto'
                                onClick={this.handleSubmit}
                                disabled={this.state.disabled}
                              >
                                {this.state.loading === 'submit' ? (
                                  <Loading className='form-loader' />
                                ) : (
                                  <DoneIcon />
                                )}
                                ویرایش اطلاعات
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
                pictureShow={this.state.approveBy.sign}
              />
            ) : (
              ''
            )}
          </div>
        )
      } else {
        return <Redirect to='/transmittal' />
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
