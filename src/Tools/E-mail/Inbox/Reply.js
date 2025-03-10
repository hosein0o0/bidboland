import React from 'react'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded'
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded'
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded'
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded'
import CloudDownloadRoundedIcon from '@material-ui/icons/CloudDownloadRounded'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
function Reply (props) {
  const {
    title,
    nameAuthor,
    date,
    time,
    text,
    attachList,
    attach
  } = props.state.dataSelected.reply
  return (
    <div
      className={`content-email row mx-0 ${
        props.close === 'reply' ? '_close' : ''
      }`}
    >
      <div className='avatar'>
        <div className='image'>
          <PersonRoundedIcon />
        </div>
      </div>
      <div className='content-text'>
        <div className='head-content-text'>
          <div className='w-100'>
            <h4 className='title'>{title}</h4>
            <div className='row mx-0 w-100'>
              <span className='status ml-2 mt-2'>
                <CreateRoundedIcon className='ml-1' />
                {nameAuthor}
              </span>
              <span className='status ml-2 mt-2'>
                <CalendarTodayRoundedIcon className='ml-1' />
                {date}
              </span>
              <span className='status ml-2 mt-2'>
                <AccessTimeRoundedIcon className='ml-1' />
                {time}
              </span>
            </div>
          </div>
          {props.close === 'reply' && (
            <div className='more'>
              <span
                className='pointer'
                onClick={() => props.handleClose('message')}
              >
                مشاهده پیام
                <ArrowDropDownIcon />
              </span>
            </div>
          )}
        </div>
        <div className='main-text'>
          <p className='text'>{text}</p>
          {attach ? (
            <div className='attachFile'>
              <span className='title'>فایل‌های پیوست شده‎</span>
              <div className='w-100 row mx-0 mt-2'>
                {attachList.map((data, key) => (
                  <a className='link-attachment' href={data} key={key}>
                    <DescriptionRoundedIcon />
                    {`Attachment-file${key + 1}.pdf`}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
          <div className='handle-buttons-content'>
            <a href='#/' className='reply'>
              <ReplyRoundedIcon className='ml-1' />
              نوشتن پاسخ
            </a>
            {attach && (
              <a href='#/' className='download'>
                <CloudDownloadRoundedIcon className='ml-1' />
                دانلود فایل‌های پیوست
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Reply
