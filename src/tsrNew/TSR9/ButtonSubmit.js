import React from 'react'
import CancelButton from '../../layout/CancelButton'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../../layout/loading'
const ButtonSubmit = props => {
  const { disabled, loading } = props.state
  const disabledButton = props.handleDisabled() || disabled
  // const Cancell = props.props.API.handleCancell
  function handleSubmit(){
    const {handleSubmitAPI} = props.API
    handleSubmitAPI()
  }
  const CancelSubmit = () => {
    const { handleCancell, CloseComment, GetStatus } = props.props.API
    const myStatus = GetStatus()
    if (myStatus === 'comment') CloseComment()
    else handleCancell()
  }
  return (
    <div className='submit-form col-12'>
      <button
        className='mt-3'
          onClick={handleSubmit}
        disabled={disabledButton}
      >
        {loading === 'submit' ? (
          <Loading className='form-loader' />
        ) : (
          <DoneIcon />
        )}
        ثبت اطلاعات
      </button>
      <CancelButton fn={CancelSubmit} />
    </div>
  )
}
export default ButtonSubmit
