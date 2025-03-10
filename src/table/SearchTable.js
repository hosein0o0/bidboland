import React, { useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import handleCheckText from '../handleCheckText'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import handleString from '../handleString'
import CheckPersianText from '../CheckPersianText'
function SearchTable(props) {
  useEffect(() => {
    document.onkeyup = e => handleClick(e)
  }, [props])
  function handleClick(e) {
    const checkVaue = handleCheckText(props.state.search)
    if (checkVaue) {
      if (e.keyCode === 13) {
        Submit()
      } else if (e.keyCode === 27) {
        props.handleState('search', '')
        props.FilterReset()
        props.Search(props.state.search)
      }
    }
  }
  function handleChange(e) {
    props.handleState('search', handleString(e.target.value))
  }
  function Submit() {
    if (props.Search) {
      const { search, nameTab } = props.state
      // const handleCheckText = HandleCheckText.handleCheckText
      if (handleCheckText(search) && props.Search) {
        props.Search(search, nameTab)
      }
    }
  }
  async function handleReset() {
    await props.handleState('search', '')
    await props.Search('')
  }
  return (
    <div className='col-xl-6 col-lg-6 col-md-4 col-12 p-0 d-flex justify-content-end'>
      <div className='search-index col-xl-6 col-lg-8 col-md-10 col-11'>
        <SearchIcon onClick={() => Submit()} />
        <input
          className={`text-right ${CheckPersianText(props.state.search) ? 'rtl' : 'ltr'}`}
          placeholder='(Ent)...جستجو'
          value={handleString(props.state.search)}
          onChange={handleChange}
        />
        <CloseRoundedIcon className='reset-search' onClick={handleReset} />
      </div>
    </div>
  )
}
export default SearchTable
