import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
function PopUpTable (props) {
  function handleShwo () {
    if (props.state.dataPopUp) {
      let li = Object.keys(props.state.dataPopUp).map(value => {
        return (
          <tr>
            <td>{value}</td>
            <td>{props.state.dataPopUp[value]}</td>
          </tr>
        )
      })
      return li
    }
  }
  function Close () {
    props.handleState('dataPopUp', null)
    props.handleState('popup', false)
  }
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-5 col-lg-6 col-md-8 col-12'>
        <div className='box-wellcome _table ltr'>
          <div className='close'>
            <CloseIcon onClick={Close} />
          </div>
          <div className='table-popup'>
            <table className='w-100'>
              <thead className='w-100'>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody className='w-100'>{handleShwo()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PopUpTable
