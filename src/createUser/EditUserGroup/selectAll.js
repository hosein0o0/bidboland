import React from "react";
const SelectAllHook = props => {
    const { API, id, totalCounter, SelectAll, data } = props
    const { handleCheckBox , handleArray } = API
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