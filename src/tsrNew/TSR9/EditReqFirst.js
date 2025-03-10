import React from 'react'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../../layout/loading'
const EditReqFirst = props => {
  const handleEdit = () => {
    const { EditReqGroup } = props.API
    EditReqGroup()
  }
  const { loading, disabled } = props.state
  return (
    <div className='submit-form col-12'>
      <button className='mt-3 edit' onClick={handleEdit} disabled={disabled}>
        {loading === 'edit-form' ? (
          <Loading className='form-loader' />
        ) : (
          <DoneIcon />
        )}
        درخواست ویرایش گروه‌ها
      </button>
    </div>
  )
}
export default EditReqFirst
