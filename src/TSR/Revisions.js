import React, { useState, useEffect } from 'react'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Loading from '../layout/loading'

function Revisions (props) {
  const [list, setList] = useState([])
  const [selectRev, setSelectRev] = useState('')
  // const [loading, setLoading] = useState('')
  useEffect(() => {
    props.GetReset(() => setSelectRev(''))
    if (props.state.revisions) {
      if (props.state.revisions[`tsr${props.state.select}`]) {
        setList(props.state.revisions[`tsr${props.state.select}`])
      } else {
        setList([])
      }
    } else {
      setList([])
    }
  }, [props])
  function handleRev (key, data) {
    // setLoading(`${props.state.select}_${key}`)
    props.handleState('loading', `${props.state.select}_${key}`)
    setSelectRev(key)
    props.handleRev(data)
  }
  async function ShowFetch () {
    if (props.state.id) {
      // await setLoading(`back_${props.state.select}`)
      props.handleState('loading', `back_${props.state.select}`)
      await props.fetchData(props.state.id, true)
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
    props.Permision.handlePermision(props.state.role, 'tsr_revisions')
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
                {props.state.loading === `back_${props.state.select}` ? (
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
                      {props.state.loading ===
                      `${props.state.select}_${key}` ? (
                        <Loading className='item-rev' />
                      ) : (
                        <KeyboardArrowRightIcon className='mr-1 mb-1' />
                      )}
                      {data.title}
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
