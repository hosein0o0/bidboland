import React from 'react'
import Header from '../Header/Header'
import ReviewResult from './ReviewResult'
import TextAreaWithRotateMulti from './TextAreaWithRotateMulti'
import MultiAttachment from './MultiAttachment'
import Sign from '../Sign/Sign'
const TSR6 = props => {
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right position-relative flex-custome'></div>
        <div className='holder_left'>
          <Header {...props} />
          <div className='___mainSign'>
            <p className='b f16 tealc'>صفحه ششم - كميته TSR</p>
            <ReviewResult {...props} />
            <TextAreaWithRotateMulti
              {...props}
              boxText={true}
              label='دلایل عدم تائید'
              text_rotate='این قسمت در صورت عدم تایيد تكميل گردد'
              time={false}
              status='reject'
              value='reject_text'
              className='he35'
            />
            <TextAreaWithRotateMulti
              {...props}
              boxText={true}
              label='الزامات و ملاحظات'
              text_rotate='این قسمت در صورت تایيد تكميل گردد'
              time={true}
              status='accept'
              value='review_text'
              timeValue='tech_execution_time'
              className='he35'
              laeblTime = 'زمان تائید شده جهت اجرا'
            />
            <MultiAttachment {...props} />
            <Sign {...props} id={6} />
          </div>
        </div>
      </div>
    </page>
  )
}
export default TSR6
