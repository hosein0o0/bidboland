import React, { useEffect, useRef } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import BoxVpis from './BoxVpis'
const ActionBuildersEngineering = props => {
  const handlePermision = props.Permision.handlePermision
  let { role, selectNumber } = props.state
  const { _key, data } = props
  const actionElm = useRef()
  useEffect(() => {
    if (actionElm) {
      let elm = actionElm.current
      let name = `_action_${_key}`
      props.handleRefs(name, elm)
    }
  }, [])
  return (
    <td className='action justify-content-center' ref={actionElm}>
      {handlePermision(role, 'builders_engineering_edit') && (
        <a href={`/edit-builders-engineering-${data.id}`}>
          <span className='edit'>
            <EditIcon />
          </span>
        </a>
      )}
      <span className='more' onClick={() => props.GetMore(_key, data)}>
        <MoreVertRoundedIcon />
      </span>
      {selectNumber === _key && <BoxVpis {...props} _key={_key} />}
    </td>
  )
}
export default ActionBuildersEngineering
