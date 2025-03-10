import React from 'react'
import Header from '../Header/Header'
import ReviewResult from './ReviewResult'
import TextAreaWithRotate from '../TextAreaWithRotate'
import Attachment from '../Attachment/Attachment'
import Sign from '../Sign/Sign'
const TSR3 = props => {
  const { review_result } = props.data
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right position-relative flex-custome'></div>
        <div className='holder_left'>
          <Header {...props} />
          <div className='___mainSign'>
            <div
              className='b f16 tealc'
              style={{ borderBottom: '3px solid', paddingBottom: '1mm' }}
            >
              <span>صفحه سوم - بررسی TSR توسط مهندسی فرآيند</span>
            </div>
            <div className='conti'>
              <span className='conti_span'>نتيجه بررسی</span>
              <ReviewResult {...props} />
            </div>
            {/* {review_result === '0' && (
              )} */}
            <TextAreaWithRotate
              {...props}
              boxText={true}
              label='دلایل عدم تائید'
              value={review_result === '0' ? 'review_msg' : ''}
              text_rotate='این قسمت در صورت عدم تایيد تكميل گردد'
            />
            {/* {review_result === '1' && (
              )} */}
            <TextAreaWithRotate
              {...props}
              boxText={true}
              label='الزامات و ریسک ها'
              value={review_result === '1' ? 'review_msg' : ''}
              text_rotate='ین قسمت در صورت تایيد تكميل گردد '
              time={true}
              timeValue='suggest_time'
              laeblTime='زمان پیشنهادی جهت اجرا'
            />
            <Attachment
              {...props}
              foreign='foreign_attachment'
              internal='internal_attachment'
            />
            <Sign {...props} id={3} />
          </div>
        </div>
      </div>
    </page>
  )
}
export default TSR3
