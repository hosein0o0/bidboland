import React, { useState, useEffect, useRef } from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Loading from '../layout/loading'
// import handleCheckText from '../handleCheckText'
import CheckPersianText from '../CheckPersianText'
import handleString from '../handleString'
function AdvanceSearch(props) {
  const Elm = useRef(null)
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  let [page, setPage] = useState(1)
  const parentData = props.data || {}
  let state = props.state || {}
  useEffect(
    () => {
      // handlecheckTik()
      if (state.list) {
        let length = state.list.length
        let count = length / 10
        if (count > 0) {
          setPage(parseInt(count))
        }
        setList(state.list)
      }
    },
    handleEffect() ? [props] : []
  )
  async function handleChange(checked, data) {
    if (!handleLoading()) {
      let name = await `_header_${data}__DARA__${parentData.value}`
      await props.handleSelect(checked, name)
    }
  }
  function handleEffect() {
    if (props.bigSearch || props.newSearch) {
      return true
    }
    return false
  }
  async function handleFilter(e) {
    await setSearch(handleString(e.target.value))
    if (handleEffect()) {
      props.handleState({
        pageAdvance: 1,
        loading: 'advance',
        page: 1
      })
      props.handleSearchAdvance(handleString(e.target.value))
    } else {
      let filter = await state.list.filter(
        data =>
          data.toUpperCase().includes(
            handleString(e.target.value)
              .trim()
              .toUpperCase()
          ) ||
          data.toLowerCase().includes(
            handleString(e.target.value)
              .trim()
              .toLowerCase()
          )
      )
      await setList(filter)
    }
  }
  function handlecheck(name) {
    // if (name) {
    let result = ''
    name = name ? handleString(name) : '-'
    switch (name) {
      case 'create':
      case 'sign':
      case 'update':
        if (parentData.verified === '0') {
          result = 'بسته شده'
          break
        }
      case 'no':
        result = 'ندارد'
        break
      case 'yes':
        result = 'دارد'
        break
      case 'in':
        result = 'وارده'
        break
      case 'out':
        result = 'صادره'
        break
      case 'create':
        result = 'ساخت'
        break
      case 'sign':
        result = 'امضا'
        break
      case 'update':
        result = 'ویرایش'
        break
      case 'close':
        result = 'بسته شده'
        break
      case 'complete':
        result = 'به اتمام رسیده'
        break
      default:
        result = handleString(name)
    }
    return result
  }
  function handleClassName() {
    switch (props.index) {
      case 0:
        return props.rtl ? 'end' : 'first'
      case state.header.length - 1:
        return !props.rtl ? 'end' : 'first'
      default:
        return ''
    }
  }
  function CheckRow(name) {
    if (state.header[props.index].check) {
      if (name.length >= 4) {
        return true
      } else return false
    } else {
      return true
    }
  }
  function CheckFiltered() {
    const list = state.list ? state.list : []
    let i = 0
    let result = false
    while (i < list.length) {
      let _value = list[i]
      let name = `_header_${_value}__DARA__${parentData.value}`
      result = state[name]
      if (result) {
        break
      }
      i++
    }
    return result
  }
  async function handleSubmit() {
    const objFiltered = state.objFiltered ? state.objFiltered : {}
    if (!state.loading) {
      objFiltered[parentData.value] = await []
      let _list = await objFiltered[parentData.value]
      if (CheckFiltered()) {
        await _list.push(parentData.value)
      }
      await props.handleSelect(objFiltered, 'objFiltered')
      await props.handleActions(parentData)
    }
  }
  function handleLoading() {
    const result = state.loading === 'advance' && handleEffect()
    return result
  }
  function Moredata() {
    if (props.bigSearch) {
      if (state.list.length < state.totalAdvance) {
        page++
        setPage(page)
        setTimeout(async () => {
          props.handleSelect(page, 'pageAdvance')
          if (search !== '') {
            props.handleSearchAdvance(search)
          } else {
            props._handleClick(props.index, parentData, true)
          }
        }, 100)
      }
    } else if (props.newSearch) {
      if (!handleLoading()) {
        let array = state.list
        if (state.count > array.length) {
          page++
          setPage(page)
          props.handleState('advancePage', page)
          props.handleState('loading', 'advance')
          setTimeout(() => {
            props._handleClick(props.index, parentData, true)
          }, 100)
        }
      }
    }
  }
  function FullSelect() {
    list.forEach(async data => {
      let name = await `_header_${data}__DARA__${parentData.value}`
      await props.handleSelect(!CheckFull(), name)
    })
  }
  function CheckFull() {
    let result = false
    let i = 0
    while (i < list.length) {
      let data = list[i]
      let name = `_header_${data}__DARA__${parentData.value}`
      result = state[name] ? true : false
      if (!result) {
        break
      }
      i++
    }
    return result
  }
  function handleShowIcon() {
    let i = 0,
      array = []
    while (i < list.length) {
      let data = list[i]
      let name = `_header_${data}__DARA__${parentData.value}`
      let value = state[name] ? true : false
      if (value) {
        array.push(name)
      }
      i++
    }
    switch (array.length) {
      case 0:
        return <CheckBoxOutlineBlankRoundedIcon />
      case list.length:
        return <CheckBoxRoundedIcon />
      default:
        return <IndeterminateCheckBoxRoundedIcon />
    }
  }
  const ShowMore = state.list.length < state.totalAdvance && handleEffect()
  return (
    <section
      className={`box-customization ${handleClassName()} ${props ? 'mr-0' : 'ml-0'
        }`}
    >
      <section className='search-box'>
        <input
          className={`${CheckPersianText(handleString(search)) ? 'text-right rtl' : 'text-left ltr'} IranSans_Medium_FA`}
          placeholder='search...'
          value={handleString(search)}
          onChange={handleFilter}
          onPaste={handleFilter}
        />
      </section>
      <section className={`main-field-box position-relative`} ref={Elm}>
        {list.length === 0 && !state.loading ? (
          <span className='notFound'>موردی یافت نشد</span>
        ) : (
          <React.Fragment>
            {!handleLoading() && list && list.length > 0 ? (
              <section className='field-box mt-1 mb-1 _fixed'>
                <label htmlFor='_full'>
                  <input
                    type='checkbox'
                    className='d-none'
                    onChange={FullSelect}
                    id='_full'
                  />
                  {handleShowIcon()}
                  <span>انتخاب همه</span>
                </label>
              </section>
            ) : (
              ''
            )}
            {list.map((data, key) =>
              data !== '' && data && CheckRow(data) ? (
                <section className='field-box mt-1 mb-1' key={key}>
                  <label htmlFor={`${key}__${data}`}>
                    {handleLoading() ? (
                      ''
                    ) : (
                      <input
                        type='checkbox'
                        className='d-none'
                        id={`${key}__${data}`}
                        onChange={e => handleChange(e.target.checked, data)}
                        checked={
                          state[`_header_${data}__DARA__${parentData.value}`]
                            ? true
                            : false
                        }
                      />
                    )}
                    {state[`_header_${data}__DARA__${parentData.value}`] ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                    <span>{handleString(handlecheck(data))}</span>
                  </label>
                </section>
              ) : (
                ''
              )
            )}
          </React.Fragment>
        )}
        {ShowMore || handleLoading() ? (
          <section className='more-field-advance'>
            <button
              onClick={Moredata}
              className={handleLoading() ? 'loading' : ''}
            >
              {handleLoading() ? (
                <React.Fragment>
                  <Loading className='form-loader advance ml-1' /> درحال
                  بارگزاری اطلاعات
                </React.Fragment>
              ) : (
                <MoreHorizIcon />
              )}
            </button>
          </section>
        ) : (
          ''
        )}
      </section>
      <section className='submit-search rtl'>
        <button onClick={handleSubmit} disabled={handleLoading()}>
          اعمال
        </button>
      </section>
    </section>
  )
}
export default AdvanceSearch
