import React from 'react'
import ItemPurchaseRequests from './ItemPurchaseRequests'
import AddIcon from '@material-ui/icons/Add'
const PurchaseRequests = props => {
  let { check_disabled, name } = props
  // let { purchase_request } = props.state
  let list = props.state[name] || []
  list = typeof list === 'object' ? list : []
  const canCreate = check_disabled ? false : true
  function handleAdd () {
    const { handleAddAttachAPI } = props.API
    handleAddAttachAPI(name)
  }
  const length = list.length || 0
  const checkShow = length > 0
  if (checkShow) {
    return (
      <div className='w-100 mr-0 ml-0 row'>
        <div className='title-password col-12 mt-3 mb-2'>
          <h2 className='IranSans_Bold'>بسته های خرید</h2>
          <div className='line'></div>
        </div>
        {list.map((data, key) => (
          <ItemPurchaseRequests
            {...props}
            key={key}
            data={data}
            _key={key}
            name={name}
            canCreate={canCreate}
            length={length}
          />
        ))}
        {canCreate && length > 0 && (
          <div className='button-add col-12'>
            <button onClick={handleAdd}>
              <AddIcon />
              افزودن مورد جدید
            </button>
          </div>
        )}
      </div>
    )
  } else return ''
}
export default PurchaseRequests
