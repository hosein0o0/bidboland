import React from 'react'
import CancelButton from '../../layout/CancelButton'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../../layout/loading'
const ButtonEdit = props => {
  const { disabled, loading } = props.state
  const disabledButton = props.handleDisabled() || disabled
  function handleEdit() {
    const { handleUrlEditAPI } = props.API
    handleUrlEditAPI()
  }
  const CancelSubmit = () => {
    const { handleCancell, CloseComment, GetStatus } = props.props.API
    const myStatus = GetStatus()
    if (myStatus === 'comment') CloseComment()
    else handleCancell()
  }
  // const Cancell = props.props.API.handleCancell
  return (
    <div className='submit-form col-12'>
      <button
        className='mt-3 edit'
        onClick={handleEdit}
        disabled={disabledButton}
      >
        {loading === 'submit' ? (
          <Loading className='form-loader' />
        ) : (
          <DoneIcon />
        )}
        ویرایش اطلاعات
      </button>
      <CancelButton fn={CancelSubmit} />
    </div>
  )
}
export default ButtonEdit
