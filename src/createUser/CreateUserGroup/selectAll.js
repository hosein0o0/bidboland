import React from "react";
const SelectAllHook = props => {
    const { handleCheckBox, id, totalCounter, handleArray, SelectAll, data } = props
    const { className, icon } = handleCheckBox()
    const { array } = handleArray(data) || {}
    return (
        <div className='select-all'>
            <div className='col d-flex'>
                <input
                    id={`all_${id}`}
                    type='checkbox'
                    onChange={SelectAll}
                    checked={totalCounter === array?.length}
                />
                <label
                    className={className}
                    htmlFor={`all_${id}`}
                >
                    {icon}
                    انتخاب همه
                </label>
            </div>
        </div>
    )
}
export default SelectAllHook