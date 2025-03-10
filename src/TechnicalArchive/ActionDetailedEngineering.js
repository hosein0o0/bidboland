import React, { useEffect, useRef } from 'react'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded'
import SecondBoxData from '../Customization/SecondBoxData'
import Loading from '../layout/loading'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
const ActionDetailedEngineering = props => {
  const actionElm = useRef()
  const {
    data,
    state,
    _key,
    Permision,
    GetMore,
    handlePositionBox,
    GetSecondData,
    handleState
  } = props
  let {
    selectNumber,
    role,
    firstData,
    documentSelected,
    secondSelectNumber,
    loading
  } = state
  let list = firstData || []
  const checkLength = list.length > 0
  const handlePermision = Permision.handlePermision
  useEffect(() => {
    if (actionElm) {
      let elm = actionElm.current
      let name = `_action_${_key}`
      props.handleRefs(name, elm)
    }
  }, [])
  function handleTitle () {
    switch (loading) {
      case 'more':
        return (
          <React.Fragment>
            <Loading className='loading-boxmore' />
            <span className='w-100 min-size'>در حال بارگذاری</span>
          </React.Fragment>
        )
      default:
        return checkLength
          ? `${documentSelected} داکیومنت `
          : 'اطلاعات ثبت نشده است'
    }
  }
  return (
    <td
      className={`action justify-content-center ${
        selectNumber === _key ? 'active' : ''
      }`}
      ref={actionElm}
    >
      {handlePermision(role, 'detail_engineering_revisions') && (
        <span
          className='more'
          onClick={() => GetMore(_key, data.documentNumber)}
        >
          <MoreVertRoundedIcon />
        </span>
      )}
      {handlePermision(role, 'detail_engineering_delete') && (
        <span
          className='delete'
          onClick={() => handleState({ delete_id: data.id })}
        >
          <DeleteIcon />
        </span>
      )}
      {handlePermision(role, 'detail_engineering_update') && (
        <a href={`detailEng-${data.id}`}>
          <span className='edit'>
            <EditIcon />
          </span>
        </a>
      )}
      {selectNumber === _key && (
        <div className={`box-more ${handlePositionBox(_key)}`}>
          <div className='title w-100 pl-0'>
            <h4
              className={`w-100 ${
                checkLength
                  ? ''
                  : 'd-flex justify-content-end align-items-center'
              }`}
            >
              {handleTitle()}
            </h4>
          </div>
          <div className='main-item'>
            {list.map((data, index) => (
              <div
                key={index}
                className={`item ${
                  secondSelectNumber === index ? 'active' : ''
                }`}
                onClick={() => GetSecondData(data, index, _key)}
              >
                {loading === `secondmore-${index}` ? (
                  <Loading className='loading-boxmore min-size' />
                ) : (
                  <ChevronLeftRoundedIcon />
                )}
                <span>Rev : {data.revision}</span>
                {secondSelectNumber === index &&
                  handlePermision(
                    role,
                    'detail_engineering_revisions_details'
                  ) && (
                    <SecondBoxData
                      {...props}
                      permision={handlePermision(
                        role,
                        'detail_engineering_download'
                      )}
                    />
                  )}
              </div>
            ))}
          </div>
        </div>
      )}
    </td>
  )
}
export default ActionDetailedEngineering
