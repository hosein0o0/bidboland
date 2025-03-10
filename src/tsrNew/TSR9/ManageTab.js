import React from 'react'
import StaticList from './StaticList'
import Tab from './Tab'
const ManageTab = props => {
  let listTab = StaticList.listTab
  const { disabled, loading } = props.state
  const checkDisable = disabled ? true : false && loading === 'submit'
  return (
    <div className='col-12'>
      <div className='access'>
        <div className='main-accsess'>
          <div className='tab'>
            {listTab.map((data, key) => (
              <Tab
                {...props}
                key={key}
                _key={key}
                data={data || {}}
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
