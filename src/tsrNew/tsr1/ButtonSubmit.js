import React from 'react'
import CancelButton from '../../layout/CancelButton'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../../layout/loading'
import handleCheckText from '../../handleCheckText'
import axios from 'axios'
import handleString from '../../handleString'
import Message from '../../notification/Message'
import Notification from '../../notification/notification'
import StaticData from '../../staticData'
const ButtonSubmit = props => {
  function handleImprovementType() {
    let _array_ = []
    for (let value in props.state) {
      if (value.includes('_improvement_')) {
        let resultValue = props.state[value]
        if (resultValue) {
          let _value = value.replace('_improvement_', '').trim()
          _array_.push(_value)
        }
      }
    }
    return _array_
  }
  function NotTrue() {
    return false
  }
  async function handleSubmit() {
    const { CheckForeign } = props.API
    let func = CheckForeign || NotTrue
    const {
      token,
      subject,
      area,
      operation_unit,
      technical_problem_description,
      execution_cause,
      corrective_suggest,
      foreign_attachments,
      internal_attachments,
      // improvement_type,
      notification_cc,
      machine_no,
      applicant_unit_select,
      unit_boss_select,
      office_boss_select,
      unit_boss,
      office_boss
    } = props.state
    const ImprovementList = await handleImprovementType()
    const check =
      handleCheckText(area) &&
      handleCheckText(subject) &&
      handleCheckText(operation_unit) &&
      handleCheckText(machine_no) &&
      handleCheckText(technical_problem_description) &&
      func() &&
      handleCheckText(applicant_unit_select) &&
      props.handleCheckUnitOffice(unit_boss, unit_boss_select) &&
      props.handleCheckUnitOffice(office_boss, office_boss_select) &&
      ImprovementList.length > 0 &&
      handleCheckText(token)

    if (check) {
      await props.handleState({ loading: 'submit', disabled: true })
      const cc = await Object.keys(notification_cc).map(_c => {
        let _obj = notification_cc[_c]
        return _obj.value
      })
      const datareg = await new FormData()
      await datareg.append('subject', handleString(subject))
      await datareg.append(
        'applicant_unit',
        handleString(applicant_unit_select)
      )
      await datareg.append('area', handleString(area))
      await datareg.append('operation_unit', handleString(operation_unit))
      await datareg.append('machine_no', handleString(machine_no))
      await datareg.append(
        'technical_problem_description',
        handleString(technical_problem_description)
      )
      await datareg.append('execution_cause', handleString(execution_cause))
      await datareg.append(
        'corrective_suggest',
        handleString(corrective_suggest)
      )
      await datareg.append(
        'foreign_attachments',
        JSON.stringify(foreign_attachments)
      )
      await datareg.append(
        'internal_attachments',
        JSON.stringify(internal_attachments)
      )
      await datareg.append('improvement_type', ImprovementList.join(' , '))
      await datareg.append('notification_cc', cc.join(','))
      const url = await `${StaticData.domainIp}/tsr_v1/insert`
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          props.handleState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              props.handleState({ redirect: true, disabled: false })
            }, 5000)
          } else {
            props.handleState({ disabled: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          props.handleState({ disabled: false, loading: '' })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  const parentAPI = props.props.API || {}
  const { handleCancell, CloseComment, GetStatus } = parentAPI
  const myStatus = GetStatus && GetStatus()
  const CancelSubmit = () => {
    if (myStatus === 'comment' && CloseComment) CloseComment()
    else if (handleCancell) handleCancell()
  }
  const { disabled, loading } = props.state
  return (
    <div className='submit-form col-12'>
      <button
        className='mt-3'
        onClick={handleSubmit}
        disabled={disabled}
      >
        {loading === 'submit' ? (
          <Loading className='form-loader' />
        ) : (
          <DoneIcon />
        )}
        ثبت اطلاعات
      </button>
      {myStatus === 'comment' ?
        <CancelButton fn={CancelSubmit} />
        :
        <CancelButton redirect='new-index-TSR' />
      }
    </div>
  )
}
export default ButtonSubmit
