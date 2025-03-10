import React from "react";
const NameFields = props => {
    const { indexParent, field, handleClick, handleCheckBox, selected, publicDisabled } = props
    const { icon, _class } = handleCheckBox(field)
    const _class_ = `${_class} ${publicDisabled ? 'disabled' : ''}`
    const handleChange = (e) => {
        if (!publicDisabled) handleClick(e, indexParent, field)
    }
    return (
        <div className='col-xl-3 col-lg-4 col-md-6 col-12 px-1'>
            <input
                name={field.name}
                id={field.name + indexParent}
                type='checkbox'
                onChange={e => handleChange(e, indexParent)}
                checked={selected[field.name] ? true : false}
            />
            <label
                className={_class_.trim()}
                htmlFor={field.name + indexParent}
            >
                {icon}
                {field.label}
            </label>
        </div>
    )
}
export default NameFields