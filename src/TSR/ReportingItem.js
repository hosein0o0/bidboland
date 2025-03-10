import React, { useState, useEffect } from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleString from '../handleString'
const ReportingItem = props => {
  const [list, setList] = useState([])
  useEffect(() => {
    if (props.state.detailReport) {
      setList(props.state.detailReport)
    }
  }, [props])
  return (
    <div className='main-reports'>
      <div className='main-report-detail'>
        {list.map((data, key) => (
          <div
            className={`report-detail px-1 ${
              props.state[`${data.value}_${key}_${props._key}`] ? 'active' : ''
            }`}
            key={key}
          >
            <input
              className='d-none'
              id={`${data.value}_${key}_${props._key}`}
              type='checkbox'
              onChange={e =>
                props.handleState(
                  `${data.value}_${key}_${props._key}`,
                  e.target.checked
                )
              }
            />
            <label
              htmlFor={`${data.value}_${key}_${props._key}`}
              className='d-flex align-items-center'
            >
              <span>{handleString(data.label)}</span>
              {props.state[`${data.value}_${key}_${props._key}`] ? (
                <CheckBoxRoundedIcon className='svg-detail' />
              ) : (
                <CheckBoxOutlineBlankRoundedIcon className='svg-detail' />
              )}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ReportingItem
