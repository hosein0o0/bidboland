import React from 'react'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CancelIcon from '@material-ui/icons/Cancel'
import Loading from '../layout/loading'
import handleString from '../handleString'
const FirstReject = props => {
  const { status, disabled, loading } = props.state
  function handleClassName (data) {
    switch (data) {
      case 'جاری':
        return {
          class: 'running',
          icon: () => <PlayArrowRoundedIcon className='ml-1' />
        }
      case 'انجام شد':
        return {
          class: 'done',
          icon: () => <CheckCircleOutlineIcon className='ml-1' />
        }

      case 'رد شد':
        return {
          class: 'reject',
          icon: () => <CancelIcon className='ml-1' />
        }
      default:
        return null
    }
  }

  return (
    <div className='main-report-buttons row mx-0'>
      {status
        ? status.map((data, key) => (
            <div className='col-4 px-1' key={key}>
              <button
                className={`pointer ${
                  handleClassName(data) ? handleClassName(data).class : ''
                }`}
                onClick={() => props.handleData(data)}
                disabled={disabled}
              >
                {loading === data ? (
                  <Loading className='form-loader ml-1' />
                ) : handleClassName ? (
                  handleClassName(data).icon()
                ) : (
                  ''
                )}
                {handleString(data)}
              </button>
            </div>
          ))
        : ''}
    </div>
  )
}
export default FirstReject
