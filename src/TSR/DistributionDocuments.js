import React from 'react'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'

function DistributionDocuments (props) {
  return (
    <div className='w-100 row mr-0 ml-0'>
      <div className='title-password list-counter col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>{props._key + 1}</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === `${props.name}__officeName__${props._key}` ||
            props.data.officeName
              ? 'active'
              : ''
          }`}
        >
          <label>نام اداره</label>
          <input
            type='text'
            name={`${props.name}__officeName__${props._key}`}
            value={props.data.officeName}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={e =>
              props.handleChangeList(
                props.name,
                e.target.name.split('__')[1],
                e.target.value,
                props._key
              )
            }
            readOnly={props.handleDisabled()}
            disabled={props.handleDisabled()}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === `${props.name}__number__${props._key}` ||
            props.data.number
              ? 'active'
              : ''
          }`}
        >
          <label>تعداد نسخه</label>
          <input
            type='number'
            name={`${props.name}__number__${props._key}`}
            value={props.data.number}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={e =>
              props.handleChangeList(
                props.name,
                e.target.name.split('__')[1],
                e.target.value,
                props._key
              )
            }
            readOnly={props.handleDisabled()}
            disabled={props.handleDisabled()}
          />
        </div>
      </div>
      {props.length > 1 && !props.handleDisabled() && (
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
      <div className='col-12'>
        <hr />
      </div>
    </div>
  )
}
export default DistributionDocuments
