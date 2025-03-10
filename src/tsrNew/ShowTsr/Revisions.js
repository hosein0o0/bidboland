import React, { useState, useEffect } from 'react'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Loading from '../../layout/loading'
import handleString from '../../handleString'
import StaticData from '../../staticData'
import handleCheckText from '../../handleCheckText'

function Revisions(props) {
  const [list, setList] = useState([])
  const [endList, setEndList] = useState([])
  const { handleState, API, state } = props
  let { select, revisions, selectRev, loading } = state
  // const { handlePermision } = props.Permision
  useEffect(() => {
    revisions = revisions || {}
    if (revisions) {
      filterList()
    }
  }, [props])
  // useEffect(async () => {
  //   await handleEndRev(`back_${select}`, false)
  // }, [select])
  function handleList(_newList) {
    let length = _newList.length
    let end = length - 1
    let newArray = _newList
    let _endList = [newArray[end]] || []
    let filter = _newList.filter((data, key) => data && key !== length - 1)
    return { filter, _endList }
  }
  function filterList() {
    let nameTsr = `tsr${select}`
    let _newList = revisions[nameTsr] || []
    let { filter, _endList } = handleList(_newList)
    setList(filter)
    setEndList(_endList)
  }
  async function handleRev(key, data, nameLoading = null) {
    let valueLoading = nameLoading || `${select}_${key}`
    let { id } = await data
    let page = state.select.toString(),
      tsr_id = state.id
    const check =
      handleCheckText(id) && handleCheckText(page) && handleCheckText(tsr_id)
    if (check) {
      let url = await `${StaticData.domainIp}/tsr_v1/getRevisionDetail/${page}/tsr/${tsr_id}/id/${id}`
      await handleState({
        loading: valueLoading,
        selectRev: nameLoading ? '' : `rev_${key}_${select}`
      })
      const { handleRevision } = API
      await handleRevision(url)
    }
  }
  async function handleEndRev(name, load) {
    const { fetchData } = await props.API.data
    if (fetchData) {
      await handleState({
        loading: load ? name : ''
      })
      await fetchData('endrev')
    }
  }
  let check = list.length > 0
  if (check) {
    return (
      <div className='col-12'>
        <div className='main-revisions'>
          <div className='head-rev row mx-0'>
            <div className='title-rev'>
              <h4>ریویژن‌های پیشین این فرم</h4>
            </div>
            {endList.map((item, index) => (
              <div className='last-rev' key={index}>
                <span
                  className='pointer'
                  // onClick={() => handleRev(index, item, `back_${select}`)}
                  onClick={() => handleEndRev(`back_${select}`, true)}
                >
                  بازگشت به آخرین ریویژن ({handleString(item.title)})
                  {loading === `back_${select}` ? (
                    <Loading className='rev-loading align-items-center' />
                  ) : (
                    <KeyboardBackspaceIcon />
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className='list-rev'>
            <ul className='ltr row mx-0 mb-0'>
              {list.map((data, key) => (
                <li
                  className={`col-xl-4 col-lg-4 col-md-6 col-12 my-1 pointer no-user-select ${selectRev === `rev_${key}_${select}` ? 'active' : ''
                    }`}
                  key={key}
                  onClick={() => handleRev(key, data)}
                >
                  {loading === `${select}_${key}` ? (
                    <Loading className='item-rev align-items-center' />
                  ) : (
                    <KeyboardArrowRightIcon className='mr-1 mb-1' />
                  )}
                  {handleString(data.title)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  } else return ''
}
export default Revisions
