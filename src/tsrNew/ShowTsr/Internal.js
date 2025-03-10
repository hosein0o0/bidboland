import React from 'react'
import ItemInternal from './ItemInternal'
import AddIcon from '@material-ui/icons/Add'
const Internal = props => {
  // let { internal_attachment } = props.state
  let internal_attachment =
    props.state[props.name || 'internal_attachments'] || []
  let list = internal_attachment || []
  const nameParent = props.name || 'internal_attachments'
  const canCreate = props.check_disabled ? false : true
    return (
      <div className='w-100'>
        {internal_attachment && (
          <div className='title-password col-12 mt-3 mb-2'>
            <h2 className='IranSans_Bold'>مدارک ضمیمه درون سامانه</h2>
            <div className='line'></div>
          </div>
        )}
        {list.map((data, key) => (
          <ItemInternal
            {...props}
            data={data}
            key={key}
            _key={key}
            nameParent={nameParent}
            canCreate={canCreate}
            list={list}
          />
        ))}
        {canCreate && (
          <div className='button-add col-12'>
            <button onClick={() => props.handleAddAttach(nameParent)}>
              <AddIcon />
              افزودن مورد جدید
            </button>
          </div>
        )}
      </div>
    )
}
export default Internal
