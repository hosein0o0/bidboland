import React from 'react'
import CreatableSelect from 'react-select/creatable'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
const SelectUnitManager = props => {
  const { tabSelected, user_list, loading, disabled , allocation_secretary_committee_allow } = props.state
  const _disbaled = props.state[`${tabSelected}_dis1`]
    ? props.state[`${tabSelected}_dis1`]
    : allocation_secretary_committee_allow
  const _check = props.state[`${tabSelected}_boss_allow`]
  function handleDisable () {
    let state1 = allocation_secretary_committee_allow
    const result =
      disabled || _disbaled || !_check || props.handleTimeOut() || state1
    return result
  }
  return (
    <React.Fragment>
      <div className='title-password col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>تخصیص سرپرست واحد رسیدگی به حادثه</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.handlecheckValue(`${tabSelected}_discipline`) ? 'active' : ''
          }`}
        >
          <label>
            Discipline
            <span className='star IranSans_Bold'>*</span>
          </label>
          <select
            name={`${tabSelected}_discipline`}
            onBlur={() =>
              props.handleState({
                foucs: ''
              })
            }
            onFocus={e => props.handleState({ foucs: e.target.name })}
            onChange={e =>
              props.handleState({
                [e.target.name]: handleString(e.target.value)
              })
            }
            value={handleString(props.state[`${tabSelected}_discipline`])}
            disabled={handleDisable()}
            readOnly={handleDisable()}
          >
            <option className='d-none'></option>
            {props.handleSwitch().array.map((data, key) => (
              <option key={key} value={data.value}>
                {data.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div className='field-form selectBox'>
          <CreatableSelect
            onChange={newValue =>
              props.handleState({
                [`${tabSelected}_unit_supervisor`]: newValue
              })
            }
            value={props.state[`${tabSelected}_unit_supervisor`]}
            options={user_list}
            isDisabled={handleDisable()}
            placeholder={
              <label className='rtl'>
                سرپرست واحد
                <span className='star IranSans_Bold'>*</span>
              </label>
            }
          />
        </div>
      </div>
      {!_disbaled ? (
        <div className='submit-form col-12'>
          <button
            onClick={() =>
              props.MainFn && !handleDisable()
                ? props.MainFn.handleSubmit1()
                : ''
            }
            disabled={handleDisable()}
          >
            {loading === `office-${tabSelected}` ? (
              <Loading className='form-loader' />
            ) : (
              <DoneIcon />
            )}
            ثبت اطلاعات
          </button>
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}
export default SelectUnitManager
