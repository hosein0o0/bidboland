import React, { useState } from 'react'
import handleString from '../../handleString'
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Loading from '../../layout/loading'
import CheckPersianText from '../../CheckPersianText'
import handleCheckText from '../../handleCheckText'
const Message = props => {
  const { GetStatus } = props.API
  let { id, select, page } = props.state

  let status = GetStatus()
  const { handleMultiMessageAPI } = props.API
  const [more, setMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const checkCommnet = status === 'comment' && select === page

  const Verb = checkCommnet ? ' اصلاح گردد ' : ' اصلاح شده است '
  function handleMore() {
    let totalList = handleMultiMessageAPI() || []
    let _array = []
    totalList.forEach(data => {
      setInterval(() => {
        _array.push(data)
      }, 100)
    })
    setLoading(true)
    setTimeout(() => {
      setMore(!more)
      setLoading(false)
    }, 200)
  }
  function handleFilter() {
    let array = handleMultiMessageAPI() || []
    let filter = array.filter((data, key) => (more ? true : data && key === 0))
    return filter
  }
  let list = handleFilter()
  let total = handleMultiMessageAPI() || []
  const class_name = txt => (CheckPersianText(txt) ? 'rtl' : 'ltr')
  if (list.length > 0) {
    return (
      <div className='col-12'>
        <div className='message-warning'>
          <label className='IranSans_Bold_FA'>
            <span className='ml-1 IranSans_Bold_FA'>
              درخواست خدمات فنی {handleString(id)}
            </span>
            طبق موارد زیر
            {handleString(Verb)} :
          </label>
          {list.map((data, key) => (
            <div className='w-100 my-1' key={key}>
              <span
                className={`IranSans_Bold_FA ${key === 0 && checkCommnet ? '_text-error' : ''
                  }`}
              >
                {`${handleString(data.name)}`}
                {handleCheckText(data.full_name) && (
                  <span className='font-medium mx-1'>({data.full_name})</span>
                )}
                :
              </span>
              <div className='d-flex align-items-center'>
                <p
                  className={`mb-1 IranSans_Medium_FA text-right ${class_name(
                    handleString(data.message)
                  )}`}
                >
                  {handleString(data.message)}
                </p>
                <span className='doted col'></span>
                <span className='IranSans_Bold_FA date-width text-left ltr white-space-nowrap'>
                  {data.date}
                </span>
              </div>
            </div>
          ))}
          {total.length > 1 && (
            <div className='w-100 d-flex justify-content-center mx-1'>
              <button
                className={`more-message pointer ${more ? 'active' : ''}`}
                onClick={handleMore}
              >
                {loading ? (
                  <Loading className='form-loader' />
                ) : (
                  <ExpandMoreIcon />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  } else return ''
}
export default Message
