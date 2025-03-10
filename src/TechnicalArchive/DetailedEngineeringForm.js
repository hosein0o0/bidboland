import React, { Component } from 'react'
import Cookies from 'js-cookie'
// import axios from 'axios'
import StaticData from '../staticData'
// import Notification from '../notification/notification'
// import Message from '../notification/Message'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import Form from '../Form/Form'
// import getCustomFormat from '../getCustomFormat'
import { Redirect } from 'react-router-dom'
// import handleCheckText from '../handleCheckText'
import CancelButton from '../layout/CancelButton'
import List from './API/StaticList'
import APIForm from './API/APIForm'
import handleCheckText from '../handleCheckText'
// import handleString from '../handleString'
export default class DetailedEngineeringForm extends Component {
  constructor(props) {
    super(props)
    this.APIForm = new APIForm(this)
    this.newList = new List(this)
    this.state = {
      token: Cookies.get('token'),
      other_path: [],
      other_path_Names: [],
      native_path: [],
      native_path_Names: [],
      reply_sheet_path: [],
      reply_sheet_path_Names: [],
      comment_sheet_path: [],
      comment_sheet_path_Names: [],
      transmittal_path: [],
      transmittal_path_Names: [],
      document_path: [],
      document_path_Names: [],
      status_check: 1,
      projectCodeList: []
    }
  }
  componentDidMount() {
    document.title = `${StaticData.Title} - ایجاد مهندسی تفضیلی`
    const { fetchDataDeatailEng } = this.APIForm
    fetchDataDeatailEng()
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    const { name, value, maxLength } = e.target
    this.setState({
      [name]: maxLength !== -1 ? value.slice(0, maxLength) : value
    })
  }
  handleState = obj => {
    this.setState(obj)
  }

  handleUpload = (e, nameFiles) => {
    const { accept, files } = e.target
    const {
      handleUploadDetailEng,
      CheckField,
      hanleNameFileField,
      ResultFile,
      handleswitchUrl,
      handleFilterFileUpload
    } = this.APIForm
    if (CheckField(nameFiles)) {
      let _files = handleFilterFileUpload(accept, files)
        if (_files.length > 0) {
        const nameFile = hanleNameFileField(nameFiles)
        if (handleCheckText(nameFile)) {
          const Resultfiles = ResultFile(nameFile, _files)
          const url = handleswitchUrl(nameFiles)
          if (handleCheckText(url)) {
            e.preventDefault()
            handleUploadDetailEng(
              Resultfiles,
              url,
              nameFiles,
              `${nameFiles}Names`
            )
          }
        }
      }
    }
  }
  deleteFile = async (num, files) => {
    const { deleteFileAPI } = this.APIForm
    deleteFileAPI(num, files, `${files}_Names`)
  }
  handleSubmit = pageName => {
    const { SubmitDetailEng, handleSubmitApi } = this.APIForm
    const { status_check } = this.state
    let url = `detailEng/create`
    if (status_check === 1) SubmitDetailEng('detailEng/createCheck')
    else if (status_check === 2) handleSubmitApi(pageName, url)
  }
  render() {
    const { handleListDetailEng2, handleListDetailEng1 } = this.newList
    const itemForm1 = handleListDetailEng1()
    const itemForm2 = handleListDetailEng2()
    const { token, redirect, _close, disabled, loading, status_check } =
      this.state
    if (token === undefined) {
      return <Redirect to='/Login' />
    } else if (redirect) {
      return (
        <Redirect
          to={{
            pathname: `/engineering-document`,
            state: { select: 2 }
          }}
        />
      )
    } else {
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              <Sidebar
                handleState={(name, value) => this.setState({ [name]: value })}
              />
              <div
                className={`${_close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
                  } dashboard`}
              >
                <Menu
                  nameRole='detail_engineering_create'
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>ایجاد سند جدید</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row ltr'>
                          <Form {...this} itemForm={itemForm1} />
                          {status_check === 2 && (
                            <Form {...this} itemForm={itemForm2} />
                          )}
                          <div className='submit-form rtl col-12 mt-5'>
                            <button
                              onClick={() => this.handleSubmit('detailEng')}
                              disabled={disabled}
                            >
                              {loading === 'submit' ? (
                                <Loading className='form-loader' />
                              ) : (
                                <DoneIcon />
                              )}
                              {status_check === 2 ? 'ثبت اطلاعات' : 'ادامه'}
                            </button>
                            <CancelButton
                              redirect='engineering-document'
                              status={2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
