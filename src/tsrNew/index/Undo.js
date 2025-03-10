import React from 'react'
import DoneIcon from '@material-ui/icons/Done'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Loading from '../../layout/loading'
const Undo = props => {
  const { id_undo, loading } = props.state
  const handleUndoSub = () => {
    const { handleUndo } = props.FetchApi
    handleUndo(id_undo)
  }
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
        <div className='box-wellcome'>
          <div className='title-wellcome'>
            <h3 className='col p-0 text-center font-normal'>
              <span>
                آیا درخواست خدمات فنی به شماره
                <span className='IranSans_Bold_FA'> {id_undo} </span>
              </span>
              به حالت قبل بازگردد؟
            </h3>
          </div>
          <div className='question-box row'>
            <div className='col-6 px-1'>
              <button
                className='cancel'
                onClick={() =>
                  props.handleState({
                    id_undo: ''
                  })
                }
                disabled={loading === 'undo'}
              >
                <CloseRoundedIcon />
                خیر
              </button>
            </div>
            <div className='col-6 px-1'>
              <button
                className='accept'
                onClick={handleUndoSub}
                disabled={loading === 'undo'}
              >
                {loading === 'undo' ? (
                  <Loading className='w-auto' />
                ) : (
                  <DoneIcon />
                )}
                بله
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Undo
