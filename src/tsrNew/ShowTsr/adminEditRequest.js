import React from "react";
import Loading from '../../layout/loading'
import EditIcon from '@material-ui/icons/Edit'
const AdminEditRequest = props => {
    const { loading , disabled} = props.state
    const { handleOpenEditAdmin } = props.API
    return (
        <div className='EditBack mr-2'>
            <button className='pointer' disabled={disabled} onClick={handleOpenEditAdmin}>
                {loading === 'edit-form-admin' ? (
                    <Loading className='form-loader' />
                ) : (
                    <EditIcon className='ml-1' />
                )}
                ویرایش فرم توسط راهبر
            </button>
        </div>
    )
}
export default AdminEditRequest