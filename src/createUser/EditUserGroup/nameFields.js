import React from "react";
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import handleString from "../../handleString";
const NameFields = props => {
    const { indexParent, field, handleClick, selected, publicDisabled } = props
    const checked = selected[field.name] ? true : false
    const _class_ = `${checked ? 'full' : 'empty'} ${publicDisabled ? 'disabled' : ''}`
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
                checked={checked}
            />
            <label
                className={_class_.trim()}
                htmlFor={field.name + indexParent}
            >
                {checked ? <CheckBoxRoundedIcon /> : <CheckBoxOutlineBlankRoundedIcon />}
                {handleString(field.label)}
            </label>
        </div>
    )
}
export default NameFields