import React from 'react'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
function Radio (props) {
  let data = props.data || {}
  const items = () => {
    let result = []
    const checkString =
      typeof data.items === 'string' && handleCheckText(data.items)
    if (checkString) {
      result.push({ value: data.items, label: data.items })
    } else result = data.items
    return result
  }
  function Check (item) {
    let _value = props.state[data.value]
    let state1 = _value === item.label
    let state2 = _value === item.value
    const result = state1 || state2
    return result
  }
  function ManageSetState (data, item) {
    const { value, onchange, objectSetState } = data
    const itemValue = item.value
    if (!onchange) {
      let objectData = { [value]: itemValue }
      props.handleState(objectSetState ? objectData : value, itemValue)
    }
  }
  return (
    <div
      className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'
      key={props._key}
    >
      <div
        className={`field-radio align-items-center w-100 ${
          props.hadnleClassName(props.data).className
        }`}
      >
        {handleCheckText(data.name) && (
          <label>
            {data.name} :{props.handleRequire(props.data)}
          </label>
        )}
        <div className={`main-radio pr-0 ${data.fullView ? 'row mx-0' : ''}`}>
          {items().map((item, _key) => (
            <div
              className={`radio-button px-1 ${
                data.fullView ? 'col-12 my-2' : 'm-1'
              }`}
              key={_key}
            >
              {!data.disabled && (
                <input
                  className='d-none'
                  type='radio'
                  value={item.value || item.label}
                  name={data.value}
                  id={`${data.value}_${_key}`}
                  checked={Check(item)}
                  // onClick={() =>
                  //   !data.onchange
                  //     ? props.handleState(
                  //         data.objectSetState
                  //           ? { [data.value]: item.value }
                  //           : data.value,
                  //         item.value
                  //       )
                  //     : ''
                  // }
                  onClick={() => ManageSetState(data, item)}
                  onChange={e => (data.onchange ? data.onchange(e, item) : '')}
                />
              )}
              <label htmlFor={`${data.value}_${_key}`}>
                {Check(item) ? (
                  <RadioButtonCheckedIcon
                    className={data.rtl ? `ml-1` : 'mr -1'}
                  />
                ) : (
                  <RadioButtonUncheckedIcon
                    className={data.rtl ? `ml-1` : 'mr -1'}
                  />
                )}
                {handleString(item.name || item.label)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Radio
