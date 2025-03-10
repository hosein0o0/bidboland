import React from 'react'
import Form from '../../Form/Form'
import TOCC from '../TOCC'
import Dispatch from '../Dispatch/Dispatch'
import Sign from '../sign/Sign'
const Instrument = props => {
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
        {...props}
        filter1='user_unit'
        filter2='مهندسی عمومی و پروژه ها'
        nameDis={`checkBox_${73}_${name}`}
        nameTab={name}
        canCreate={true}
        except={true}
      />
      <Form {...props} itemForm={props.handleListForm()} />
      {canCreateSubmit && <TOCC {...props} multiTab={tab} nameCC={name} />}
      {canSign && <Sign {...props} multiTab={tab} status={status} />}
    </React.Fragment>
  )
}
export default Instrument
