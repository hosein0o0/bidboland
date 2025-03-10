import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import handleString from '../handleString'
function ListLink (props) {
  const [array, setArray] = useState([])
  const [value, setValue] = useState('')
  useEffect(() => {
    setArray(
      Object.keys(props.list).map(data => {
        return props.list[data]
      })
    )
  }, props)
  function handleFilter (e) {
    let { value } = e.target
    setValue(value)
    let filter = props.list.filter(data => data.value.includes(value))
    setArray(filter)
  }
  return (
    <div className='main-list-create'>
      <div className='search'>
        <input
          placeholder='جستجو...'
          onChange={handleFilter}
          value={handleString(value)}
        />
      </div>
      <div className='main-list ltr'>
        {array.map((data, key) =>
          !data.enabled ? (
            <a className='disabled ltr' key={key}>
              {data.label}
            </a>
          ) : (
            <Link
              to={{
                pathname: `/create-vendor-document`,
                state: { status: data.label }
              }}
            >
              {handleString(data.label)}
            </Link>
          )
        )}
      </div>
    </div>
  )
}
export default ListLink
