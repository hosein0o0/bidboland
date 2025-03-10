import React from 'react'
import handleCheckText from '../../handleCheckText'
// import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
const TextAreaWithRotate = props => {
  let text = handleString(props.data[props.value])
  let value = handleString(props.text_rotate)
  // let { suggest_time } = props.data
  let suggest_time = props.data[props.timeValue]
  function ClassName() {
    let classname = props.className || 'he35'
    return classname
  }
  // const show_text = handleCheckText(text)
  // const show_time = handleCheckText(suggest_time)
  const father_classname = `conti position-relative flex-custome flex-wrap justify-content-start mx-2 ${handleString(props.father_classname)}`
  return (
    <div className={father_classname.trim()}>
      <span className='conti_span'>{props.label}</span>
      <table>
        <tbody>
          {/* {show_text && (
              )} */}
          <tr className={ClassName()}>
            <td className='_base_line'>
              <p className='value'>{text}</p>
            </td>
          </tr>
          {handleCheckText(props.laeblTime) &&
            <tr>
              <td
                className='pt-1mm pb_1mm hsss b'
                style={{ paddingRight: '4mm' }}
              >
                {props.laeblTime}
                <span className='value mr-2'>{handleString(suggest_time)}</span>
              </td>
            </tr>
          }
        </tbody>
      </table>
      {handleCheckText(value) && (
        <div className='rotate_text_textarea white-space'>
          <span className='value'>({value})</span>
        </div>
      )}
    </div>
  )
}
export default TextAreaWithRotate
