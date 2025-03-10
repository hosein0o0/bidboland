import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker2'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import AddIcon from '@material-ui/icons/Add'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import moment from 'moment-jalaali'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'

function HandleTypeWork (props) {
  const [obj, setObj] = useState({})
  useEffect(() => {
    if (props.state[props.state.typeWork]) {
      setObj(props.state[props.state.typeWork])
    }
  }, [props])
  async function handleAdd () {
    let list = await obj.eng_instruction
    if (list) {
      let objAdd = await {
        description: '',
        executionTime: null,
        instruction_issuance_time: ''
      }
      await list.push(objAdd)
      let nameState = await props.state.typeWork
      props.state[nameState].eng_instruction = await list
      await props.handleState(nameState, props.state[nameState])
      await props.handleDate()
    }
  }
  function handleDelete (key) {
    let list = obj.eng_instruction
    if (list) {
      list.splice(key, 1)
      let nameState = props.state.typeWork
      props.state[nameState].eng_instruction = list
      props.handleState(nameState, props.state[nameState])
    }
  }
  function CheckType (date) {
    if (date) {
      if (typeof date === 'string') {
        return moment(date, 'jYYYY/jM/jD')
      } else return date
    } else return null
  }
  return (
    <React.Fragment>
      {obj.eng_instruction
        ? obj.eng_instruction.map((data, key) => (
            <div className='row mr-0 ml-0 w-100' key={key}>
              <div className='title-password list-counter col-12 mt-3 mb-2'>
                <h2 className='IranSans_Bold'>{key + 1}</h2>
                <div className='line'></div>
              </div>
              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                <div
                  className={`field-form persian textarea ${
                    props.state.foucs === `description_${key}` ||
                    handleCheckText(data.description)
                      ? 'active'
                      : ''
                  }`}
                >
                  <div className='col p-0'>
                    <label className='textarea'>
                      شرح دستورالعمل مهندسی
                      <span className='star IranSans_Bold'>*</span>
                    </label>
                    <textarea
                      className='w-100'
                      type='text'
                      name={`description_${key}`}
                      onFocus={e => props.OnFocus(e.target.name)}
                      onBlur={props.OnBlur}
                      // onChange={handleChenge}
                      onChange={e =>
                        props._handleChangeList(
                          'eng_instruction',
                          'description',
                          e.target.value,
                          key
                        )
                      }
                      value={handleString(data.description)}
                      readOnly={props.handleDisabled()}
                      disabled={props.handleDisabled()}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form persian ${
                    handleCheckText(data.instruction_issuance_time) ? 'active' : ''
                  }`}
                >
                  <div className='icon-field'>
                    <DateRangeRoundedIcon />
                  </div>
                  <div className='col p-0'>
                    <label>
                      زمان صدور دستورالعمل
                      <span className='star IranSans_Bold'>*</span>
                    </label>
                    <React.Fragment>
                      <input
                        name='executionTime'
                        value={handleString(data.instruction_issuance_time)}
                        readOnly={true}
                        disabled={true}
                      />
                    </React.Fragment>
                  </div>
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form persian ${
                    data.executionTime ? 'active' : ''
                  }`}
                >
                  <div className='icon-field'>
                    <DateRangeRoundedIcon />
                  </div>
                  <div className='col p-0'>
                    <label>زمان اجرا</label>
                    {props.handleDisabled() ? (
                      <React.Fragment>
                        <input
                          name='executionTime'
                          value={handleString(data.executionTime)}
                          readOnly={true}
                          disabled={true}
                        />
                      </React.Fragment>
                    ) : (
                      <DatePicker
                        persianDigits={true}
                        isGregorian={false}
                        timePicker={false}
                        onChange={executionTime =>
                          props._handleChangeList(
                            'eng_instruction',
                            'executionTime',
                            executionTime,
                            key
                          )
                        }
                        value={CheckType(data.executionTime)}
                      />
                    )}
                  </div>
                </div>
              </div>
              {obj.eng_instruction.length > 1 && !props.handleDisabled() ? (
                <div className='button-add col-12 row mr-0 ml-0'>
                  <button className='remove' onClick={() => handleDelete(key)}>
                    <DeleteRoundedIcon />
                    حذف
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          ))
        : ''}
      {!props.handleDisabled() && (
        <div className='button-add col-12 row mr-0 ml-0'>
          <button onClick={handleAdd}>
            <AddIcon />
            افزودن مورد جدید
          </button>
        </div>
      )}
    </React.Fragment>
  )
}
export default HandleTypeWork
