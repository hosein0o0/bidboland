import React, { useRef, useEffect } from 'react'
import handleCheckText from '../handleCheckText'
// import StaticData from '../staticData'
// import OutputFilter from './OutputFilter'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
// import CheckPersianText from '../CheckPersianText'
import handleString from '../handleString'
import API from './API'
import OutputCorrective from '../ARP/outputCorrective'
const FooterTable = props => {
  const fns = new API(props)
  const { ManageDownloadFile } = fns
  let {
    row,
    search,
    loading,
    role,
    // textSearch,
    totalLength,
    contentPerPage,
    page,
    pageNumber,
    length,
    testObject,
    objFiltered
  } = props.state
  const parentProps = props.props
  const parentState = parentProps.state || {}
  const parentSearch = parentState.search
  let finalSearch = handleString(parentSearch || search)
  row = row || []
  const contentPerPageElm = useRef()
  const pageElm = useRef()
  useEffect(() => {
    handleRefs('contentPerPage', contentPerPageElm.current)
    handleRefs('page', pageElm.current)
  }, [])
  function handleRefs(name, elm) {
    props.handleRefs(name, elm)
  }
  const CheckShow = (name1, name2) => {
    let state1 = props.Permision.handlePermision(role, name1)
    let state2 = handleCheckText(name2)
    let result = state1 && state2
    return result
  }
  function FoundNmae(header, value) {
    let filter = header.filter(head => head.value === value) || []
    let result = filter[0] || {}
    const { name } = result
    return name
  }
  function handleFiltered() {
    let { testObject, header } = props.state
    let convert = Object.keys(testObject).map(value => {
      let label = handleString(testObject[value])
      let array = label.split('*')
      let resultLabel = array.join(',')
      let name = FoundNmae(header, value)
      let obj = {
        value,
        name: handleCheckText(name) ? name : value,
        label: resultLabel
      }
      return obj
    })
    return convert
  }
  async function handleEditFilter(data) {
    let state = props.state || {}
    await props.handleState({
      loading: 'table'
    })
    for (let value in state) {
      if (value.includes('_header_')) {
        if (value.includes(data.value)) {
          state[value] = await false
        }
      }
    }
    let ListText = [],
      dbNameList = [],
      text = '',
      objfil = objFiltered || {}
    let newJson = testObject || {}
    await delete newJson[data.value]
    await delete objfil[data.value]
    for (let txt in newJson) {
      await dbNameList.push(txt)
      let _text = await `${txt}=${encodeURIComponent(newJson[txt])}`
      await ListText.push(_text)
    }
    dbNameList = await [...new Set(dbNameList)]
    text = await `${ListText.join('|$')}`
    let secondObj = await {
      textSearch: text,
      testObject: newJson,
      loading: 'table',
      objFiltered: objfil,
      page: 1,
      contentPerPage: 25,
      pageAdvance: 1,
      totalAdvance: 0
      // _listData_: list
    }
    let merge = await { ...state, ...secondObj }
    await props.handleState(merge)
    await props.fetchData(
      handleCheckText(text) ? `searchByFields=${text}` : null
    )
  }
  let state1Class = row.length === 0 && !handleCheckText(finalSearch)
  let state2Class = loading === 'table'
  const resultClass = state1Class || state2Class
  const listFilter = handleFiltered()
  const myProps = { ...fns, ...props }
  return (
    <div
      className={`footer-table row mr-0 ml-0 w-100 ${resultClass ? 'd-none' : ''
        }`}
    >
      <div className='col-xl-4 col-lg-4 col-md-12 col-12 d-flex align-items-center'>
        <div className='link-footer'>
          {CheckShow(props.xlsName, props.xls) && (
            <button
              onClick={() => ManageDownloadFile(props.xls)}
              className='pointer xls'
            >
              <img src='/img/XLS.svg' alt='xls' /> خروجی اکسل
            </button>
          )}
          {CheckShow(props.pdfName, props.pdf) && (
            <button
              onClick={() => ManageDownloadFile(props.pdf)}
              className='pointer pdf'
            >
              <img src='/img/PDF.svg' alt='PDF' />
              خروجی pdf
            </button>
          )}
          {props.corrective &&
            <OutputCorrective {...myProps} />
          }
        </div>
      </div>
      <div className='col-xl-8 col-lg-8 col-md-12 col-12 align-items-center row m-0 justify-content-end'>
        <div className='main-item-footer'>
          <div className='item num-row'>
            <label>تعداد ردیف در هر صفحه :</label>
            <select
              name='contentPerPage'
              ref={contentPerPageElm}
              onChange={e => props.changeRowNumber(e)}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className='item'>
            <label>
              آیتم
              {totalLength < contentPerPage * page
                ? ` ${totalLength} `
                : ` ${contentPerPage * page} `}
              از
              {length}
              {` ${totalLength} `}- صفحه
            </label>
            <select
              ref={pageElm}
              name='page'
              onChange={e => props.changeRowNumber(e)}
            >
              {props.handleNumberPage()}
            </select>
            <label>از {pageNumber}</label>
          </div>
          <div className='item arrow'>
            <button onClick={() => props.handleClick('right')}>
              <ChevronRightIcon />
            </button>
            <button onClick={() => props.handleClick('left')}>
              <ChevronLeftIcon />
            </button>
          </div>
        </div>
      </div>
      {listFilter.length > 0 && (
        <div className='col-12'>
          <div className='list-filter row mx-0 justify-content-start ltr'>
            {listFilter.map((data, key) => (
              <span key={key} className={`box-filter my-1 ltr ml-2`}>
                <CloseRoundedIcon
                  className='pointer'
                  onClick={() => handleEditFilter(data)}
                />
                {handleString(data.name)}:
                <span className='label_value'>{handleString(data.label)}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default FooterTable
