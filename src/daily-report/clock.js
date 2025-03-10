import React, { useState } from 'react'
import TimeKeeper from 'react-timekeeper'

function Clock (props) {
  const [time, setTime] = useState(null)
  const [showTime, setShowTime] = useState(false)
  return (
    <div className='position-relative w-100'>
      {showTime && (
        <TimeKeeper
          time={time}
          hour24Mode={true}
          onChange={newTime => setTime(newTime.formatted24)}
          onDoneClick={() => {
            setShowTime(false)
            props.getTime(props.name, time)
          }}
          switchToMinuteOnHourSelect
          closeOnMinuteSelect={() => null}
        />
      )}
      {!showTime && (
        <input
          value={props.value}
          onFocus={() => setShowTime(true)}
          onBlur={() => setShowTime(false)}
        />
      )}
    </div>
  )
}
export default Clock
