import React from "react";
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../../layout/loading'
const 
 Submit = props => {
    const { handleSubmit , state , handleDisabledSubmit } = props
    const { disabled, loading } = state
    const _disabled = handleDisabledSubmit() || disabled
    return (
        <div className='submit-form col-12'>
            <button
                onClick={handleSubmit}
                disabled={_disabled}
                className="edit"
            >
                {loading === 'submit' ? (
                    <Loading className='form-loader' />
                ) : (
                    <DoneIcon />
                )}
                ویرایش اطلاعات
            </button>
        </div>
    )
}
export default Submit