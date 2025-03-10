import React from 'react'
// import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import handleString from '../handleString'
function PositioningExcel (props) {
  return (
    <div className='main-positioning'>
      <div className='item-main-positioning row mr-0 ml-0'>
        <div className='col-xl-6 col-lg-4 col-md-6 col-12'>
          <div className='label-main-positioning'>
            <label className='mb-0'>History Type</label>
          </div>
        </div>
        <div className='col-xl-6 col-lg-8 col-md-6 col-12'>
          <div className='w-100 row mr-0 ml-0 main-input-detail'>
            <div className='col p-0'>
              <div
                className={`field-form mt-1 mb-1 ${
                  props.state.foucs === `history_type` ||
                  props.state.history_type
                    ? 'active'
                    : ''
                }`}
              >
                <label>History Type</label>
                <input
                  className='text-left'
                  name={`history_type`}
                  value={handleString(props.state.history_type)}
                  onFocus={e => props.OnFocus(e.target.name)}
                  onBlur={props.OnBlur}
                  onChange={e => props.handleChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='item-main-positioning row mr-0 ml-0'>
        <div className='col-xl-6 col-lg-4 col-md-6 col-12'>
          <div className='label-main-positioning'>
            <label className='mb-0'>Historical point list</label>
          </div>
        </div>
        <div className='col-xl-6 col-lg-8 col-md-6 col-12'>
          <div className='w-100 row mr-0 ml-0 main-input-detail'>
            <div className='col p-0'>
              <div
                className={`field-form mt-1 mb-1 ${
                  props.state.foucs === `historical_point_list` ||
                  props.state.historical_point_list
                    ? 'active'
                    : ''
                }`}
              >
                <label>Historical point list</label>
                <input
                  className='text-left'
                  name={`historical_point_list`}
                  value={handleString(props.state.historical_point_list)}
                  onFocus={e => props.OnFocus(e.target.name)}
                  onBlur={props.OnBlur}
                  onChange={e => props.handleChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='item-main-positioning row mr-0 ml-0'>
        <div className='col-xl-6 col-lg-4 col-md-6 col-12'>
          <div className='label-main-positioning'>
            <label className='mb-0'>Number of points</label>
          </div>
        </div>
        <div className='col-xl-6 col-lg-8 col-md-6 col-12'>
          <div className='w-100 row mr-0 ml-0 main-input-detail'>
            <div className='col p-0'>
              <div
                className={`field-form mt-1 mb-1 ${
                  props.state.foucs === `number_of_points` ||
                  props.state.number_of_points
                    ? 'active'
                    : ''
                }`}
              >
                <label>Number of points</label>
                <input
                  className='text-left'
                  name={`number_of_points`}
                  value={handleString(props.state.number_of_points)}
                  onFocus={e => props.OnFocus(e.target.name)}
                  onBlur={props.OnBlur}
                  onChange={e => props.handleChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='item-main-positioning row mr-0 ml-0'>
        <div className='col-xl-6 col-lg-4 col-md-6 col-12'>
          <div className='label-main-positioning'>
            <label className='mb-0'>Number of samples</label>
          </div>
        </div>
        <div className='col-xl-6 col-lg-8 col-md-6 col-12'>
          <div className='w-100 row mr-0 ml-0 main-input-detail'>
            <div className='col p-0'>
              <div
                className={`field-form mt-1 mb-1 ${
                  props.state.foucs === `number_of_samples` ||
                  props.state.number_of_samples
                    ? 'active'
                    : ''
                }`}
              >
                <label>Number of samples</label>
                <input
                  className='text-left'
                  name={`number_of_samples`}
                  value={handleString(props.state.number_of_samples)}
                  onFocus={e => props.OnFocus(e.target.name)}
                  onBlur={props.OnBlur}
                  onChange={e => props.handleChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PositioningExcel
