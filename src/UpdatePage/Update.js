import React, { useEffect, useState } from 'react'
import './update.css'
const Update = props => {
  const [time, setTime] = useState('')
  useEffect(() => {
    let countDownDate = new Date('May 8 2022 18:59:59').getTime()
    let x = setInterval(function () {
      let now = new Date().getTime()
      let distance = countDownDate - now

      //   let days = Math.floor(distance / (1000 * 60 * 60 * 24))
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTime(hours + ' : ' + minutes + ' : ' + seconds)

      if (distance < 0) {
        clearInterval(x)
        setTime('EXPIRED')
      }
    }, 1000)
  }, [])
  return (
    <div className='backgroundPopUp'>
      <div className='imageBack'>
        <img src='./img/login-bg.jpg' alt='سامانه در حال بروز رسانی میباشد' />
      </div>
      <div className='w-100 text-center'>
        <div className='title'>
          <h3>سامانه در حال بروز رسانی میباشد</h3>
        </div>
        <div className='timer ltr'>
          <span className='IranSans_Bold_FA'>{time}</span>
        </div>
      </div>
    </div>
  )
}
export default Update
