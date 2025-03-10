import React from 'react'
import handleCheckText from '../handleCheckText'
const CCDisabled = props => {
  const {
    handledetailsSigned
    // , handleCheckShowNameSignAPI
  } = props.props.API
  const list = handledetailsSigned() || []
  let array = props.state[props.nameCC || 'notification_cc_info'] || []
  const checkArray = array.length > 0
  const filter = list.filter(
    item => handleCheckText(item.firstName) && handleCheckText(item.lastName)
  )
  const checkList = filter.length > 0
  return (
    <div className='w-100 row mx-0'>
      {checkList && (
        <div className='title-password col-12 mt-3 mb-2'>
          <h2 className='IranSans_Bold'>نفرات بررسی کننده</h2>
          <div className='line'></div>
        </div>
      )}
      {filter.map((item, key) => (
        <div className='w-auto d-block w-100 col-12 px-1' key={key}>
          <div className='col-12 my-1'>
            <label className='mb-0'>{item.label} :</label>
            <span className='mr-2 ml-2 IranSans_Bold'>
              {item.firstName} {item.lastName}
            </span>
          </div>
        </div>
      ))}
      {checkArray && (
        <div className='w-100 col-12 my-2 row mx-0'>
          <label className='mb-0'>CC :</label>
          <div className='col row mx-0 px-0'>
            <span className='mr-1 ml-1 mb-1'>
              {array.join(' و ')}
            </span>
            {/* {array.map((name, index) => (
              <span className='mr-1 ml-1 mb-1' key={index}>
                {name}
              </span>
            ))} */}
          </div>
        </div>
      )}
    </div>
  )
  // } else return ''
}
export default CCDisabled
