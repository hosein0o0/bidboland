import React, { Component } from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
export default class TagDescription extends Component {
  constructor (props) {
    super(props)
    this.state = {
      obj: {
        documentNumber: '',
        documentTitle: '',
        documentType: '',
        documentStatus: '',
        remarks: ''
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
    }
  }
  render () {
    return (
      <div className='form row ltr'>
        {this.props.state.attachmentsList.map((data, key) => (
          <div className='w-100 mt-1 mb-2 col-12 row mr-0 ml-0 p-0' key={key}>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.props.state.foucs === `documentNumber_${key}` ||
                  data.documentNumber !== ''
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  Doc. NO
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  className='text-left'
                  name={`documentNumber_${key}`}
                  value={handleString(data.documentNumber)}
                  onFocus={e => this.props.OnFocus(e.target.name)}
                  onBlur={this.props.OnBlur}
                  onChange={e =>
                    this.props.handleChangeTag(e, 'attachmentsList')
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.props.state.foucs === `documentTitle_${key}` ||
                  data.documentTitle !== ''
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  Doc. Title
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  className='text-left'
                  name={`documentTitle_${key}`}
                  value={handleString(data.documentTitle)}
                  onFocus={e => this.props.OnFocus(e.target.name)}
                  onBlur={this.props.OnBlur}
                  onChange={e =>
                    this.props.handleChangeTag(e, 'attachmentsList')
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.props.state.foucs === `documentType_${key}` ||
                  data.documentType !== ''
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  Doc. Type
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  className='text-left'
                  name={`documentType_${key}`}
                  value={handleString(data.documentType)}
                  onFocus={e => this.props.OnFocus(e.target.name)}
                  onBlur={this.props.OnBlur}
                  onChange={e =>
                    this.props.handleChangeTag(e, 'attachmentsList')
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.props.state.foucs === `documentStatus_${key}` ||
                  data.documentStatus !== ''
                    ? 'active'
                    : ''
                }`}
              >
                <div className='icon-field'>
                  <LocationOnIcon />
                </div>
                <div className='col p-0'>
                  <label>
                    Doc. Status
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <input
                    className='text-left'
                    name={`documentStatus_${key}`}
                    onFocus={e => this.props.OnFocus(e.target.name)}
                    onBlur={this.props.OnBlur}
                    onChange={e =>
                      this.props.handleChangeTag(e, 'attachmentsList')
                    }
                    value={handleString(data.documentStatus)}
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
                      this.props.handleChangeTag(e, 'attachmentsList')
                    }
                    value={handleString(data.remarks)}
                  ></textarea>
                </div>
              </div>
            </div>
            {this.props.state.attachmentsList.length > 1 ? (
              <div className='delete-item col-12'>
                <button
                  onClick={() => this.props.DeleteTag(key, 'attachmentsList')}
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
              this.props.AddTag('attachmentsList', {
                documentNumber: '',
                documentTitle: '',
                documentType: '',
                documentStatus: '',
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
            onClick={() => this.props.changeLevel(3)}
          >
            <ArrowBackIosIcon />
            مرحله بعد
          </button>
        </div>
      </div>
    )
  }
}
