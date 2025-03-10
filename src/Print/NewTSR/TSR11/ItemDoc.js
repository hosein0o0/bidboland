import React from "react";
import handleString from "../../../handleString";
const ItemDoc = props => {
    const { DocumnentShow11 } = props.API
    const { title, editNumber } = props.data
    return (
        <tr className='hsss'>
            <td className='text-center' style={{ width: '7mm' }}>
                {props._key + 1}
            </td>
            <td className="text-center">{DocumnentShow11(props.data)}</td>
            <td className="text-center">{handleString(title)}</td>
            <td className="text-center">{handleString(editNumber)}</td>
        </tr>
    )
}
export default ItemDoc