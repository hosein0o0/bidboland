import React from 'react'
import Loading from './loading'
// import StaticData from '../staticData'

function firstLoading (props) {
  function handleLogo () {
    if (props.BI) {
      return 'img/logo-loading-BI.svg'
    } else {
      return 'img/logo-loading.svg'
    }
  }
  const logoUrl = window.location.origin
  return (
    <div className='firstLoading'>
      <div className='col-xl-3 col-lg-4 col-10'>
        <div className='image-firstLoading mb-5'>
          <img src={`${logoUrl}/${handleLogo()}`} alt='' />
        </div>
        <Loading className='firstLoading-Rotation mr-auto m-auto mt-4' />
      </div>
    </div>
  )
}
export default firstLoading
