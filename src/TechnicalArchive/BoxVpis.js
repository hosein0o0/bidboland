import React from 'react'
import handleString from '../handleString'
// import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded'
// import SecondBoxData from '../Customization/SecondBoxData'
import Loading from '../layout/loading'
const BoxVpis = props => {
  let {
    loading,
    firstData,
    owner_document_noSelected
    // secondSelectNumber
  } = props.state
  let list = firstData || []
  function handleShow () {
    const checkLenght = list.length > 0
    return (
      <React.Fragment>
        <div className='title w-100 pl-1'>
          <h4
            className={`w-100 ${
              checkLenght ? '' : 'd-flex justify-content-end'
            }`}
          >
            {checkLenght
              ? `${handleString(owner_document_noSelected)} داکیومنت `
              : 'اطلاعات ثبت نشده است'}
          </h4>
        </div>
        {checkLenght && (
          <div className='main-item'>
            {list.map((data, index) => (
              <div key={index} className={`item`}>
                {/* <ChevronLeftRoundedIcon /> */}
                <span>Rev : {handleString(data.rev)}</span>
              </div>
            ))}
          </div>
        )}
      </React.Fragment>
    )
  }
  return (
    <div className={`box-more ${props.handlePositionBox(props._key)}`}>
      {loading === 'more' ? (
        <Loading className='table row m-0 justify-content-center' />
      ) : (
        handleShow()
      )}
    </div>
  )
}
export default BoxVpis
