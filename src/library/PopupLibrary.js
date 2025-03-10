import React, { useState, useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import ItemPopupLibrary from './ItemPopupLibrary'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
const PopupLibrary = props => {
  const [loading, setLoading] = useState(false)
  const { listStandard, listStandardSelected } = props.state
  useEffect(() => {
    handleAll()
  }, [])
  async function handleSubmit () {
    if (props.FetchData) {
      await setLoading(true)
      let list = await handleList()
      let joinText = await list.join('*')
      let text = await `publisher=${joinText}`
      let obj1 = await {
        textSearch: text,
        testObject: {
          publisher: joinText
        },
        objFiltered: {
          publisher: ['publisher']
        }
      }
      let obj2 = {}
      await list.forEach(item => {
        let _text = `_header_${item}__DARA__publisher`
        obj2[_text] = true
      })
      let merge = { ...obj1, ...obj2 }
      await props.FetchData(`searchByFields=${text}`)
      await props.handleChildState(merge)
      await setLoading(false)
      await props.handleState({
        popupFilter: false
      })
    }
  }
  const length = handleList().length || 0
  function handleAll () {
    let result = {}
    listStandard.forEach(item => {
      result[item.value] = !(length === listStandard.length)
    })
    props.handleState({
      listStandardSelected: result
    })
  }
  function handleList () {
    let array = []
    for (let label in listStandardSelected) {
      let value = listStandardSelected[label]
      if (value) {
        array.push(label)
      }
    }
    return array
  }
  return (
    <div className='backGroundPopup ltr'>
      <div className='col-xl-8 col-lg-10 col-md-12 col-12 mb-2'>
        <div className='box-wellcome'>
          <div className='title-wellcome'>
            <span className='col p-0'>Standard Library</span>
            <CloseIcon
              onClick={() => props.handleState({ popupFilter: false })}
            />
          </div>
          <div className='main-report-popup'>
            <div className='row mx-0 _bt'>
              <div className='item-report orang col-3'>
                <div className='w-100'>
                  <span className='d-block'>
                    247047
                    <span className='_medium'>NO.</span>
                  </span>
                  <label className='mb-0'>Total Standard</label>
                </div>
              </div>
              <div className='item-report blue col-3'>
                <div className='w-100'>
                  <span className='d-block'>
                    62
                    <span className='_medium'>NO.</span>
                  </span>
                  <label className='mb-0'>Total Title</label>
                </div>
              </div>
              <div className='item-report green col-3'>
                <div className='w-100'>
                  <span className='d-block'>
                    150
                    <span className='_medium'>GB</span>
                  </span>
                  <label className='mb-0'>Total Size</label>
                </div>
              </div>
              <div className='item-report red col-3'>
                <div className='w-100'>
                  <span className='d-block'>2022</span>
                  <label className='mb-0'>Last Years Publisher</label>
                </div>
              </div>
            </div>
          </div>
          <div className='main-text main-attention position-relative pt-2'>
            <div className='items-attention'>
              <ul className='row mx-0'>
                {listStandard.map((data, key) => (
                  <ItemPopupLibrary
                    data={data || {}}
                    key={key}
                    _key={key}
                    {...props}
                  />
                ))}
              </ul>
            </div>
            <div className='submit-checkboxes'>
              <button
                className='pointer d-flex align-items-center'
                disabled={length === 0 || loading}
                onClick={handleSubmit}
              >
                اعمال فیلتر
                {loading ? (
                  <Loading className='ml-1 form-loader d-flex align-items-center heigth-1' />
                ) : (
                  <DoneIcon className='ml-1' />
                )}
              </button>
              <button
                className='pointer ml-auto mr-1 multiSelect'
                onClick={handleAll}
              >
                {length === listStandard.length ? 'لغو همه' : 'انتخاب همه'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PopupLibrary
