import React from "react";
const ToogleBtn = props => {
    const { field, selected, handleManagment, publicDisabled } = props
    const check = selected[field.name]
    const checked = selected[`${field?.name}_show`]
    const disabled = check && !publicDisabled
    return (
        <div className='col-xl-3 col-lg-4 col-md-6 col-12 px-1'>
            <div
                className={`main-toggle ${check && disabled ? 'active' : 'disabled'}`}
            >
                <div className='p-0'>
                    <span>مدیریت</span>
                </div>
                <div
                    className={`toggle-button ${check || disabled ? 'active' : 'disabled'}`}
                >
                    <label className='switch'>
                        <input
                            type='checkbox'
                            name={`${field.name}_management`}
                            onChange={e => disabled && handleManagment(e, field)}
                            checked={!check || publicDisabled ? false : checked}
                        />
                        <span className={`slider ${check || disabled ? 'active' : 'disabled'}`}></span>
                    </label>
                </div>
                <div className='p-0'>
                    <span>مشاهده</span>
                </div>
            </div>
        </div>
    )
}
export default ToogleBtn