import React from 'react'
import handleCheckText from '../../../handleCheckText'
import handleString from '../../../handleString'
const TextAreaWithRotateMulti = props => {
  const {
    data,
    text_rotate,
    timeValue,
    className,
    // boxText,
    label,
    // time,
    value,
    status
  } = props
  // let text = handleString(data[value])
  let _value = handleString(text_rotate)
  // let { suggest_time } = data
  let suggest_time = data[timeValue]
  function ClassName() {
    let classname = className || 'he35'
    return classname
  }
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
  let { tech_result } = data
  let result = status === 'accept' ? tech_result === '1' : tech_result === '0'
  const list_check_result = [
    { name: 'مهندسی فرآیند', value: `process_${value}` },
    { name: 'مهندسی عمومی', value: `general_${value}` },
    { name: 'بازرسی فنی', value: `inspection_${value}` },
    { name: 'خدمات فنی', value: `tech_text` }
  ]
  const list_check_not_result = [
    { name: 'مهندسی فرآیند', value: `process_${value}` },
    { name: 'مهندسی عمومی', value: `general_${value}` },
    { name: 'بازرسی فنی', value: `inspection_${value}` }
  ]
  const list_check = result ? list_check_result : list_check_not_result
  const checkShow = () => {
    let _result = false
    let i = 0
    while (i < list_check.length) {
      const obj_check = list_check[i] || {}
      let value_name = obj_check.value
      const value = handleString(data[value_name])
      _result = handleCheckText(value)
      if (_result) {
        break
      }
      i++
    }
    return _result
  }
  // const check_show = checkShow() && boxText
  // const check_time = handleCheckText(suggest_time) && time
  return (
    <div className='conti position-relative flex-custome flex-wrap justify-content-start mx-2'>
      <span className='conti_span'>{label}</span>
      <table>
        <tbody>
          {/* {check_show && (
                )} */}
          <tr className={ClassName()}>
            <td className='_base_line'>
              {list_check.map(item_check =>
                handleParagraph(item_check.name, data[item_check.value])
              )}
            </td>
          </tr>
          {/* {check_time && (
              )} */}
          {handleCheckText(props.laeblTime) &&
            <tr>
              <td
                className='pt-1mm pb_1mm hsss b'
                style={{ paddingRight: '4mm' }}
              >
                {props.laeblTime}:
                <span className='value mr-2'>{suggest_time}</span>
              </td>
            </tr>
          }
        </tbody>
      </table>
      {/* {check_show && (
          )} */}
      <div className='justify-content-end rotate_text_textarea white-space'>
        <span className='value'>({_value})</span>
      </div>
    </div>
  )
}
export default TextAreaWithRotateMulti
