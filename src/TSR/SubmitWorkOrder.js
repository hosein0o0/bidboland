import React from 'react'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import StaticData from '../staticData'
import CancelButton from '../layout/CancelButton'
import getCustomFormat from '../getCustomFormat'
function SubmitWorkOrder (props) {
  async function handleSubmit () {
    const list = ['mechanical', 'electrical', 'Instrumentation', 'building']
    let {
      purchase_packages,
      listSign,
      notification_to,
      notification_cc
    } = props.state
    // const checkInternal = Internal()
    const CheckTo = notification_to
      ? notification_to.length === listSign.length && notification_to.length > 0
      : false
    const _check = props.handleCheckTypeWork() && CheckTo
    if (_check) {
      await props.handleState('loading', 'submit')
      await props.handleState('disabled', true)
      let datareg = await new FormData()
      let json = await {}
      json['tsr_id'] = props.props.state.id
      let To = Object.keys(notification_to).map(toData => {
        return notification_to[toData].value
      })
      notification_cc = notification_cc ? notification_cc : []
      let CC = Object.keys(notification_cc).map(toData => {
        return notification_cc[toData].value
      })
      await datareg.append('tsr_id', props.props.state.id)
      await list.forEach(async nameState => {
        let parentState = props.state[nameState]
        if (parentState) {
          Object.keys(parentState).map(async state => {
            if (parentState[state]) {
              parentState[state] = Object.keys(parentState[state]).map(item => {
                if (state === 'foreign_attachments') {
                  parentState[state][item].Attachement = Object.assign(
                    {},
                    parentState[state][item].Attachement
                  )
                } else if (state === 'eng_instruction') {
                  if (
                    parentState[state][item].executionTime &&
                    typeof parentState[state][item].executionTime !== 'string'
                  ) {
                    parentState[state][item].executionTime = getCustomFormat(
                      parentState[state][item].executionTime,
                      false
                    )
                  }
                }
                return parentState[state][item]
              })
            }

            json[`${nameState}_${state}`] = Object.assign(
              {},
              parentState[state]
            )
            await datareg.append(
              `${nameState}_${state}`,
              JSON.stringify(Object.assign({}, parentState[state]))
            )
          })
        }
      })
      if (purchase_packages) {
        purchase_packages = await Object.assign(
          {},
          Object.keys(purchase_packages).map(pack => {
            purchase_packages[pack].date = getCustomFormat(
              purchase_packages[pack].date,
              false
            )
            return purchase_packages[pack]
          })
        )
      }
      json['purchase_packages'] = purchase_packages
      await datareg.append(
        'purchase_packages',
        JSON.stringify(purchase_packages)
      )
      await datareg.append('notification_to', To.join(','))
      await datareg.append('notification_cc', CC.join(','))
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/tsr/tsr7/insert`,
        data: datareg,
        headers: {
          Authorization: `Bearer ${
            props.state.token ? props.state.token : null
          }`
        }
      })
        .then(async response => {
          props.handleState('loading', '')
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              props.handleState('redirect', true)
              props.handleState('disabled', false)
            }, 5000)
          } else {
            props.handleState('disabled', false)
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          props.handleState('loading', '')
          props.handleState('redirect', false)
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  // function Internal () {
  //   const list = ['mechanical', 'electrical', 'Instrumentation', 'building']
  //   let i = 0
  //   let check = false
  //   while (i < list.length) {
  //     let obj = list[i]
  //     let array = props.state[obj].internal_attachments
  //     check = props.props.Internalَttachments(array)
  //     if (check) {
  //       break
  //     }
  //     i++
  //   }
  //   return check
  // }
  // function Foreign () {

  // }
  return (
    <div className='submit-form col-12'>
      <button onClick={handleSubmit} disabled={props.state.disabled}>
        {props.state.loading === 'submit' ? (
          <Loading className='form-loader' />
        ) : (
          <DoneIcon />
        )}
        ثبت اطلاعات
      </button>
      <CancelButton redirect='index-TSR' />
    </div>
  )
}
export default SubmitWorkOrder
