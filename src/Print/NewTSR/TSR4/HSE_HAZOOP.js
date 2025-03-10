import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const HSE_HAZOOP = props => {
  const { hse_review , hazop_review} = props.data
  return (
    <div className='flex-custome justify-content-start'>
      <div className='conti w-50'>
        <span className='conti_span'>نتیجه بررسی امور HSE</span>
        <table>
          <tbody>
            <tr className='review_result'>
              <td
              className='wlss padRk'
              >
                <span className='_tikbox'>
                  {hse_review === '1' ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                </span>
                مورد تایيد است
              </td>
            </tr>
            <tr className='review_result'>
              <td
              className='wlss padRk no_BT'
              >
                <span className='_tikbox'>
                  {hse_review === '0' ? (
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
      </div>
      <div className='conti w-50'>
        <span className='conti_span'>نتيجه مطالعات HAZOP</span>
        <table>
          <tbody>
            <tr className='review_result'>
              <td
              className='wlss padRk'
              >
                <span className='_tikbox'>
                  {hazop_review === '1' ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                </span>
                ضميمه است.
              </td>
            </tr>
            <tr className='review_result'>
              <td
              className='wlss padRk no_BT'
              >
                <span className='_tikbox'>
                  {hazop_review === '0' ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                </span>
                نیازی ندارد.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default HSE_HAZOOP
