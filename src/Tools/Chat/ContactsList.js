import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import handleString from '../../handleString'
function ContactsList (props) {
  const [search, setSeach] = useState('')
  const [select, setSelect] = useState('')
  function handleChange (e) {
    setSeach(e.target.value)
  }
  function handleSelect (key, data) {
    setSelect(key)
    props.handleState('userSelected', data)
  }
  return (
    <div className='col-xl-3 col-lg-3 col-md-3 col-12 px-0'>
      <div className='contactsList'>
        <div className='contactsList-head'>
          <div className='w-100 row mr-0 ml-0 align-items-center'>
            <h3 className='contactsList-head-title IranSans_Bold_FA col p-0'>
              لیست مخاطبین
            </h3>
            <span className='create-contacts pointer IranSans_Bold_FA'>
              <AddIcon />
              مخاطب جدید
            </span>
          </div>
          <div className='search-contactsList'>
            <SearchIcon className='icon-search' />
            <input
              value={handleString(search)}
              onChange={handleChange}
              placeholder='جستجو...'
            />
          </div>
        </div>
        <div className='list-users ltr'>
          {props.state.contacts.map((data, key) => (
            <div className='col-12 px-2 rtl'>
              <div
                className={`item-user pointer ${
                  select === key ? 'active' : ''
                }`}
                key={key}
                onClick={() => handleSelect(key, data)}
              >
                <div className='main-avatar'>
                  <div className='avatar'>
                    <img src={data.avatar} alt='' />
                  </div>
                </div>
                <div className='info'>
                  <div className='w-100'>
                    <span className='d-block name IranSans_Bold_FA mb-1'>
                      {data.name}
                    </span>
                    <span className='d-block about mt-1'>{data.about}</span>
                  </div>
                </div>
                <div className='icon-user'>
                  <KeyboardArrowLeftIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ContactsList
