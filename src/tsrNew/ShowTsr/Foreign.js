import React from 'react'
import ItemForeign from './ItemForeign'
import AddIcon from '@material-ui/icons/Add'
const Foreign = props => {
  let foreign_attachments =
  props.state[props.name || 'foreign_attachments'] || []
  const check = typeof foreign_attachments === 'object'
  let list = check ? foreign_attachments : []
  const canCreate = props.check_disabled ? false : true
  const nameParent = props.name || 'foreign_attachments'
    return (
      <div className='w-100'>
        <div className='title-password col-12 mt-3 mb-2'>
          <h2 className='IranSans_Bold'>مدارک ضمیمه خارج از سامانه</h2>
          <div className='line'></div>
        </div>
        {list.map((data, key) => (
          <ItemForeign
            {...props}
            data={data}
            key={key}
            _key={key}
            nameParent={nameParent}
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
export default Foreign
