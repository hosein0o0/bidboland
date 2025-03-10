import React from 'react'
import CreatableSelect from 'react-select/creatable'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
const ItemResponsibleExpert = props => {
  let user_list = props.props.state.user_list || []
  const _disabled = props.disabled
  const data = props.data || {}
  function handleChange(newValue) {
    if (!newValue.__isNew__) {
      let list = props.state[props.name] || []
      list[props._key] = newValue
      props.handleState({
        [props.name]: list
      })
    }
  }
  function handleDelete() {
    let list = props.state[props.name] || []
    list.splice(props._key, 1)
    props.handleState({
      [props.name]: list
    })
  }
  function handleListUser() {
    let list = props.state[props.name] || []
    const results = user_list.filter(
      ({ value: id1 }) => !list.some(({ value: id2 }) => id2 === id1)
    )
    return results
  }
  return (
    <div className='w-100 row m-0' key={props._key}>
      <div className='title-password list-counter col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>{props._key + 1}</h2>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12' key={props._key}>
        <div className='field-form selectBox'>
          <CreatableSelect
            onChange={newValue => handleChange(newValue)}
            options={handleListUser()}
            value={
              handleCheckText(data.user_unit) && handleCheckText(data.user_role)
                ? data
                : null
            }
            isDisabled={_disabled}
            placeholder={
              <label className='rtl'>
                نام و نام خانوادگی
                <span className='star IranSans_Bold'>*</span>
              </label>
            }
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian pl-1 ${handleCheckText(data.user_unit) ? 'active' : ''
            }`}
        >
          <label>
            گروه
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            disabled={true}
            readOnly={true}
            value={handleString(data.user_unit)}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian pl-1 ${handleCheckText(data.user_role) ? 'active' : ''
            }`}
        >
          <label>
            سمت سازمانی
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            disabled={true}
            readOnly={true}
            value={handleString(data.user_role)}
          />
        </div>
      </div>
      {!_disabled && props.length > 1 && (
        <div className='button-add col-12 row mr-0 ml-0'>
          <button className='remove' onClick={handleDelete}>
            <DeleteRoundedIcon />
            حذف
          </button>
        </div>
      )}
    </div>
  )
}
export default ItemResponsibleExpert
