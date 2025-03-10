import React, { useEffect, useState } from 'react'
import DoneIcon from '@material-ui/icons/Done'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import 'react-tagsinput/react-tagsinput.css'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
function EditRow (props) {
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [foucs, setFoucs] = useState('')
  useEffect(() => {
    setText(props.item.text)
    setTitle(props.item.title)
  }, [props])
  function handleSubmit () {
    let obj = {
      text: text,
      title: title
    }
    let Check = true
    if (Check) {
      props.that.props.handleUpdata(obj, props.index, props.that.props.nameList)
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  return (
    <td className='edit-item-definedColumns'>
      <div className='row m-0 w-100'>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div
            className={`field-form persian
                     ${
                       foucs === `title_${props.index}` || title ? 'active' : ''
                     }
                     `}
          >
            <label>عنوان</label>
            <input
              name={`title_${props.index}`}
              value={handleString(title)}
              onFocus={e => setFoucs(e.target.name)}
              onBlur={() => setFoucs('')}
              onChange={e => setTitle(handleString(e.target.value))}
            />
          </div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div
            className={`field-form textarea persian
                     ${
                       foucs === `text_${props.index}` || handleCheckText(text)
                         ? 'active'
                         : ''
                     }
                     `}
          >
            <label>توضیحات</label>
            <textarea
              name={`text_${props.index}`}
              value={handleString(text)}
              onFocus={e => setFoucs(e.target.name)}
              onBlur={() => setFoucs('')}
              onChange={e => setText(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className='submit-form col-12 mt-1'>
          <button className='edit' onClick={handleSubmit}>
            <DoneIcon className='ml-1' />
            اعمال تغییرات
          </button>
        </div>
      </div>
    </td>
  )
}
export default EditRow
