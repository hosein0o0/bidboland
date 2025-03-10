import React from 'react'
import ItemSign from './ItemSign'
import ListSign from './ListSign'
const Sign = props => {
  let nameList = props.numTab
    ? `TSR${props.id}_${props.numTab}`
    : `TSR${props.id}`
  let list = ListSign[nameList] || []
  let dataSend = props.state[`tsr${props.id}`] || {}
  return (
    <div className='conti __sign'>
      <table className='end'>
        <tbody>
          <tr className='he35'>
            {list.map((data, key) => (
              <ItemSign data={data} key={key} _key={key} dataSend={dataSend} />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default Sign
