import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const ReviewResult = props => {
  const { review_result_verify } = props.data
  return (
    <div className='conti'>
      <span className='conti_span'>نتيجه بررسی</span>
      <table>
        <tbody>
          <tr className='review_result'>
            <td className='no_BB px-2'>
              <span className='_tikbox'>
                {review_result_verify === '1' ? (
                  <CheckBoxRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon />
                )}
              </span>
              مورد تایيد است
            </td>
          </tr>
          <tr className='review_result end'>
            <td className='bt-none px-2'>
              <span className='_tikbox'>
                {review_result_verify === '0' ? (
                  <CheckBoxRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon />
                )}
              </span>
              مورد تایيد نیست
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default ReviewResult
