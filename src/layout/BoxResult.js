import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
function BoxResult (props) {
  return (
    <div className='box-result'>
      {props.listSuggestion.map((data, key) => (
        <div
          className='item-box-result'
          onClick={() => alert('sdsds')}
          key={key}
        >
          <div className='icon'>
            <SearchIcon />
          </div>
          <div className='main-text'>
            <strong className='you-text'>{props.value}</strong>
            <span className='suggestion'>در {data.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
export default BoxResult
