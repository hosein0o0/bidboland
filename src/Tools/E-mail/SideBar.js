import React, { useState, useEffect } from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import StarRoundedIcon from '@material-ui/icons/StarRounded'
import RemoveRedEyeRoundedIcon from '@material-ui/icons/RemoveRedEyeRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const SideBarInBox = props => {
  const [list, setList] = useState([])
  useEffect(() => {
    setList(props.state.list ? props.state.list : [])
  }, [props])
  function handleClick (event) {
    const { name, checked } = event.target
    props.handleState(name, checked)
  }
  function CheckClassName (data) {
    const check = data.attach || data.star
    return check
  }
  function handleSelect (data, key) {
    const check = props.state.select === key
    props.handleState('select', check ? '' : key)
    props.handleState('dataSelected', check ? null : data)
  }
  return (
    <div className='col-xl-4 col-lg-4 col-md-4 col-12 py-1'>
      <div className='main-side-inbox'>
        <div className='main-list-emails ltr'>
          {list.map((data, key) => (
            <div
              className={`item-email rtl ${
                props.state.select === key ? 'active' : ''
              }`}
              key={key}
              onClick={() => handleSelect(data, key)}
            >
              <div
                className={`checkbox-email ${
                  props.state[`email-${key}`] ? 'select' : ''
                }`}
              >
                <input
                  type='checkbox'
                  className='d-none'
                  id={`email-${key}`}
                  name={`email-${key}`}
                  onChange={handleClick}
                />
                <label className='mb-0' htmlFor={`email-${key}`}>
                  {props.state[`email-${key}`] ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                </label>
              </div>
              <div
                className={`content-detail ${
                  CheckClassName(data) ? '' : 'full'
                }`}
              >
                <h4 className='title mb-0'>{data.title}</h4>
                <p className='text'>{data.text}</p>
              </div>
              {CheckClassName(data) && (
                <div className='handleAttach'>
                  {data.attach && (
                    <React.Fragment>
                      <input
                        type='file'
                        className='d-none'
                        id={`file-${key}`}
                        name={`file-${key}`}
                      />
                      <label className='mb-0' htmlFor={`file-${key}`}>
                        <AttachFileIcon className='pointer attach' />
                      </label>
                    </React.Fragment>
                  )}
                  {data.star && <StarRoundedIcon className='pointer star' />}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='main-buttons'>
          <div className='row mx-0 w-100'>
            <div className='col-4 pr-0 pl-1'>
              <button className='star'>
                <StarRoundedIcon />
                ستاره دار
              </button>
            </div>
            <div className='col-4 px-1'>
              <button className='read'>
                <RemoveRedEyeRoundedIcon />
                خوانده شده
              </button>
            </div>
            <div className='col-4 pr-1 pl-0'>
              <button className='delete'>
                <DeleteRoundedIcon />
                حذف پیام
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SideBarInBox
