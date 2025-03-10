import React, { useState } from 'react'
import handleString from '../../handleString'
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Loading from '../../layout/loading'
import CheckPersianText from '../../CheckPersianText'
import handleCheckText from '../../handleCheckText'
const RejectHistor = props => {
  const [more, setMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = props.state
  const { handleListReject } = props.API
  //   const list = handleListReject()
  const class_name = txt => (CheckPersianText(txt) ? 'rtl' : 'ltr')
  function handleFilter () {
    let array = handleListReject() || []
    let filter = array.filter((data, key) => (more ? true : data && key === 0))
    return filter
  }
  function handleMore () {
    let totalList = handleListReject() || []
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
  let list = handleFilter()
  let total = handleListReject() || []
  if (list.length > 0) {
    return (
      <div className='col-12'>
        <div className='message-warning'>
          <label className='IranSans_Bold_FA'>
            <span className='ml-1 IranSans_Bold_FA'>
              درخواست خدمات فنی {handleString(id)}
            </span>
            طبق موارد زیر رد شده است :
          </label>
          {list.map((data, key) => (
            <div className='w-100 my-1' key={key}>
              <span className={`IranSans_Bold_FA`}>
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
export default RejectHistor
