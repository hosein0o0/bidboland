import React from "react";
const BtnNote = props => {
    const { setOpen, disabled, count } = props
    return (
        <div className='EditBack mr-2'>
            <button
                className='pointer'
                onClick={() => setOpen(true)}
                disabled={disabled}
            >
                یادداشت‌ها
                {count > 0 &&
                    <span className="count">{count}</span>
                }
            </button>
        </div>
    )
}
export default BtnNote