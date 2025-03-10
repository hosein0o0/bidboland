import React from 'react'
import Header from '../Header/Header'
// import ListRejectReasons from '../../../tsrNew/tsr2/ListRejectReasons'
import RejectReasons from './RejectReasons'
import HandleDescription from './handleDescription'
import Responsible from './Responsible'
import Sign from '../Sign/Sign'
const TSR2 = props => {
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right position-relative flex-custome'>
          <div className='rotate flex-custome'>
            <span className='rotate-180'>
              در صورت تطابق درخواست با شرایط صدور TSR ، مسئول آن و گروه
              كارشناسی انتخاب گردد.
            </span>
          </div>
        </div>
        <div className='holder_left'>
          <Header {...props} />
          <div className='___mainSign'>
            <div
              className='b f16 tealc'
              style={{ borderBottom: '3px solid', paddingBottom: '1mm' }}
            >
              <span>
                صفحه دوم - بررسی اوليه و انتخاب مسئول TSR و گروه كارشناسی
              </span>
            </div>
            <div className='conti'>
              <span className='conti_span'>بررسی شرايط صدور TSR</span>
              <RejectReasons {...props} />
            </div>
            <HandleDescription {...props} />
            <Responsible
              {...props}
              label='مسئول TSR'
              value={'responsible'}
            />
            <Responsible
              {...props}
              label='گروه كارشناسی'
              value={'experts'}
            />
            <Sign {...props} id={2} />
          </div>
        </div>
      </div>
    </page>
  )
}
export default TSR2
