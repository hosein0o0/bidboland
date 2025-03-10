import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
function PopUPText (props) {
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
        <div className='box-wellcome'>
          <div className='title-wellcome'>
            <span className='col p-0 text-right'>{props.title}</span>
            <CloseIcon onClick={() => props.handleState('_popUPText', false)} />
          </div>
          <div className='main-text'>
            <p className='text text-right'>{props.paragraph}</p>
          </div>
          {props.confirmationReject ? (
            <div className='buttons-wellcome'>
              <div className='col-6'>
                <button
                  className='reject w-100'
                  onClick={() => props.handleState('_popUPText', false)}
                >
                  رد
                </button>
              </div>
              <div className='col-6'>
                <button
                  className='confirmation w-100'
                  onClick={() => props.handleState('_popUPText', false)}
                >
                  تائید
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
export default PopUPText
