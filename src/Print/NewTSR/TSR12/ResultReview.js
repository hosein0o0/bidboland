import React from "react";
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const ResultReview = props => {
    const { effective } = props.data
    return (
        <div className='conti'>
            <span className='conti_span'>نتيجه بررسی</span>
            <table>
                <tbody>
                    <tr className='review_result'>
                        <td className="conti">
                            <span className="conti_span">آيا TSR اثر بخش بوده است؟</span>
                        </td>
                        <td className='px-2 w-10mm end'>
                            <span className='_tikbox'>
                                {effective === '1' || effective === null ? (
                                    <CheckBoxRoundedIcon />
                                ) : (
                                    <CheckBoxOutlineBlankRoundedIcon />
                                )}
                            </span>
                            بلی
                        </td>
                        <td className='bt-none px-2 w-10mm bt'>
                            <span className='_tikbox'>
                                {effective === '0' ? (
                                    <CheckBoxRoundedIcon />
                                ) : (
                                    <CheckBoxOutlineBlankRoundedIcon />
                                )}
                            </span>
                            خیر
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
export default ResultReview