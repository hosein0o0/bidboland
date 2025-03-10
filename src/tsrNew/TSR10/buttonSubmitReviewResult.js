import React from 'react'
// import CancelButton from '../../layout/CancelButton'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../../layout/loading'
const ButtonSubmitReviewResult = props => {
  const { disabled, loading } = props.state
//   const Cancell = props.props.API.handleCancell
  function handleSubmit () {
    const { handleSubmitReviewAPI } = props.API
    handleSubmitReviewAPI()
  }
  return (
    <div className='submit-form col-12'>
      <button
        className='mt-3'
          onClick={handleSubmit}
        disabled={disabled}
      >
        {loading === 'submit' ? (
          <Loading className='form-loader' />
        ) : (
          <DoneIcon />
        )}
        ثبت اطلاعات
      </button>
      {/* <CancelButton fn={() => Cancell()} /> */}
    </div>
  )
}
export default ButtonSubmitReviewResult
