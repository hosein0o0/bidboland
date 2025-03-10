import React from 'react'
import CreatableSelect from 'react-select/creatable'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
const ItemFirstLevel = props => {
  const key = props._key
  const data = props.dataSend || {}
  const { length, checkDis } = props
  const { handleChangeGroup, handleShowRemove, CheckDisabledGroup } = props.API
  function handleChange (newValue, key) {
    let datasend = {
      data,
      // _value: _value || {},
      key,
      newValue: newValue || []
    }
    handleChangeGroup(datasend)
  }
  function handleDelete () {
    const { handleDeleteAPI } = props.API
    handleDeleteAPI(key , 'all_groups')
  }
  const show_remove = handleShowRemove(length, checkDis, data)
  const Dis_gr = CheckDisabledGroup(checkDis, data)
  return (
    <div className='col-xl-12 col-lg-12 col-md-12 col-12' key={key}>
      <div className='title-password list-counter col-12 mt-3 mb-2 px-0'>
        <h2 className='IranSans_Bold_FA'>{data.priority}</h2>
        <div className='line'></div>
      </div>
      <div className='field-form selectBox'>
        <CreatableSelect
          isMulti
          onChange={newValue => handleChange(newValue || [], key)}
          options={props.handleList()}
          value={data.group}
          isDisabled={Dis_gr}
          placeholder={
            <label className='ltr'>
              <span className='star IranSans_Bold'>*</span>
              گروه ها
            </label>
          }
        />
      </div>
      {show_remove && (
        <div className='button-add col-12 row mr-0 ml-0 px-0'>
          <button className='remove' onClick={handleDelete}>
            <DeleteRoundedIcon />
            حذف
          </button>
        </div>
      )}
    </div>
  )
}
export default ItemFirstLevel
