import React from 'react'
import DoneIcon from '@material-ui/icons/Done'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Loading from '../layout/loading'
function Confirm (props) {
  // constructor(props) {
  //     super(props);
  //     state = {}
  // }
  // componentWillReceiveProps(nextProps) {
  //     if (nextProps !== props) {
  //         props = nextProps
  //     }
  // }
  // render() {
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
        <div className='box-wellcome'>
          <div className='title-wellcome'>
            <h3 className='col p-0 text-center'>
              <span>
                {props.label}
                <strong className='mr-1 ml-1'> {props.number} </strong>
              </span>
              حذف شود ؟
            </h3>
          </div>
          <div className='question-box row'>
            <div className='col-6'>
              <button
                className='cancel'
                onClick={() => props.close('')}
                disabled={props.loading === 'delete'}
              >
                <CloseRoundedIcon />
                رد
              </button>
            </div>
            <div className='col-6'>
              <button
                className='accept'
                onClick={() => props.handleSubmit()}
                disabled={props.loading === 'delete'}
              >
                {props.loading === 'delete' ? (
                  <Loading className='w-auto' />
                ) : (
                  <DoneIcon />
                )}
                قبول
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  // }
}
export default Confirm
