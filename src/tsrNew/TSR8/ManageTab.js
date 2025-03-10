import React from 'react'
import ListTab from './ListTab'
import Tab from './Tab'
const ManageTab = props => {
  const listTab = ListTab.List || []
  const { disabled, loading } = props.state
  const checkDisable = disabled ? true : false && loading === 'submit'
  return (
    <div className='col-12'>
      <div className='access'>
        <div className='main-accsess'>
          <div className='tab'>
            {listTab.map((data, key) => (
              <Tab
                data={data}
                key={key}
                _key={key}
                {...props}
                checkDisable={checkDisable}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ManageTab
