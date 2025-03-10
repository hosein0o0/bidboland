import React from 'react'
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded'
import Loading from '../../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
const Footer = props => {
  const { APINote, state } = props
  const { handleUploadFile, handleSubmit } = APINote
  const parentProps = props.props || {}
  const parentState = parentProps.state || {}
  const { id } = parentState
  const { loading, disabled } = state
  return (
    <div className='w-100 footer ltr d-flex align-items-center'>
      <button
        className='submit-btn pointer d-flex align-items-center'
        onClick={handleSubmit}
        disabled={disabled}
      >
        {loading === 'submit' ? (
          <Loading className='form-loader mr-1' />
        ) : (
          <DoneIcon className='mr-1' />
        )}
        send
      </button>
      <div className='col d-flex align-items-center justify-content-end p-0'>
        {!disabled && (
          <input
            className='d-none'
            type='file'
            id={`upload-none-${id}`}
            onChange={e => handleUploadFile(e)}
            multiple={true}
          />
        )}
        <label className='mb-0 pointer' htmlFor={`upload-none-${id}`}>
          {loading === 'upload' ? (
            <Loading className='form-loader table' />
          ) : (
            <AttachFileRoundedIcon />
          )}
        </label>
      </div>
    </div>
  )
}
export default Footer
