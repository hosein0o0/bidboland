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
const ButtonEdit = props => {
  const { disabled, loading } = props.state
  function handleImprovementType () {
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
  function NotTrue () {
    return false
  }
  async function handleEdit () {
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
      machine_no,
      id
    } = props.state
    const { CheckForeign } = props.API
    let func = CheckForeign || NotTrue
    const ImprovementList = await handleImprovementType()
    const check =
      handleCheckText(area) &&
      handleCheckText(subject) &&
      handleCheckText(operation_unit) &&
      handleCheckText(machine_no) &&
      handleCheckText(technical_problem_description) &&
      func() &&
      ImprovementList.length > 0 &&
      handleCheckText(token)
    if (check) {
      let url = `${StaticData.domainIp}/tsr_v1/tsr1Update/${id}`
      await props.handleState({ loading: 'submit', disabled: true })
      const datareg = await new FormData()
      await datareg.append('subject', handleString(subject))
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
              window.location.reload(true)
              // props.handleState({ redirect: false, disabled: false })
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
  const CancelSubmit = () => {
    const { handleCancell, CloseComment, GetStatus } = props.props.API
    const myStatus = GetStatus()
    if (myStatus === 'comment') CloseComment()
    else handleCancell()
  }
  return (
    <div className='submit-form col-12'>
      <button className='mt-3 edit' onClick={handleEdit} disabled={disabled}>
        {loading === 'submit' ? (
          <Loading className='form-loader' />
        ) : (
          <DoneIcon />
        )}
        ویرایش اطلاعات
      </button>
      <CancelButton fn={CancelSubmit} />
    </div>
  )
}
export default ButtonEdit
