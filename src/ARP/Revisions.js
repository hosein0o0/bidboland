import React, { useState, useEffect } from 'react'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Loading from '../layout/loading'
import handleString from '../handleString'

function Revisions (props) {
  const [list, setList] = useState([])
  const [selectRev, setSelectRev] = useState('')
  // const [loading, setLoading] = useState('')
  const { revisions, select, id, role, loading } = props.state
  useEffect(() => {
    props.GetReset(() => setSelectRev(''))
    if (revisions) {
      if (revisions[`arp${select}`]) {
        setList(revisions[`arp${select}`])
      } else {
        setList([])
      }
    } else {
      setList([])
    }
  }, [props])
  function handleRev (key, data) {
    // setLoading(`${select}_${key}`)
    props.handleState('loading', `${select}_${key}`)
    setSelectRev(key)
    props.handleRev(data)
  }
  async function ShowFetch () {
    if (id) {
      // await setLoading(`back_${select}`)
      props.handleState('loading', `back_${select}`)
      await props.fetchData(id, true)
      await setSelectRev('')
    }
  }
  function FoundThisRevision () {
    let result = list.filter(data => data.thisRevision)
    if (result) {
      result = result[0]
    } else return false
    return result
  }
  if (
    list.length > 1 &&
    props.Permision.handlePermision(role, 'arp_revisions')
  ) {
    return (
      <div className='col-12'>
        <div className='main-revisions'>
          <div className='head-rev row mx-0'>
            <div className='title-rev'>
              <h4>ریویژن‌های پیشین این فرم</h4>
            </div>
            <div className='last-rev'>
              <span className='pointer' onClick={() => ShowFetch()}>
                بازگشت به آخرین ریویژن (
                {FoundThisRevision() ? FoundThisRevision().title : ''})
                {loading === `back_${select}` ? (
                  <Loading className='rev-loading' />
                ) : (
                  <KeyboardBackspaceIcon />
                )}
              </span>
            </div>
          </div>
          <div className='list-rev'>
            <ul className='ltr row mx-0 mb-0'>
              {list.map(
                (data, key) =>
                  !data.thisRevision && (
                    <li
                      className={`col-xl-4 col-lg-4 col-md-6 col-12 my-1 pointer ${
                        selectRev === key ? 'active' : ''
                      }`}
                      key={key}
                      onClick={() => handleRev(key, data)}
                    >
                      {loading === `${select}_${key}` ? (
                        <Loading className='item-rev' />
                      ) : (
                        <KeyboardArrowRightIcon className='mr-1 mb-1' />
                      )}
                      {handleString(data.title)}
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  } else return ''
}
export default Revisions
