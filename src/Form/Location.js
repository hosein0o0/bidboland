import React from 'react'
import CreatableSelect from 'react-select/creatable'
import RoomIcon from '@material-ui/icons/Room'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
function Location (props) {
  return (
    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
      <div
        className={`field-form pl-1 selectBox ${
          props.hadnleClassName(props.data).className
        } ${
          handleCheckText(props.state[props.data.value]) ||
          props.state.foucs === `${props.data.value}`
            ? 'active'
            : ''
        }`}
      >
        <div className='icon-field labelSelect'>
          <RoomIcon />
        </div>
        <CreatableSelect
          value={
             handleString(props.state[props.data.value])
          }
          onChange={newValue => props.handleState(props.data.value, newValue)}
          options={props.data.listItem}
          placeholder={
            <label className='textarea'>
              {props.data.name}
              {props.handleRequire(props.data)}
            </label>
          }
        />
      </div>
    </div>
  )
}
export default Location
