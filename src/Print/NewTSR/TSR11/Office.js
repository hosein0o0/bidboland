import React from "react";
import ItemOffice from "./ItemOffice";
const Office = props => {
    const list = props.data[props.name_state] || []
    const { FilterOffice11 } = props.API
    const filter = FilterOffice11(list)
    // const check_show = filter.length > 0
    // if (check_show) {
        return (
            <div className='conti'>
                <span className="conti_span mt-1">
                    {props.label}
                </span>
                <table>
                    <tbody>
                        <tr className='hss'>
                            <th style={{ width: '7mm' }}>
                                ردیف
                            </th>
                            <th>
                                نام اداره
                            </th>
                            <th>
                                تعداد نسخه
                            </th>
                        </tr>
                        {filter.map((data, key) =>
                            <ItemOffice
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
export default Office