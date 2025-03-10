import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const ReviewResult = props => {
  const { review_result } = props.data
  return (
    <table>
      <tbody>
        <tr className='review_result'>
          <td>
            <span className='_tikbox'>
              {review_result === '1' ? (
                <CheckBoxRoundedIcon />
              ) : (
                <CheckBoxOutlineBlankRoundedIcon />
              )}
            </span>
            مورد تایيد است
          </td>
          <td>
            <span className='_tikbox'>
              {review_result === '2' ? (
                <CheckBoxRoundedIcon />
              ) : (
                <CheckBoxOutlineBlankRoundedIcon />
              )}
            </span>
            نياز به بررسی فرآیندي ندارد
          </td>
          <td>
            <span className='_tikbox'>
              {review_result === '0' ? (
                <CheckBoxRoundedIcon />
              ) : (
                <CheckBoxOutlineBlankRoundedIcon />
              )}
            </span>
            مورد تایيد نيست.
          </td>
        </tr>
      </tbody>
    </table>
  )
}
export default ReviewResult
