import React, { useRef, useEffect, useState } from "react";
import AccessLevel from './AccessLevel'
// import TabAccsess from "./tabAccsess";
import APIAccess from "./API/APIAccess";
import Tab from "./tab";
// import handleCheckText from "../../handleCheckText";
const SetAccessLevels = props => {
    // const { values, indexParent } = props
    const [activeTab, setActiveTab] = useState(0)
    const [ref, setRef] = useState({})
    const [right, setRight] = useState(0)
    const [width, setWidth] = useState(0)
    const [totalCounter, setTotalCounter] = useState(0)
    const [stateHook, setStateHook] = useState({})
    const propsState = { stateHook, setStateHook, activeTab, setActiveTab, totalCounter, setTotalCounter, right, setRight, width, setWidth, ref, setRef, ...props }
    const fns = new APIAccess(propsState)
    const { handleElms } = fns
    const tabElm = useRef()
    const myProps = { tabElm, ...propsState, ...fns }
    useEffect(() => handleElms('tab', tabElm), [tabElm])
    const { state } = props
    const { accessList } = state
    return (
        <div className='col-12'>
            <div className='access'>
                <div className='title-access'>
                    <h3 className='text-title'>
                        تعیین سطوح دسترسی
                    </h3>
                    <div className='line col pl-0'></div>
                </div>
                <div className='main-accsess'>
                    <Tab {...myProps} />
                    {accessList.map((data, key) =>
                        activeTab === key &&
                        <AccessLevel
                            {...myProps}
                            data={data}
                            key={key}
                            id={key}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
export default SetAccessLevels