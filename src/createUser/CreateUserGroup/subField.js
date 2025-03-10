import React from "react";
const subField = props => {
    const { indexParent , field, selected, handleCheckBox, handleClickSubField, publicDisabled } = props
    const { subfields, name } = field
    const show = selected[`${name}_show`] && !publicDisabled
    const _calss = name => {
        let state1 = selected[name] ? 'full' : 'empty'
        let state2 = publicDisabled ? 'disabled' : ''
        let result = `${state1} ${state2}`
        return result
    }
    const _checked = name => {
        let state1 = publicDisabled
        let state2 = selected[name] ? selected[name] : false
        let result = state1 ? false : state2
        return result
    }
    if (show) {
        return subfields?.map((sub, index) =>
            <div className='w-auto m-1' key={index}>
                <input
                    name={sub.name}
                    id={sub.name + indexParent}
                    type='checkbox'
                    onChange={!publicDisabled && handleClickSubField}
                    checked={_checked(sub.name)}
                />
                <label
                    className={_calss(sub.name).trim()}
                    htmlFor={sub.name + indexParent}
                >
                    {handleCheckBox(sub).icon}
                    {sub.label}
                </label>
            </div >
        )
    } else return ''
}
export default subField