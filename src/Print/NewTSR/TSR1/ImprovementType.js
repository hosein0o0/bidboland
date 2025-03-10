import React from 'react'
import Static from '../StaticList/static'
import ItemImprovementType from './ItemImprovementType'
const ImprovementType = props => {
  let list = Static.improvementType || []
  return (
    <div className='conti'>
      <span className='conti_span'>نوع بهبود</span>
      <table>
        <tbody>
          {list.map(
            (data, key) =>
              data.value !== 'سایر موارد' && (
                <ItemImprovementType
                  {...props}
                  dataItem={data}
                  key={key}
                  _key={key}
                />
              )
          )}
        </tbody>
      </table>
    </div>
  )
}
export default ImprovementType
