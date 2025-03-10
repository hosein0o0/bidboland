import React, { Component } from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class TagDescription extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
    }
  }
  render () {
    return (
      <div className='form row ltr'>
        {this.props.state.tagDescription.map((data, key) => (
          <div className='w-100 mt-1 mb-2 col-12 row mr-0 ml-0 p-0' key={key}>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.props.state.foucs === `equipment_${key}` ||
                  handleCheckText(data.equipment)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  Equipment Tag. No
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  className='text-left'
                  name={`equipment_${key}`}
                  value={handleString(data.equipment)}
                  onFocus={e => this.props.OnFocus(e.target.name)}
                  onBlur={this.props.OnBlur}
                  onChange={e =>
                    this.props.handleChangeTag(e, 'tagDescription')
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.props.state.foucs === `description_${key}` ||
                  handleCheckText(data.description)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  Description
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  className='text-left'
                  name={`description_${key}`}
                  value={handleString(data.description)}
                  onFocus={e => this.props.OnFocus(e.target.name)}
                  onBlur={this.props.OnBlur}
                  onChange={e =>
                    this.props.handleChangeTag(e, 'tagDescription')
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.props.state.foucs === `qty_${key}` ||
                  handleCheckText(data.qty)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  QTY
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  className='text-left'
                  name={`qty_${key}`}
                  value={handleString(data.qty)}
                  onFocus={e => this.props.OnFocus(e.target.name)}
                  onBlur={this.props.OnBlur}
                  onChange={e =>
                    this.props.handleChangeTag(e, 'tagDescription')
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.props.state.foucs === `location_${key}` ||
                  handleCheckText(data.location)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='icon-field'>
                  <LocationOnIcon />
                </div>
                <div className='col p-0'>
                  <label>
                    Location
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <input
                    className='text-left'
                    name={`location_${key}`}
                    onFocus={e => this.props.OnFocus(e.target.name)}
                    onBlur={this.props.OnBlur}
                    onChange={e =>
                      this.props.handleChangeTag(e, 'tagDescription')
                    }
                    value={handleString(data.location)}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
              <div
                className={`field-form textarea ${
                  this.props.state.foucs === `remarks_${key}` ||
                  handleCheckText(data.remarks)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='col p-0'>
                  <label className='textarea'>Remark</label>
                  <textarea
                    className='w-100 text-left'
                    type='text'
                    name={`remarks_${key}`}
                    onFocus={e => this.props.OnFocus(e.target.name)}
                    onBlur={this.props.OnBlur}
                    onChange={e =>
                      this.props.handleChangeTag(e, 'tagDescription')
                    }
                    value={handleString(data.remarks)}
                  ></textarea>
                </div>
              </div>
            </div>
            {this.props.state.tagDescription.length > 1 ? (
              <div className='delete-item col-12'>
                <button
                  onClick={() => this.props.DeleteTag(key, 'tagDescription')}
                >
                  <DeleteIcon />
                  Delete
                </button>
              </div>
            ) : (
              ''
            )}
            <span className='border-form'></span>
          </div>
        ))}
        <div className='button-add col-12'>
          <button
            onClick={() =>
              this.props.AddTag('tagDescription', {
                equipment: '',
                description: '',
                qty: '',
                location: '',
                remarks: ''
              })
            }
          >
            <AddIcon />
            Add More Item
          </button>
        </div>
        <div className='submit-form col-12 justify-content-end mt-4'>
          <button
            className='level justify-content-end w-auto'
            onClick={() => this.props.changeLevel(2)}
          >
            <ArrowBackIosIcon />
            مرحله بعد
          </button>
        </div>
      </div>
    )
  }
}
