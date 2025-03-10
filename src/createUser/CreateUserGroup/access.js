import React, { useState } from "react";
import PartArea from './partArea'
import APIAccessLevel from "./API/APIAccessLevel";
import ADD from "./add";
import Delete from "./delete";
import SetAccessLevels from "./SetAccessLevels";
import Submit from './Submit'
const Access = props => {
    const [values, setValues] = useState([])
    const [counter, setCounter] = useState(1)
    const [listSelected, setListSelected] = useState([])
    const propsState = { ...props, values, setValues, counter, setCounter, listSelected, setListSelected }
    const fns = new APIAccessLevel(propsState)
    const myProps = { ...propsState, ...fns }
    const { state } = myProps
    const { category_list } = state
    const list = category_list || []
    const checkAdd = list.length > 0 && counter < list.length
    return (
        <div className="w-100">
            {list.map((cat, index) =>
                index < counter &&
                <div className="w-100" key={index}>
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