import React from 'react'
import Header from '../Header/Header'
import HeaderItem from './HeaderItem'
import TextAreaWithRotate from '../TextAreaWithRotate'
import Attachment from '../Attachment/Attachment'
import Sign from '../Sign/Sign'
const ShowItems = props => {
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right position-relative flex-custome'>
          <div className='rotate flex-custome'>
            <span className='rotate-180'>
              (این صفحه توسط کارشناس TSR تکمیل می گردد.)
            </span>
          </div>
        </div>
        <div className='holder_left'>
          <Header {...props} />
          <div className='___mainSign'>
            <p className='b f16 tealc'>صفحه هفتم- دستور كار مهندسی</p>
            <HeaderItem {...props} />
            <TextAreaWithRotate
              {...props}
              boxText={true}
              className='halxx'
              label='شرح دستورالعمل مهندسی'
              value={`${props.value}_instruction`}
              time={true}
              timeValue={`${props.value}_time_execution`}
              laeblTime='زمان اجرا'
            />
            <Attachment
              {...props}
              foreign={`${props.value}_foreign_attachment`}
              internal={`${props.value}_internal_attachment`}
            />
            <Sign {...props} id={7} numTab={props.numTab} />
          </div>
        </div>
      </div>
    </page>
  )
}
export default ShowItems
