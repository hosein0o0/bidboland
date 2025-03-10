import React from 'react'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Loading from './loading'
function BoxResultSearch (props) {
  function handleShow () {
    const list = props.nameList
      ? props.state[props.nameList]
        ? props.state[props.nameList]
        : []
      : props.state.data
      ? props.state.data
      : []
    if (props.state.loading === 'search') {
      return <Loading className='table row m-0 justify-content-center' />
    } else if (list.length === 0) {
      return (
        <div className='w-100 no-result'>
          <span>متاسفانه موردی یافت نشد</span>
        </div>
      )
    } else if (list) {
      return list.map((item, key) => (
        <div
          className='box-result-search-item pointer'
          key={key}
          onClick={() =>
            !props.general &&
            props.handleSelectData(item, props.name1, props.name2)
          }
        >
          {props.general ? (
            <a
              className='w-100 h-100'
              href={`/result-page-search=${item.label}`}
            >
              <label className='m-0 col text-left pointer position-initial font-normal'>
                {item.label}
              </label>
              <ChevronRightIcon className='pointer' />
            </a>
          ) : (
            <span className='px-1 font-normal'>{item.label}</span>
          )}
        </div>
      ))
    }
  }
  return <div className='box-result-search ltr'>{handleShow()}</div>
}
export default BoxResultSearch
