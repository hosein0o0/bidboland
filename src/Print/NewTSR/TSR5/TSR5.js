import React from 'react'
import Header from '../Header/Header'
import ReviewResult from './ReviewResult'
import TextAreaWithRotate from '../TextAreaWithRotate'
import Attachment from '../Attachment/Attachment'
import Sign from '../Sign/Sign'
const TSR5 = props => {
  // let { review_result } = props.data
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right position-relative flex-custome'></div>
        <div className='holder_left'>
          <Header {...props} />
          <div className='___mainSign'>
            <p className='b f16 tealc'>
              صفحه پنجم - بررسی TSRتوسط مهندسی عمومی
            </p>
            <ReviewResult {...props} />
            <TextAreaWithRotate
              {...props}
              boxText={true}
              className='halxx'
              label='دلایل عدم تائید'
              value='reject_msg'
              text_rotate='این قسمت در صورت عدم تایيد تكميل گردد'
              time={true}
              timeValue='suggested_execution_time'
              laeblTime='زمان پیشنهادی جهت اجرا'
            />
            <Attachment
              {...props}
              foreign='foreign_attachment'
              internal='internal_attachment'
            />
            <Sign {...props} id={5}/>
          </div>
        </div>
      </div>
    </page>
  )
}
export default TSR5
