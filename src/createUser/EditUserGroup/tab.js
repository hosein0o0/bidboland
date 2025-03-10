import React from "react";
import TabAccsess from './tabAccsess'
const Tab = props => {
    const { tabElm, state, right, width } = props
    const { accessList } = state
    return (
        <div className='tab overflow-hidden'
            ref={tabElm}
        >
            {accessList?.map((tab, key) => <TabAccsess key={key} index={key} tab={tab} {...props} />)}
            <span
                className='line-active _hidden'
                style={{
                    right: `${right}px`,
                    width: `${width}px`
                }}
            ></span>
        </div>
    )
}
export default Tab