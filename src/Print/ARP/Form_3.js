import React, { useEffect, useState } from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import Head from './head'
import Sign from './sign'
const Form_2 = props => {
  const [data, setData] = useState(null)
  useEffect(() => {
    setData(props.state)
  }, [props])
  function handleCheck (name) {
    if (data) {
      if (data[name]) {
        return data[name]
      } else return ''
    } else return ''
  }
  function handleShow (_array) {
    let List = []
    _array.forEach((element, _index) => {
      List.push(
        <td className='tableTikBox' key={_index}>
          {element.label}
          <span className='_tikbox float-left'>
            {handleCheckBox(element) ? (
              <CheckBoxRoundedIcon />
            ) : (
              <CheckBoxOutlineBlankRoundedIcon />
            )}
          </span>
        </td>
      )
    })
    return List
  }
  function handleCheckBox (_data) {
    if (event_reasons) {
      let _array = event_reasons.split(',')
      const _check = _array.includes(_data.value)
      return _check
    }
    return false
  }
  function CheckOther () {
    let _array = event_reasons ? event_reasons.split(',') : []
    let list = []
    reasonsAccident.forEach(_item => {
      _item.forEach(_item2 => {
        list.push(_item2.value)
      })
    })
    let filter = _array.filter(_value => !list.includes(_value))
    const other = filter.length > 0
    return {
      check: other,
      list: filter
    }
  }
  const { reasonsAccident, event_reasons } = props.state
  return (
    <page className='portrate' id='arp_3'>
      <Head
        {...props}
        handleCheck={handleCheck}
        label='گزارش رویداد (حادثه و شبه حادثه فرایندی)'
        certificate_number='PGBGT-GE-FO-002'
        peyvast={false}
        discipline={true}
      />
      <div className='__MainData'>
        <table>
          <thead>
            <tr style={{height : '9mm'}}>
              <th className='_title hss'>دلایل بروز حادثه</th>
            </tr>
          </thead>
        </table>
        <table>
          <tbody>
            {reasonsAccident.map((_data, key) => (
              <tr className='hss' key={key}>
                {handleShow(_data)}
              </tr>
            ))}
            {CheckOther().check ? (
              <tr className='hss'>
                <td className='tableTikBox' colSpan={3}>
                  سایر موارد
                  <span className='_tikbox mx-1'>
                    <CheckBoxRoundedIcon />
                  </span>
                  ({CheckOther().list.join(' ، ')})
                </td>
              </tr>
            ) : (
              ''
            )}
          </tbody>
        </table>
        <table>
          <tbody>
            <tr className='_hll'>
              <td
                className='no_BB'
                style={{ verticalAlign: 'top', paddingTop: '2mm' }}
              >
                <span>
                  <span className='b'> شرح رویداد با جزئیات </span>
                  (پیش از وقوع رویداد چه فعالیتی در حال انجام بود؟)
                </span>
                <p className='value' id='event_description'>
                  {handleCheck('event_description')}
                </p>
              </td>
            </tr>
            <tr className='_hll'>
              <td
                className='no_BB'
                style={{ verticalAlign: 'top', paddingTop: '2mm' }}
              >
                <span>
                  <span className='b'>
                    پیش از وقوع رویداد چه دستورالعمل و مقرراتی (ایمنی و
                    بهره‌برداری) در انجام فعالیت میبایست اجرا میگردید؟
                  </span>
                </span>
                <p className='value' id='event_before_instructions'>
                  {handleCheck('event_before_instructions')}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='conti'>
        <table className='end'>
          <tbody>
            <tr style={{ height: '35mm' }}>
              <Sign
                {...props}
                label='دبیر کمیته'
                detail='secretary_committee_info'
                date='secretary_committee_verify_at'
                checksign='author'
              />
              <Sign
                {...props}
                label='نماینده خدمات فنی'
                detail='technical_agent_arp3_info'
                date='technical_agent_arp3_verify_at'
                checksign='technical_agent_arp3_verify'
              />
              <Sign
                {...props}
                label='نماینده بهره برداری'
                detail='operation_agent_arp3_info'
                date='operation_agent_arp3_verify_at'
                checksign='operation_agent_arp3_verify'
              />
              <Sign
                {...props}
                label='نماینده تعمیرات'
                detail='repair_agent_arp3_info'
                date='repair_agent_arp3_verify_at'
                checksign='repair_agent_arp3_verify'
              />
              <Sign
                {...props}
                label='نماینده HSE'
                detail='hse_agent_arp3_info'
                date='hse_agent_arp3_verify_at'
                checksign='hse_agent_arp3_verify'
              />
            </tr>
          </tbody>
        </table>
      </div>
    </page>
  )
}
export default Form_2
