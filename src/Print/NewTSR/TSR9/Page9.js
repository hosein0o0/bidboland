import React from 'react'
// import handleString from '../../../handleString'
import Header from '../Header/Header'
import Implemented from './Implemented'
import TextAreaWithRotate from '../TextAreaWithRotate'
import Attachment from '../Attachment/Attachment'
import CheckBox from './CheckBox'
import Sign from '../Sign/Sign'
const Page9 = props => {
  const { value, numTab, data } = props
  let name_note = `${value}_note`
  const name_foreign = `${value}_foreign_attachment`
  const name_internal = `${value}_internal_attachment`
  // const mark_up_show = data[`${value}_marked_document`] === '1'
  // const test_result_show = data[`${value}_test_result`] === '1'
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right position-relative flex-custome'></div>
        <div className='holder_left'>
          <Header {...props} />
          <div className='___mainSign'>
            <p className='b f16 tealc'>
              صفحه نهم -اعلام پايان كار توسط مسئول اجرا
              {/* <span className='fss gray-color mr-2'>
                ({handleString(props.name)})
              </span> */}
            </p>
            <Implemented {...props} />
            <TextAreaWithRotate
              {...props}
              boxText={true}
              className='halk'
              label='ملاحظات'
              value={name_note}
            />
            {/* {mark_up_show && (
              )} */}
            <CheckBox
              {...props}
              label='مدارك MARK UP شده'
              name_value={`${value}_marked_document`}
            />
            {/* {test_result_show && (
              )} */}
            <CheckBox
              {...props}
              label='نتایج تست'
              name_value={`${value}_test_result`}
            />
            <Attachment
              {...props}
              foreign={name_foreign}
              internal={name_internal}
            />
            <Sign {...props} id={9} numTab={numTab} />
          </div>
        </div>
      </div>
    </page>
  )
}
export default Page9
