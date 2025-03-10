import React from 'react'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../../layout/loading'
import CancelButton from '../../layout/CancelButton'
const ButtonSubmitFirst = props => {
  const Cancell = props.props.API.handleCancell
  const { loading, disabled, update_allow } = props.state
  function handleSubmit () {
    const { handleSubmit1 } = props.API
    handleSubmit1(update_allow ? true : false)
  }
  let class_name = `mt-3 ${update_allow ? 'edit' : ''}`
  return (
    <div className='submit-form col-12'>
      <button
        className={class_name.trim()}
        onClick={handleSubmit}
        disabled={disabled}
      >
        {loading === 'submit' ? (
          <Loading className='form-loader' />
        ) : (
          <DoneIcon />
        )}
        {update_allow ? 'ویرایش اطلاعات' : 'ثبت اطلاعات'}
      </button>
      <CancelButton fn={() => Cancell()} />
    </div>
  )
}
export default ButtonSubmitFirst
