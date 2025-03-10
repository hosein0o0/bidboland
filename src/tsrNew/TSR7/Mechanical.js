import React from 'react'
import Form from '../../Form/Form'
import TOCC from '../TOCC'
import Dispatch from '../Dispatch/Dispatch'
import Sign from '../sign/Sign'
const Mechanical = props => {
  let { tab } = props.state
  let { handlCreate, handleSwitchName, ShowSign, Split } = props.API
  const canCreate = handlCreate(7),
    canSign = ShowSign()
  let name = handleSwitchName()
  const canCreateSubmit = !props.handleDisabledElm() && canCreate
  const status = Split()
  return (
    <React.Fragment>
      <Dispatch
        canCreate={true}
        {...props}
        filter1='user_unit'
        filter2='مهندسی عمومی و پروژه ها'
        nameDis={`checkBox_${71}_${name}`}
        nameTab={name}
        except={true}
      />
      <Form {...props} itemForm={props.handleListForm()} />
      {canCreateSubmit && <TOCC {...props} multiTab={tab} nameCC={name} />}
      {canSign && <Sign {...props} multiTab={tab} status={status} />}
    </React.Fragment>
  )
}
export default Mechanical
