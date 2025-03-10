import React from 'react'
import Header from '../Header/Header'
import HSE_HAZOOP from './HSE_HAZOOP'
import TextAreaWithRotate from '../TextAreaWithRotate'
import Attachment from '../Attachment/Attachment'
import Sign from '../Sign/Sign'
const TSR4 = props => {
  const { hse_review } = props.data
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
              <span>
                صفحه چهارم - بررسی TSR از دیدگاه ایمنی، سلامت و زیست محیطی (HSE)
              </span>
            </div>
            <HSE_HAZOOP {...props} />
            {/* {hse_review === '0' && (
              )} */}
            <TextAreaWithRotate
              {...props}
              boxText={true}
              label='دلایل عدم تائید'
              value={hse_review === '0' ? 'hse_review_msg' : ''}
              text_rotate='این قسمت در صورت عدم تایيد تكميل گردد'
            />
            {/* {hse_review === '1' && (
              )} */}
            <TextAreaWithRotate
              {...props}
              boxText={true}
              label='الزامات و ریسک ها'
              value={hse_review === '1' ? 'hse_review_msg' : ''}
              text_rotate='ین قسمت در صورت تایيد تكميل گردد '
              time={true}
              timeValue='suggested_execution_time'
              laeblTime='زمان پیشنهادی جهت اجرا'
            />
            <Attachment
              {...props}
              foreign='foreign_attachment'
              internal='internal_attachment'
              title='كليه تغييرات، استاندارد ها، مدارك و نتایج مربوط به HAZOP در این قسمت
              ضميمه گردد.'
            />
            <Sign {...props} id={4} />
          </div>
        </div>
      </div>
    </page>
  )
}
export default TSR4
