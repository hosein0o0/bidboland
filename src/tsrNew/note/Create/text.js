import React from 'react'
import CheckPersianText from '../../../CheckPersianText'
import handleString from '../../../handleString'
const TextNote = props => {
  // const { value, setValue } = props
  const { handleState, state } = props
  const { text } = state
  const value = handleString(text)
  return (
    <div className='text-note'>
      <textarea
        className={`w-100 textara-note 
                ${CheckPersianText(value) ? 'rtl text-right' : 'ltr text-left'}
                `}
        onChange={e => handleState({ text: handleString(e.target.value) })}
      >
        {value}
      </textarea>
    </div>
  )
}
export default TextNote
