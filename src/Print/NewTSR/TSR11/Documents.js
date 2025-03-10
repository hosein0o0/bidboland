import React from "react";
import ItemDoc from "./ItemDoc";
const Documents = props => {
    const list = props.data[props.name_state] || []
    const { handleFilter11 } = props.API
    const filter = handleFilter11(list)
    // const check_show = filter.length > 0
    // if (check_show) {
        return (
            <div className='conti'>
                <span className="conti_span mt-1">
                    {props.label}
                </span>
                <table className="ltr">
                    <tbody>
                        <tr className='hss'>
                            <th style={{ width: '7mm' }}>
                                No
                            </th>
                            <th
                            // style={{ width: '36mm' }}
                            >
                                Document Number
                            </th>
                            <th
                            // style={{ width: '50mm' }}
                            >
                                Document Title
                            </th>
                            <th style={{ width: '15mm' }}>
                                Rev
                            </th>
                        </tr>
                        {filter.map((data, key) =>
                            <ItemDoc
                                {...props}
                                key={key}
                                _key={key}
                                data={data}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        )
    // } else return ''
}
export default Documents