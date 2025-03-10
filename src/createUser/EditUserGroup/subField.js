import React from "react";
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const subField = props => {
    const { indexParent, field, selected, handleClickSubField, publicDisabled } = props
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
    const handleChange = (e) => {
        if (!publicDisabled) {
            handleClickSubField(e)
        }
    }
    const handleIcon = (sub) => {
        const check = _checked(sub.name)
        if (check) {
            return <CheckBoxRoundedIcon />
        } else {
            return <CheckBoxOutlineBlankRoundedIcon />
        }
    }
    if (show) {
        return subfields?.map((sub, index) =>
            <div className='w-auto m-1' key={index}>
                <input
                    name={sub.name}
                    id={sub.name + indexParent}
                    type='checkbox'
                    onChange={handleChange}
                    checked={_checked(sub.name)}
                />
                <label
                    className={_calss(sub.name).trim()}
                    htmlFor={sub.name + indexParent}
                >

                    {handleIcon(sub)}
                    {sub.label}
                </label>
            </div >
        )
    } else return ''
}
export default subField