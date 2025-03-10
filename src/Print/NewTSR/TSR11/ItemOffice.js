import React from "react";
import handleString from "../../../handleString";
const ItemOffice = props => {
    let { officeName, number } = props.data
    officeName = officeName || {}
    const { label } = officeName
    return (
        <tr className='hsss'>
            <td className='text-center'>
                {props._key + 1}
            </td>
            <td className='text-center'>
                {handleString(label)}
            </td>
            <td className='text-center'>
                {handleString(number)}
            </td>
        </tr>
    )
}
export default ItemOffice