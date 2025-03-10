import React from "react";
import AddIcon from '@material-ui/icons/Add'
const ADD = props => {
    const { counter, setCounter } = props
    return (
        <div className='button-add col-12'>
            <button onClick={() => setCounter(counter + 1)}>
                <AddIcon />
                افزودن مورد جدید
            </button>
        </div>
    )
}
export default ADD