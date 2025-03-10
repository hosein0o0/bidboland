import React, { useState, useEffect } from 'react'
function BreadCrumbs (props) {
  const [breadList, setBreadList] = useState(null)
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [secondData, setSecondData] = useState(null)
  const [thirdData, setThirdData] = useState(null)
  useEffect(() => {
    checkLoad()
  }, [props])
  function checkLoad () {
    if (props.state.breadList) {
      setUrl(props.state.url)
      setBreadList(props.state.breadList)
      if (!props.state.breadList.items) {
        setTitle(props.state.breadList.name)
      } else {
        SecondItem(props.state.breadList.items)
      }
    }
  }
  function SecondItem (list) {
    if (list) {
      list.forEach(data => {
        let nameRole = data.nameRole
        let nameUrl = props.props.nameRole
        if (nameRole && nameUrl) {
          if (nameRole.includes(nameUrl)) {
            setSecondData(data)
            if (!data.items) {
              setTitle(data.ChName)
            } else {
              ThirdItems(data.items)
            }
          }
        }
      })
    }
  }
  function ThirdItems (list) {
    list.forEach(data => {
      if (data.path === `/${url}`) {
        setTitle(data.ChName)
        setThirdData(data)
      }
    })
  }
  if (breadList) {
    return (
      <div className='col-xl-3 col-lg-3'>
        <div className='address-link'>
          <div className='w-100'>
            <h2 className='title'>{title}</h2>
            <div className='links'>
              <ul>
                {breadList.path ? (
                  <li className={!breadList.items ? 'active' : ''}>
                    <a href={breadList.path ? breadList.path : '/Home'}>
                      {breadList.name}
                    </a>
                  </li>
                ) : (
                  <li className={`${!breadList.items ? 'active' : ''} no-link`}>
                    {breadList.name}
                  </li>
                )}
                {secondData !== null && secondData ? (
                  secondData.path ? (
                    <li className={!secondData.items ? 'active' : ''}>
                      <a href={secondData.path ? secondData.path : '/Home'}>
                        {secondData.ChName}
                      </a>
                    </li>
                  ) : (
                    <li
                      className={`${!secondData.items ? 'active' : ''} no-link`}
                    >
                      {secondData.ChName}
                    </li>
                  )
                ) : (
                  ''
                )}
                {thirdData !== null && thirdData ? (
                  thirdData.path ? (
                    <li className={!thirdData.items ? 'active' : ''}>
                      {thirdData.ChName}
                    </li>
                  ) : (
                    <li
                      className={`${!thirdData.items ? 'active' : ''} no-link`}
                    >
                      {thirdData.ChName}
                    </li>
                  )
                ) : (
                  ''
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  } else return ''
}
export default BreadCrumbs
