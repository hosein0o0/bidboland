import React from 'react'
import Loading from '../../layout/loading'
import EditIcon from '@material-ui/icons/Edit'
// import StaticData from '../../staticData'
const EditBeforeRequest = props => {
  let state = props.state || {}
  const { loading, disabled } = state
  function handleEdit () {
    const { handleOpenEdit } = props.API
    handleOpenEdit()
  }
  return (
    <div className='EditBack'>
      <button
        className='pointer'
        onClick={() => handleEdit()}
        disabled={disabled}
      >
        {loading === 'edit-form' ? (
          <Loading className='form-loader' />
        ) : (
          <EditIcon className='ml-1' />
        )}
        ویرایش فرم
      </button>
    </div>
  )
}
export default EditBeforeRequest
