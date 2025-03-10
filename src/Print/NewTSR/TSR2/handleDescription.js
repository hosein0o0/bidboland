import React from 'react'
import handleCheckText from '../../../handleCheckText'
import handleString from '../../../handleString'
const handleDescription = props => {
  let {
    general_boss_description,
    process_boss_description,
    inspection_boss_description
  } = props.data
  function handleParagraph(label, text) {
    const check = handleCheckText(text)
    if (check) {
      return (
        <p className='little-font mx-1'>
          <span className='b'>{handleString(label)} :</span>
          {` ${handleString(text)} `}
        </p>
      )
    }
    return ''
  }
  // const totalCheck =
  //   handleCheckText(general_boss_description) ||
  //   handleCheckText(process_boss_description) ||
  //   handleCheckText(inspection_boss_description)
  // if (totalCheck) {
  // }
  return (
    <div className='border p1 desc bt-none'>
      <span className='f12 b'>توضيحات</span>
      <br />
      {handleParagraph('مهندسی عمومی', general_boss_description)}
      {handleParagraph('مهندسی فرآیند', process_boss_description)}
      {handleParagraph('بازرسی فنی', inspection_boss_description)}
    </div>
  )
  // return ''
}
export default handleDescription
