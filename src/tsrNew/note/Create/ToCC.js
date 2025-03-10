import React from "react";
import Select from 'react-select'
const ToCC = props => {
    const parentProps = props.props
    const parentState = parentProps.state
    const { user_list } = parentState
    const { handleState } = props
    const { state } = props
    const { receive_to, cc } = state
    return (
        <div className="w-100">
            <div className="item-select d-flex align-items-center">
                <label className="pl-2 mb-0 label">To:</label>
                <div className="col p-0">
                    <Select
                        onChange={newValue => handleState({ receive_to: newValue })}
                        isMulti={false}
                        options={user_list}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={receive_to}
                        placeholder='TO'
                    />
                </div>
            </div>
            <div className="item-select d-flex align-items-center">
                <label className="pl-2 mb-0 label">CC:</label>
                <div className="col p-0">
                    <Select
                        onChange={newValue => handleState({ cc: newValue })}
                        isMulti={true}
                        options={user_list}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={cc}
                        placeholder='CC'
                    />
                </div>
            </div>
        </div>
    )
}
export default ToCC