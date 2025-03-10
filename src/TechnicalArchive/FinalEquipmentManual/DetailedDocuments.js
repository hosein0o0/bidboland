import React from 'react'
import Form from '../../Form/Form'
import Loading from '../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import CancelButton from '../../layout/CancelButton'
function DetailedDocuments (props) {
  return (
    <div className='form row rtl'>
      <Form {...props} />
      <div className='submit-form rtl col-12 mt-5'>
        <button onClick={props.handleSubmit} disabled={props.state.disabled}>
          {props.state.loading === 'submit' ? (
            <Loading className='form-loader' />
          ) : (
            <DoneIcon />
          )}
          ثبت اطلاعات
        </button>
        <CancelButton redirect='final-data-book' status={2} />
      </div>
    </div>
  )
}
export default DetailedDocuments
