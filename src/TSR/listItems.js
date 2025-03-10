import React from 'react'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
function ListItems (props) {
  return (
    <div className='w-100 row m-0'>
      <div className='title-password list-counter col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>{props._key + 1}</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian pl-1 
                ${
                  props.state.foucs ===
                    `${props.name}__position_group__${props._key}` ||
                  handleCheckText(props.data.position_group)
                    ? 'active'
                    : ''
                }
                `}
        >
          <label>
            گروه
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            type='text'
            name={`${props.name}__position_group__${props._key}`}
            value={handleString(props.data.position_group)}
            onFocus={e =>
              !props.handleDisabled() && props.OnFocus(e.target.name)
            }
            onBlur={!props.handleDisabled() && props.OnBlur}
            onChange={e =>
              !props.handleDisabled() &&
              props.handleChangeList(props.name, e.target.name, e.target.value)
            }
            readOnly={props.handleDisabled()}
            disabled={props.handleDisabled()}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === `${props.name}__user_id__${props._key}` ||
            handleCheckText(props.data.user_id)
              ? 'active'
              : ''
          }`}
        >
          <label>
            نام و نام خانوادگی
            <span className='star IranSans_Bold'>*</span>
          </label>
          {props.props.show ? (
            <input
              type='text'
              value={handleString(props.data.user_name)}
              readOnly={props.handleDisabled()}
              disabled={props.handleDisabled()}
            />
          ) : (
            <select
              name={`${props.name}__user_id__${props._key}`}
              value={handleString(props.data.user_id)}
              onFocus={e =>
                !props.handleDisabled() && props.OnFocus(e.target.name)
              }
              onBlur={!props.handleDisabled() && props.OnBlur}
              onChange={e =>
                !props.handleDisabled() &&
                props.handleChangeList(
                  props.name,
                  e.target.name,
                  e.target.value
                )
              }
              readOnly={props.handleDisabled()}
              disabled={props.handleDisabled()}
            >
              <option className='d-none'></option>
              {props.state.user_list.map((user, _index) => (
                <option value={handleString(user.value)} key={_index}>
                  {handleString(user.label)}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian pl-1 
                ${
                  props.state.foucs ===
                    `${props.name}__org_position__${props._key}` ||
                  handleCheckText(props.data.org_position)
                    ? 'active'
                    : ''
                }
                `}
        >
          <label>
            سمت سازمانی
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            type='text'
            name={`${props.name}__org_position__${props._key}`}
            value={handleString(props.data.org_position)}
            onFocus={e =>
              !props.handleDisabled() && props.OnFocus(e.target.name)
            }
            onBlur={!props.handleDisabled() && props.OnBlur}
            onChange={e =>
              !props.handleDisabled() &&
              props.handleChangeList(props.name, e.target.name, e.target.value)
            }
            readOnly={props.handleDisabled()}
            disabled={props.handleDisabled()}
          />
        </div>
      </div>
      {!props.handleDisabled() && props.length > 1 && (
        <div className='button-add col-12 row mr-0 ml-0'>
          <button
            className='remove'
            onClick={() => props.handleDelete(props.name, props._key)}
          >
            <DeleteRoundedIcon />
            حذف
          </button>
        </div>
      )}
    </div>
  )
}
export default ListItems
