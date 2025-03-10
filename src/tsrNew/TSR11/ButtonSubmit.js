import React from "react";
import CancelButton from '../../layout/CancelButton'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../../layout/loading'
const ButtonSubmit = props => {
    function handleSubmit() {
        const { handleSubmitAPI } = props.API
        handleSubmitAPI(props.update ? '' : 'create')
    }
    const { disabled, loading } = props.state
    const disabledButton = props.handleDisabled() || disabled
    const CancelSubmit = () => {
        const { handleCancell, CloseComment, GetStatus } = props.props.API
        const myStatus = GetStatus()
        if (myStatus === 'comment') CloseComment()
        else handleCancell()
    }
    return (
        <div className='submit-form col-12'>
            <button className={`mt-3 ${props.update ? 'edit' : ''}`} onClick={handleSubmit} disabled={disabledButton}>
                {loading === 'submit' ? (
                    <Loading className='form-loader' />
                ) : (
                    <DoneIcon />
                )}
                {props.update ? 'ویرایش اطلاعات' : 'ثبت اطلاعات'}
            </button>
            <CancelButton fn={CancelSubmit} />
        </div>
    )
}
export default ButtonSubmit