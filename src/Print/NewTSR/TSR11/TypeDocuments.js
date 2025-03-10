import React from "react";
import handleString from "../../../handleString";
const TypeDocuments = props => {
    const { document_type } = props.data
    return (
        <div className='m-0'>
            <table>
                <tbody>
                    <tr className='hsss_'>
                        <td className='b text-center wlss no_BT'>
                            نوع اسناد:
                        </td>
                        <td className="no_BT">
                            <p className='px-2'>
                                {handleString(document_type)}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default TypeDocuments