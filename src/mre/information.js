import React, { Component } from 'react'
import Select from 'react-select'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
import { handleFilter } from '../table/OutputFilter'
export default class Information extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.props = nextProps
    }
  }
  render () {
    let { state } = this.props
    return (
      <div className='form row ltr'>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'Mre_No' || handleCheckText(state.Mre_No)
                ? 'active'
                : ''
            }`}
          >
            <label>
              MRE NO
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='Mre_No'
              value={handleString(state.Mre_No)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'project' || handleCheckText(state.project)
                ? 'active'
                : ''
            }`}
          >
            <label>
              project
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              name='project'
              value={handleString(state.project)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'phase' || handleCheckText(state.phase)
                ? 'active'
                : ''
            }`}
          >
            <label>
              phase
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              name='phase'
              value={handleString(state.phase)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'areaCode' || handleCheckText(state.areaCode)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Area Code
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              name='areaCode'
              value={handleString(state.areaCode)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'discipline' || handleCheckText(state.discipline)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Discipline
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              name='discipline'
              value={handleString(state.discipline)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'doctype' || handleCheckText(state.doctype)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Doc.Type
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              name='doctype'
              value={handleString(state.doctype)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'ser_NO' || handleCheckText(state.ser_NO)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Ser.No.
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              name='ser_NO'
              value={handleString(state.ser_NO)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'revision' || handleCheckText(state.revision)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Rev.
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              name='revision'
              value={handleString(state.revision)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'class' || handleCheckText(state.class)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Class
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              name='class'
              value={handleString(state.class)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'contract_No' ||
              handleCheckText(state.contract_No)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Contract No.
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              name='contract_No'
              value={handleString(state.contract_No)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'project_Description' ||
              handleCheckText(state.project_Description)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Project Description
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              name='project_Description'
              value={handleString(state.project_Description)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'client' || handleCheckText(state.client)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Client
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              name='client'
              value={handleString(state.client)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'consultant' || handleCheckText(state.consultant)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Consultant
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              name='consultant'
              value={handleString(state.consultant)}
            />
          </div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div className='field-form selectBox'>
            <Select
              onChange={newValue =>
                this.props.getLabel('vendorSelected', 'valueVendor', newValue)
              }
              isMulti
              name='vendorSelected'
              options={state.vendorList}
              className='basic-multi-select ltr'
              value={state.valueVendor}
              classNamePrefix='select'
              placeholder={
                <label>
                  Approved Vendors
                  <span className='star IranSans_Bold'>*</span>
                </label>
              }
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === `lastRevisionDate` ||
              handleCheckText(state.lastRevisionDate)
                ? 'active'
                : ''
            }`}
          >
            <div className='icon-field'>
              <DateRangeRoundedIcon />
            </div>
            <div className='col p-0'>
              <label>
                last Rev Date
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={true}
                name='lastRevisionDate'
                value={handleString(state.lastRevisionDate)}
              />
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === `purposeIssue` || handleCheckText(state.purposeIssue)
                ? 'active'
                : ''
            }`}
          >
            <div className='col p-0'>
              <label>
                Purpose of Issue
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={true}
                name='purposeIssue'
                value={handleString(state.purposeIssue)}
              />
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${state.pred.text !== '' ? 'active' : ''}`}
          >
            <label>
              PRE'D
              <span className='star IranSans_Bold'>*</span>
            </label>
            <label className='label'>{state.pred.text}</label>
            <label
              className='upload-label signEnglish white'
              onClick={() => this.props.handlePopup(true, state.pred.sign)}
            >
              sign
              <AttachFileIcon />
            </label>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${state.chkd.text !== '' ? 'active' : ''}`}
          >
            <label>
              CHK'D
              <span className='star IranSans_Bold'>*</span>
            </label>
            <label className='label'>{state.chkd.text}</label>
            <label
              className='upload-label signEnglish white'
              onClick={() => this.props.handlePopup(true, state.chkd.sign)}
            >
              sign
              <AttachFileIcon />
            </label>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${state.aprd.text !== '' ? 'active' : ''}`}
          >
            <label>
              APR'D
              <span className='star IranSans_Bold'>*</span>
            </label>
            <label className='label'>{state.aprd.text}</label>
            <label
              className='upload-label signEnglish white'
              onClick={() => this.props.handlePopup(true, state.aprd.sign)}
            >
              sign
              <AttachFileIcon />
            </label>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${state.autd.text !== '' ? 'active' : ''}`}
          >
            <label>
              AUT'D
              <span className='star IranSans_Bold'>*</span>
            </label>
            <label className='label'>{state.autd.text}</label>
            <label
              className='upload-label signEnglish white'
              onClick={() => this.props.handlePopup(true, state.autd.sign)}
            >
              sign
              <AttachFileIcon />
            </label>
          </div>
        </div>
        <div className='submit-form col-12 justify-content-end mt-4'>
          <button
            className='level justify-content-end w-auto'
            onClick={() => this.props.changeLevel(1)}
          >
            <ArrowBackIosIcon />
            مرحله بعد
          </button>
        </div>
      </div>
    )
  }
}
