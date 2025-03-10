import React from 'react'
import ManageTab from './ManageTab'
import ImplementedEng from './ImplementedEng'
import ButtonSubmit from './ButtonSubmit'
import Form from '../../Form/Form'
import Dispatch from '../Dispatch/Dispatch'
import TOCC from '../TOCC'
import Sign from '../sign/Sign'
import ButtonEdit from './ButtonEdit'
import CCDisabled from '../CCDisabled'
import BoxText from '../ShowTsr/BoxText'
const SecondLevel = props => {
  const {
    handlCreate,
    ValueTab,
    handleDisabledElmAPI,
    ShowSign,
    handleCheckUpdate,
    Split
  } = props.API
  const { tab } = props.state
  const name = ValueTab()
  const nameDis = `checkBox_${`9${tab}`}_${name}`
  const state1 = !handleDisabledElmAPI()
  const canCreate = handlCreate(9)
  const ShowCreate = state1 && canCreate
  const status = Split()
  const canUpdate = handleCheckUpdate(9)
  const sign_1 = ShowSign() ? true : false
  const sign_2 = handleCheckUpdate(9) ? false : true
  const sign_3 = ShowCreate ? false : true
  const canSign = sign_1 && sign_2 && sign_3
  function handleListForm() {
    const { handleListFormAPI } = props.API
    let result = handleListFormAPI()
    return result
  }
  return (
    <div className='w-100 row mx-0'>
      <ManageTab {...props} />
      <BoxText {...props} id={9} status={status} />
      <Dispatch
        canCreate={canCreate}
        {...props}
        filter1='user_unit'
        filter2='تعمیرات_SD_برق_SD_ابزاردقیق_SD_مکانیک ثابت_SD_برنامه ریزی_SD_سرویس های تعمیراتی_SD_مکانیک دوار_SD_تجهیزات حساس_SD_پایش وضعیت CM'
        nameDis={nameDis}
        nameTab={name}
      />
      <ImplementedEng {...props} />
      <Form {...props} itemForm={handleListForm()} />
      {ShowCreate && <TOCC {...props} multiTab={tab} nameCC={name} />}
      {ShowCreate && <ButtonSubmit {...props} />}
      {canUpdate && <ButtonEdit {...props} />}
      {canSign && <Sign {...props} multiTab={tab} status={status} />}
      <CCDisabled {...props} nameCC={`${name}_notification_cc_info`} />
    </div>
  )
}
export default SecondLevel
