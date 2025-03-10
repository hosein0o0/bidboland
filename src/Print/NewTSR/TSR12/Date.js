import React from "react";
import handleString from "../../../handleString";
const Date = props => {
    const date = handleString(props.data[props.name_state])
    return (
        <div className='m-0'>
            <table>
                <tbody>
                    <tr className='hsss_'>
                        <td className='b text-center wlss no_BT'>
                            {props.label}
                        </td>
                        <td className="no_BT">
                            <p className='px-2'>
                                {date}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Date