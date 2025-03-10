import React, { useState, useEffect } from "react";
import APIAccessLevel from "./API/APIAccessLevel";
import PartArea from './partArea'
import SetAccessLevels from "./SetAccessLevels";
import ADD from "./add";
import Delete from "./delete";
import Submit from './Submit'
const Access = props => {
    const [values, setValues] = useState([])
    const [counter, setCounter] = useState(1)
    const [listSelected, setListSelected] = useState([])
    const propsState = { ...props, values, setValues, counter, setCounter, listSelected, setListSelected }
    const fns = new APIAccessLevel(propsState)
    const { ValuesCategory } = fns
    const myProps = { ...propsState, ...fns }
    const { state } = myProps
    const { category_list, permission } = state
    const list = category_list || []
    const checkAdd = list.length > 0 && counter < list.length
    useEffect(ValuesCategory, [permission?.length])
    return (
        <div className="w-100">
            {list.map((cat, index) =>
                index < counter &&
                <div className="w-100" key={cat.value}>
                    <PartArea
                        cat={cat}
                        index={index}
                        {...myProps}
                        value={values[index]}
                    />
                    <SetAccessLevels {...myProps} indexParent={index} />
                    <Delete {...myProps} index={index} />
                </div>
            )}
            {checkAdd && < ADD {...myProps} />}
            <Submit {...myProps} />
        </div>
    )

}
export default Access