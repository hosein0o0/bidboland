import React, { useRef, useEffect } from "react";
const TabAccsess = props => {
    const { handleElms, tab, index, handleActive, activeTab } = props
    const elm = useRef()
    const name = `label_${index}`
    useEffect(()=>handleElms(name , elm) , [elm])
    return (
        <span
            ref={elm}
            key={index}
            className={`col-3 px-0 label fix_width ${activeTab === index ? 'active IranSans_Bold' : ''}`}
            onClick={() => handleActive(index)}
        >
            {tab.label}
        </span>
    )
}
export default TabAccsess