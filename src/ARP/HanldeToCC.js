import React from 'react'
import CreatableSelect from 'react-select/creatable'
import handleString from '../handleString'
const handleToCC = props => {
  const { listSign, user_list } = props.state
  function handleChange(newValue, _data) {
    props.handleState({
      [_data.value]: newValue
    })
  }
  const _disable = props.handleDisabled()
  function handleList(_data) {
    let array = []
    if (_data.listUser) {
      let _ids = props.state[_data.listUser]
      if (_ids) {
        if (typeof _ids === 'string') {
          let _array = _ids.split(',')
          let filter = user_list.filter(user => _array.includes(user.value))
          array = filter
        } else if (_ids.length) {
          array = _ids
        }
      }
    } else {
      array = user_list
    }
    return array
  }
  const handleValue = (value) => {
    let result = value.label ? value : null
    return result
  }
  return (
    <div className='w-100 row mx-0'>
      <div className='title-password col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>تخصیص شخص بررسی کننده</h2>
        <div className='line'></div>
      </div>
      {listSign.map((_data, _key) => (
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div className='field-form selectBox'>
            <CreatableSelect
              onChange={newValue =>
                _disable ? '' : handleChange(newValue, _data)
              }
              options={handleList(_data)}
              value={handleValue(props.state[_data.value] || {})}
              placeholder={
                <label>
                  <span className='star IranSans_Bold'>*</span>
                  {handleString(_data.name)}
                </label>
              }
              isDisabled={_disable}
            />
          </div>
        </div>
      ))}
      {!props.dontCC ? (
        <React.Fragment>
          <div className='title-password col-12 mt-3 mb-2'>
            <div className='line'></div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div className='field-form selectBox'>
              <CreatableSelect
                isMulti
                onChange={newValue =>
                  _disable
                    ? ''
                    : props.handleState({ notification_to: newValue })
                }
                options={user_list}
                value={props.state.notification_to}
                placeholder={<label>CC</label>}
                isDisabled={_disable}
              />
            </div>
          </div>
        </React.Fragment>
      ) : (
        ''
      )}
    </div>
  )
}
export default handleToCC
