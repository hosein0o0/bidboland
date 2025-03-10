import React from 'react'
import Header from '../Header/Header'
import InstructionNumber from './InstructionNumber'
import ReviewResult from './ReviewResult'
import Problems from './Problems'
import Sign from '../Sign/Sign'
const TSR10 = props => {
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right position-relative flex-custome'></div>
        <div className='holder_left'>
          <Header {...props} />
          <div className='___mainSign'>
            <p className='b f16 tealc pb_1mm'>
              صفحه دهم - بررسی پايان اجراي كار
            </p>
            <InstructionNumber {...props} />
            <ReviewResult {...props} />
            <Problems {...props} />
            <Sign {...props} id={10}/>
          </div>
        </div>
      </div>
    </page>
  )
}
export default TSR10
