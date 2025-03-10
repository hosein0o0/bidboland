import React from 'react'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import handleString from '../handleString'
const EventsNote = props => {
  return (
    <ul className='listItems'>
      {props.event.length === 0 ? (
        <li className='empty'>موردی وجود ندارد</li>
      ) : (
        props.event.map((data, key) => (
          <li
            className={`item ${data.seen === '0' ? 'new' : ''}`}
            key={key}
            onClick={() => data.url && props.handleClick(data, key)}
          >
            <div className='main-item'>
              <p className={`${data.seen === '0' ? 'IranSans_Bold_FA' : 'IranSans_Medium_FA'} text`}>{handleString(data.title)}</p>
              {props.select !== data.id && (
                <div className='_tool'>
                  <p className='IranSans_Bold_FA mb-0'>{handleString(data.title)}</p>
                </div>
              )}
              {/* <span className='status'>2 ساعت پیش</span> */}
              {data.url ? (
                <div
                  className={`form-transfer ${
                    props.select === data.id ? 'active' : ''
                  }`}
                >
                  <a href={data.url} target='_blank' rel='noreferrer'>
                    انتقال به فرم
                    <KeyboardBackspaceIcon />
                  </a>
                </div>
              ) : (
                ''
              )}
            </div>
          </li>
        ))
      )}
    </ul>
  )
}
export default EventsNote
