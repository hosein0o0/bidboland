import React, { useEffect, useState } from 'react'
import Head from './head'
import Sign from './sign'
const Form_3 = props => {
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
  function CheckList (name) {
    let array = []
    if (data) {
      let _array = data[name]
      if (_array.length) {
        array = _array
      }
    }
    return array
  }
  function handleLink (name) {
    let array = props.state[name] ? props.state[name] : []
    const list = []
    array.forEach((_data, key) =>
      list.push(
        <React.Fragment>
          <span className='_link' key={key}>
            <a href={_data}>{_data}</a>
          </span>
          {key < array.length - 1 ? ` & ` : ''}
        </React.Fragment>
      )
    )
    return list
  }
  function CheckPeyvast () {
    const { document_link_arp4 } = props.state
    const check = document_link_arp4 ? document_link_arp4.length > 0 : false
    return check
  }
  return (
    <page className='portrate' id='arp_4'>
      <Head
        {...props}
        handleCheck={handleCheck}
        label='اقدامات اصلاحی جهت جلوگیری از حوادث مشابه'
        certificate_number='PGBGT-GE-FO-003'
        peyvast={CheckPeyvast()}
        discipline={true}
      />
      <div className='__MainData'>
        <table>
          <tbody>
            <tr>
              <td colSpan={5} className='b tealc hss f16'>
                چه اقدام اصلاحی (کوتاه مدت/بلند مدت) برای پیشگیری از رویداد
                مشابه در نظر گرفته شده و یا در حال انجام است؟
              </td>
            </tr>
            <tr>
              <td colSpan={5} className='b tealc hss f16'>
                تعیین مسئولیتهای اقدامات اصلاحی
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr className='hss'>
              <th style={{ width: '13mm' }} className='tealc'>
                ردیف
              </th>
              <th style={{ width: '85mm' }} className='tealc'>
                اقدام اصلاحی پیشنهادی
              </th>
              <th style={{ width: '40mm' }} className='tealc'>
                مسئول اقدام و پیگیری{' '}
              </th>
              <th style={{ width: '30mm' }} className='tealc'>
                وضعیت
              </th>
              <th style={{ width: '85mm' }} className='tealc'>
                توضیحات
              </th>
            </tr>
          </thead>
          <tbody className='value'>
            {CheckList('corrective_actions').map((_data, key) => (
              <tr class='hss' key={key}>
                <td class='tealc'>{key + 1}</td>
                <td class='text-center'>{_data.action}</td>
                <td class='text-center'>{_data.responsible.join('  ، ')}</td>
                <td class='text-center'>{_data.status}</td>
                <td class='text-center'>{_data.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr className='hss _title'>
              <th>مدارک ضمیمه</th>
            </tr>
          </thead>
          <tbody>
            <tr className='hss'>
              <td>{handleLink('document_link_arp4')}</td>
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
                detail='technical_agent_arp4_info'
                date='technical_agent_arp4_verify_at'
                checksign='technical_agent_arp4_verify'
              />
              <Sign
                {...props}
                label='نماینده بهره برداری'
                detail='operation_agent_arp4_info'
                date='operation_agent_arp4_verify_at'
                checksign='operation_agent_arp4_verify'
              />
              <Sign
                {...props}
                label='نماینده تعمیرات'
                detail='repair_agent_arp4_info'
                date='repair_agent_arp4_verify_at'
                checksign='repair_agent_arp4_verify'
              />
              <Sign
                {...props}
                label='نماینده HSE'
                detail='hse_agent_arp4_info'
                date='hse_agent_arp4_verify_at'
                checksign='hse_agent_arp4_verify'
              />
            </tr>
          </tbody>
        </table>
      </div>
    </page>
  )
}
export default Form_3
