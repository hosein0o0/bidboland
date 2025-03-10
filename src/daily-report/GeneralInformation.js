import React, { Component } from 'react'
// import Select from 'react-select';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
// import AttachFileIcon from '@material-ui/icons/AttachFile';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import DatePicker from 'react-datepicker2'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
// import TimeKeeper from 'react-timekeeper';
import Clock from './clock'
import AddIcon from '@material-ui/icons/Add'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
export default class Information extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showTime: true
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.props = nextProps
      this.setState(this.state)
    }
  }
  handleAdd = () => {
    let obj = {
      typeCar: '',
      readyNumber: '',
      workHours: '',
      activityNumber: ''
    }
    this.props.addData('machinery', obj)
  }
  render () {
    return (
      <div className='form row ltr'>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              this.state.foucs === 'project' ||
              handleCheckText(this.state.project)
                ? 'active'
                : ''
            }`}
          >
            <label>
              project
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='project'
              value={handleString(this.state.project)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              this.state.foucs === 'phase' || handleCheckText(this.state.phase)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Phase
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='phase'
              value={handleString(this.state.phase)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              this.state.foucs === 'disc' || handleCheckText(this.state.disc)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Disc
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='disc'
              value={handleString(this.state.disc)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              this.state.foucs === 'unit' || handleCheckText(this.state.unit)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Unit
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='unit'
              value={handleString(this.state.unit)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              this.state.foucs === 'doctype' ||
              handleCheckText(this.state.doctype)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Doc. Type
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='doctype'
              value={handleString(this.state.doctype)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              this.state.foucs === 'serNo' || handleCheckText(this.state.serNo)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Ser.No
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='serNo'
              value={handleString(this.state.serNo)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              this.state.foucs === 'revNo' || handleCheckText(this.state.revNo)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Rev.No
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='revNo'
              value={handleString(this.state.revNo)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian rtl ${
              this.state.foucs === 'contractNumber' ||
              handleCheckText(this.state.contractNumber)
                ? 'active'
                : ''
            }`}
          >
            <label>
              شماره قرار داد
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              name='contractNumber'
              value={handleString(this.state.contractNumber)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian rtl ${
              this.state.foucs === 'projectNumber' ||
              handleCheckText(this.state.projectNumber)
                ? 'active'
                : ''
            }`}
          >
            <label>
              نام پروژه
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              name='projectNumber'
              value={handleString(this.state.projectNumber)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian rtl ${
              this.state.foucs === 'referenceID' ||
              handleCheckText(this.state.referenceID)
                ? 'active'
                : ''
            }`}
          >
            <label>
              شناسه مرجع
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              name='referenceID'
              value={handleString(this.state.referenceID)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian rtl ${
              this.state.foucs === 'contractorName' ||
              handleCheckText(this.state.contractorName)
                ? 'active'
                : ''
            }`}
          >
            <label>
              نام پیمانکار
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              name='contractorName'
              value={handleString(this.state.contractorName)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian rtl ${
              this.state.foucs === 'projectNumber' ||
              handleCheckText(this.state.projectNumber)
                ? 'active'
                : ''
            }`}
          >
            <label>
              شماره پروژه
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              name='projectNumber'
              value={handleString(this.state.projectNumber)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === `dateSubmit` ||
              handleCheckText(this.state.dateSubmit)
                ? 'active'
                : ''
            }`}
          >
            <div className='icon-field'>
              <DateRangeRoundedIcon />
            </div>
            <div className='col p-0'>
              <label>تاریخ ثبت گزارش</label>
              <DatePicker
                persianDigits={true}
                isGregorian={false}
                timePicker={false}
                onChange={dateSubmit =>
                  this.props.getDate(dateSubmit, 'dateSubmit')
                }
                value={this.state.dateSubmit}
              />
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian rtl ${
              this.state.foucs === 'reportNumber' ||
              handleCheckText(this.state.reportNumber)
                ? 'active'
                : ''
            }`}
          >
            <label>
              شماره گزارش
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              name='reportNumber'
              value={handleString(this.state.reportNumber)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian rtl ${
              this.state.foucs === 'day' || handleCheckText(this.state.day)
                ? 'active'
                : ''
            }`}
          >
            <label>
              روز
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              name='day'
              value={handleString(this.state.day)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === `reportDate` ||
              handleCheckText(this.state.reportDate)
                ? 'active'
                : ''
            }`}
          >
            <div className='icon-field'>
              <DateRangeRoundedIcon />
            </div>
            <div className='col p-0'>
              <label>تاریخ گزارش</label>
              <DatePicker
                persianDigits={true}
                isGregorian={false}
                timePicker={false}
                onChange={reportDate =>
                  this.props.getDate(reportDate, 'reportDate')
                }
                value={this.state.reportDate}
              />
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form clock persian ${
              this.state.foucs === `endTime` ||
              handleCheckText(this.state.endTime)
                ? 'active'
                : ''
            }`}
          >
            <div className='icon-field'>
              <QueryBuilderIcon />
            </div>
            <div className='col p-0 ltr'>
              <label>ساعت کار تا</label>
              <Clock
                getTime={(name, time) => this.props.GetTime(name, time)}
                name='endTime'
                value={this.state.endTime}
              />
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form clock persian ${
              this.state.foucs === `startTime` ||
              handleCheckText(this.state.startTime)
                ? 'active'
                : ''
            }`}
          >
            <div className='icon-field'>
              <QueryBuilderIcon />
            </div>
            <div className='col p-0 ltr'>
              <label>ساعت کار از</label>
              <Clock
                getTime={(name, time) => this.props.GetTime(name, time)}
                name='startTime'
                value={this.state.startTime}
              />
            </div>
          </div>
        </div>
        <div className='title-password col-12'>
          <div className='line'></div>
          <h2 className='IranSans_Bold'>اطلاعات ماشین آلات و تجهیزات</h2>
        </div>
        {this.state.machinery.map((data, key) => (
          <div className='w-100 row m-0' key={key}>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian rtl ${
                  this.state.foucs === `readyNumber_${key}` ||
                  handleCheckText(data.readyNumber)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  تعداد آماده به کار
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={false}
                  onFocus={e => this.props.OnFocus(e.target.name)}
                  onBlur={this.props.OnBlur}
                  onChange={e => this.props.handleChangeList(e, 'machinery')}
                  name={`readyNumber_${key}`}
                  value={handleString(data.readyNumber)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian pl-1 ${
                  this.state.foucs === `typeCar_${key}` ||
                  handleCheckText(data.typeCar)
                    ? 'active'
                    : ''
                }`}
              >
                <label>نوع ماشین</label>
                <select
                  name={`typeCar_${key}`}
                  onFocus={e => this.props.OnFocus(e.target.name)}
                  onBlur={this.props.OnBlur}
                  onChange={e => this.props.handleChangeList(e, 'machinery')}
                  value={data.typeCar}
                >
                  <option className='d-none'></option>
                  <option>test</option>
                  <option>test</option>
                  <option>test</option>
                  <option>test</option>
                </select>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian rtl ${
                  this.state.foucs === `workHours_${key}` ||
                  handleCheckText(data.workHours)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  ساعت کارکرد تا کنون
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={false}
                  onFocus={e => this.props.OnFocus(e.target.name)}
                  onBlur={this.props.OnBlur}
                  onChange={e => this.props.handleChangeList(e, 'machinery')}
                  name={`workHours_${key}`}
                  value={handleString(data.workHours)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian rtl ${
                  this.state.foucs === `activityNumber_${key}` ||
                  handleCheckText(data.activityNumber)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  تعداد فعال
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={false}
                  onFocus={e => this.props.OnFocus(e.target.name)}
                  onBlur={this.props.OnBlur}
                  onChange={e => this.props.handleChangeList(e, 'machinery')}
                  name={`activityNumber_${key}`}
                  value={handleString(data.activityNumber)}
                />
              </div>
            </div>
            <div className='col-12'>
              <div className='line'>
                <hr />
              </div>
            </div>
          </div>
        ))}
        <div className='button-add col-12'>
          <button onClick={this.handleAdd}>
            <AddIcon />
            افزودن مورد جدید
          </button>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div
            className={`field-form persian textarea ${
              this.state.foucs === 'difficulties' ||
              handleCheckText(this.state.difficulties)
                ? 'active'
                : ''
            }`}
          >
            <div className='col p-0'>
              <label className='textarea'>
                رویدادها و مشکلات موثر بر زمان و هزینه و پیشنهادها
              </label>
              <textarea
                className='w-100'
                type='text'
                name='difficulties'
                onFocus={e => this.props.OnFocus(e.target.name)}
                onBlur={this.props.OnBlur}
                onChange={this.props.handleChange}
                value={handleString(this.state.difficulties)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian rtl ${
              this.state.foucs === 'letterNumber' ||
              handleCheckText(this.state.letterNumber)
                ? 'active'
                : ''
            }`}
          >
            <label>شماره نامه</label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              name='letterNumber'
              value={handleString(this.state.letterNumber)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian rtl ${
              this.state.foucs === 'correspondence' ||
              handleCheckText(this.state.correspondence)
                ? 'active'
                : ''
            }`}
          >
            <label>مکاتبات مهم</label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              name='correspondence'
              value={handleString(this.state.correspondence)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian rtl ${
              this.state.foucs === 'actionable' ||
              handleCheckText(this.state.actionable)
                ? 'active'
                : ''
            }`}
          >
            <label>مکاتبات مهم</label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              name='actionable'
              value={handleString(this.state.actionable)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === `date` || handleCheckText(this.state.date)
                ? 'active'
                : ''
            }`}
          >
            <div className='icon-field'>
              <DateRangeRoundedIcon />
            </div>
            <div className='col p-0'>
              <label>تاریخ</label>
              <DatePicker
                persianDigits={true}
                isGregorian={false}
                timePicker={false}
                onChange={date => this.props.getDate(date, 'date')}
                value={this.state.date}
              />
            </div>
          </div>
        </div>
        <div className='row m-0 rtl w-100'>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
            <div className='field-radio rtl w-100'>
              <label>آیا حادثه ای رخ داده است ؟</label>
              <div className='main-radio'>
                <div className='radio-button'>
                  <input
                    className='d-none'
                    type='radio'
                    id='yes'
                    onClick={() =>
                      this.props.handleChangeRadion('accident', 'yes')
                    }
                  />
                  <label htmlFor='yes'>
                    {this.state.accident === 'yes' ? (
                      <RadioButtonCheckedIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                    بله
                  </label>
                </div>
                <div className='radio-button'>
                  <input
                    className='d-none'
                    type='radio'
                    id='no'
                    onClick={() =>
                      this.props.handleChangeRadion('accident', 'no')
                    }
                  />
                  <label htmlFor='no'>
                    {this.state.accident === 'no' ? (
                      <RadioButtonCheckedIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                    خیر
                  </label>
                </div>
              </div>
            </div>
          </div>
          {this.state.accident === 'yes' ? (
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian rtl ${
                  this.state.foucs === 'descriptionAncident' ||
                  handleCheckText(this.state.descriptionAncident)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  شرح مختصر حادثه
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={false}
                  onFocus={e => this.props.OnFocus(e.target.name)}
                  onBlur={this.props.OnBlur}
                  onChange={this.props.handleChange}
                  name='descriptionAncident'
                  value={handleString(this.state.descriptionAncident)}
                />
              </div>
            </div>
          ) : (
            ''
          )}
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
