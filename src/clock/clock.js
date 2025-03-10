import React, { useState, useEffect } from 'react'
import TimeKeeper from 'react-timekeeper'
// import { ConvertNumber } from '../ConvertNumber'
import ConvertNumber from '../ConvertNumber'
import handleString from '../handleString'
function Clock (props) {
  const [time, setTime] = useState('12:00')
  const [showTime, setShowTime] = useState(false)
  useEffect(() => {
    if (props.getFocus) {
      props.getFocus(OpenClose)
      setTime(props.value ? ConvertNumber(props.value) : '12:00')
    }
  }, [props])
  async function OpenClose (status) {
    // setTimeout(async () => {
      await setShowTime(status)
    // }, 150)
  }
  async function onDoneClick () {
    await props.getTime(props.name, time)
    await setShowTime(false)
  }
  async function handleChange (newTime) {
    await setTime(newTime.formatted24)
    await props.getTime(props.name, newTime.formatted24)
  }
  return (
    <div className='position-relative w-100'>
      {showTime && (
        <TimeKeeper
          time={time === '0:0' ? '00:00' : time}
          hour24Mode={true}
          onChange={handleChange}
          onDoneClick={onDoneClick}
          switchToMinuteOnHourSelect
          // closeOnMinuteSelect={() => null}
        />
      )}
      {!showTime && (
        <input
          value={handleString(props.value)}
          onFocus={() => setShowTime(true)}
          onBlur={() => setShowTime(false)}
        />
      )}
    </div>
  )
}
export default Clock
