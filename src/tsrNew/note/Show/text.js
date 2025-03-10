import React from 'react'
import CheckPersianText from '../../../CheckPersianText'
import handleString from '../../../handleString'
const TextNote = data => {
  const value = handleString(data.text)
  return (
    <div className='text-note'>
      <textarea
        className={`w-100 textara-note ${CheckPersianText(value) ? 'rtl text-right' : 'ltr text-left'}`}
      >
        {value}
      </textarea>
    </div>
  )
}
export default TextNote
