import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleString from '../../../handleString'
const ItemImprovementType = props => {
  let list = props.dataItem || []
  const { handleCheckboxImprovement , handleCheckOther} = props.API

  // let { improvement_type } = props.data
  // let totalText = handleString(improvement_type)
  return (
    <tr>
      {list.map((item, index) => (
        <td className='tableTikBox' key={index}>
          <span className='_tikbox'>
            {handleCheckboxImprovement(handleString(item.value)) ? (
              <CheckBoxRoundedIcon />
            ) : (
              <CheckBoxOutlineBlankRoundedIcon />
            )}
          </span>
          {handleString(item.value)}
        </td>
      ))}
      {props._key === 4 && (
        <td className='tableTikBox'>
          <span className='_tikbox'>
            {handleCheckOther(list) ? (
              <CheckBoxRoundedIcon />
            ) : (
              <CheckBoxOutlineBlankRoundedIcon />
            )}
          </span>
          سایر موارد
        </td>
      )}
    </tr>
  )
}
export default ItemImprovementType
