import React, { Component } from 'react'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
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
        <div className='title-password col-12'>
          <h2 className='IranSans_Bold'>Refrence</h2>
          <div className='line mr-0 ml-2'></div>
        </div>
        <div className='col-12 p-0'>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form ${
                state.foucs === 'documentNumberMto' ||
                handleCheckText(state.documentNumberMto)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                DOC . NO
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={false}
                onFocus={e => this.props.OnFocus(e.target.name)}
                onBlur={this.props.OnBlur}
                onChange={this.props.handleChange}
                className='text-left'
                name='documentNumberMto'
                value={handleString(state.documentNumberMto)}
              />
            </div>
          </div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'activityName' ||
              handleCheckText(state.activityName)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Activity Name
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='activityName'
              value={handleString(state.activityName)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'classMto' || handleCheckText(state.classMto)
                ? 'active'
                : ''
            }`}
          >
            <label>
              class
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='classMto'
              value={handleString(state.classMto)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'ddm' || handleCheckText(state.ddm)
                ? 'active'
                : ''
            }`}
          >
            <label>
              DDM Category
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='ddm'
              value={handleString(state.ddm)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'AFC' || handleCheckText(state.AFC)
                ? 'active'
                : ''
            }`}
          >
            <label>
              AFC Final
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='AFC'
              value={handleString(state.AFC)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'revMto' || handleCheckText(state.revMto)
                ? 'active'
                : ''
            }`}
          >
            <label>
              rev
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='revMto'
              value={handleString(state.revMto)}
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
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='areaCode'
              value={handleString(state.areaCode)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'docType' || handleCheckText(state.docType)
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
              name='docType'
              value={handleString(state.docType)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'dicsiplineMto' ||
              handleCheckText(state.dicsiplineMto)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Dicsipline
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='dicsiplineMto'
              value={handleString(state.dicsiplineMto)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'pahase' || handleCheckText(state.pahase)
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
              name='pahase'
              value={handleString(state.pahase)}
            />
          </div>
        </div>
        <div className='title-password col-12'>
          <h2 className='IranSans_Bold'>Mto Allcation</h2>
          <div className='line mr-0 ml-2'></div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'dicsiplineMtoAllocation' ||
              handleCheckText(state.dicsiplineMtoAllocation)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Dicsipline
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='dicsiplineMtoAllocation'
              value={handleString(state.dicsiplineMtoAllocation)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              this.state.foucs === `subDicsipline` ||
              handleCheckText(state.subDicsipline)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Sub Dicsipline
              <span className='star IranSans_Bold'>*</span>
            </label>
            <select
              name={`subDicsipline`}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              value={handleString(state.subDicsipline)}
            >
              <option className='d-none'></option>
              <option value='test'>test</option>
              <option value='test'>test</option>
              <option value='test'>test</option>
              <option value='test'>test</option>
              <option value='test'>test</option>
              <option value='test'>test</option>
            </select>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'materialCode' ||
              handleCheckText(state.materialCode)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Material Code
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='materialCode'
              value={handleString(state.materialCode)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'unit' || handleCheckText(state.unit)
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
              value={handleString(state.unit)}
            />
          </div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div
            className={`field-form textarea ${
              state.foucs === 'descriptionMto' ||
              handleCheckText(state.descriptionMto)
                ? 'active'
                : ''
            }`}
          >
            <div className='col p-0'>
              <label className='textarea'>Description</label>
              <textarea
                className='w-100 text-left'
                type='text'
                name='descriptionMto'
                onFocus={e => this.props.OnFocus(e.target.name)}
                onBlur={this.props.OnBlur}
                value={handleString(state.descriptionMto)}
                // onChange={this.handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'quanlityCalculated' ||
              handleCheckText(state.quanlityCalculated)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Quanlity Calculated
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='quanlityCalculated'
              value={handleString(state.quanlityCalculated)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'continjencyFactor' ||
              handleCheckText(state.continjencyFactor)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Engineering Continjency Factor
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='continjencyFactor'
              value={handleString(state.continjencyFactor)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              state.foucs === 'addedSpare' || handleCheckText(state.addedSpare)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Added Spare
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              onChange={this.props.handleChange}
              className='text-left'
              name='addedSpare'
              value={handleString(state.addedSpare)}
            />
          </div>
        </div>
        <div className='submit-form col-12 mt-5 justify-content-end'>
          <button className='w-auto' disabled={this.state.disabled}>
            ثبت اطلاعات
            {this.state.loading === 'submit' ? (
              <Loading className='form-loader' />
            ) : (
              <DoneIcon />
            )}
          </button>
        </div>
      </div>
    )
  }
}
