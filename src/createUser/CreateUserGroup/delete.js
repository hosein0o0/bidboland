import React from "react";
import DeleteIcon from '@material-ui/icons/Delete'
const Delete = props => {
    const { handleDelete, index, counter } = props
    return (
        <div className="col-12">
            {counter > 1 &&

                <div
                    className='delete-item'
                >
                    <button onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                        حذف
                    </button>
                </div>
            }
        </div>
    )
}
export default Delete