import React, { useState } from 'react'
function Days (props) {
  const [Listdays] = useState([
    { label: 'شنبه', value: 1 },
    { label: 'یک شنبه', value: 2 },
    { label: 'دو شنبه', value: 3 },
    { label: 'سه شنبه', value: 4 },
    { label: 'چهار شنبه', value: 5, completed: true },
    {
      label: 'پنج شنبه',
      value: 6,
      completed: true,
      textCompleted: 'انجام تسک اورم ایپسوم'
    },
    { label: 'جمعه', value: 7 },
    { label: 'شنبه', value: 8 },
    { label: 'یک شنبه', value: 9, expire: true, expireText: '' },
    { label: 'دو شنبه', value: 10 },
    { label: 'سه شنبه', value: 11 },
    { label: 'چهار شنبه', value: 12 },
    { label: 'پنج شنبه', value: 13 },
    { label: 'جمعه', value: 14 },
    { label: 'شنبه', value: 15 },
    { label: 'یک شنبه', value: 16 },
    { label: 'دو شنبه', value: 17 },
    { label: 'سه شنبه', value: 18, expire: true },
    { label: 'چهار شنبه', value: 19 },
    { label: 'پنج شنبه', value: 20 },
    { label: 'جمعه', value: 21, soon: true, soonText: '' },
    { label: 'شنبه', value: 22 },
    { label: 'یک شنبه', value: 23, today: true },
    { label: 'دو شنبه', value: 24 },
    { label: 'سه شنبه', value: 25 },
    { label: 'چهار شنبه', value: 26, todo: true, todoText: '' },
    { label: 'پنج شنبه', value: 27 },
    { label: 'جمعه', value: 28 },
    { label: 'شنبه', value: 29 },
    { label: 'یک شنبه', value: 30 },
    { label: 'دو شنبه', value: 31 }
  ])
  function handleClass (day) {
    if (day.expire) {
      return 'expireDay'
    } else if (day.today) {
      return 'today'
    } else if (day.completed) {
      return 'completed'
    } else if (day.soon) {
      return 'soon'
    } else if (day.todo) {
      return 'todo'
    } else return ''
  }
  return (
    <div className='main-days row mr-0 ml-0'>
      {Listdays.map((day, key) => (
        <div className='seven-item p-0' key={key}>
          <div className={`box-day ${handleClass(day)}`}>
            <div className='first-item'>
              <div className='d-flex col-8 justify-content-start p-1 align-items-center'>
                <span className='label'>{day.label}</span>
              </div>
              <div className='d-flex col-4 justify-content-end p-1 align-items-center'>
                <span className='value'>{day.value}</span>
              </div>
            </div>
            <div className='second-item'>
              {day.expireText && (
                <button className='view-expire w-100'>{day.expireText}</button>
              )}
              {day.soonText && (
                <button className='soonText w-100'>{day.soonText}</button>
              )}
              {day.today && (
                <span className='today-text IranSans_Bold w-100'>امروز</span>
              )}
              {day.textCompleted && (
                <span className='textCompleted w-100'>{day.textCompleted}</span>
              )}
              {day.todoText && (
                <button className='todoText w-100'>{day.todoText}</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Days
