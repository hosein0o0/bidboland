import React, { useEffect, useState } from 'react'
import Head from './head'
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
  function handleName (name) {
    const detail = props.state[name]
    let result = '-'
    if (detail) {
      const { first_name, last_name } = detail
      result = `${first_name} ${last_name}`
    }
    return result
  }
  function handleCheckLink (verify, name) {
    const _verify = props.state[verify],
      _name = props.state[name]
    let result = '-'
    if (_verify === '1') {
      if (_name) {
        result = []
        _name.forEach((_data, _key) =>
          result.push(
            <React.Fragment>
              <span className='_link' key={_key}>
                <a href={_data}>{_data}</a>
              </span>
              {_key !== _name.length - 1 ? ' & ' : ''}
            </React.Fragment>
          )
        )
      } else {
        result = 'ندارد'
      }
    }
    return result
  }
  function MultiUser (name) {
    let _date = props.state[name]
    let array = []
    if (_date) {
      if (_date.length) {
        _date.forEach((_value, _key) => {
          let _result = `${_value.first_name} ${_value.last_name}`
          array.push(
            <React.Fragment>
              <span className='_link' key={_key}>
                {_result}
              </span>
              {_key !== _date.length - 1 ? ' ، ' : ''}
            </React.Fragment>
          )
        })
      }
    }
    return array
  }
  function CheckPeyvast () {
    const {
      hse_report_link,
      operation_report_link,
      repair_report_link,
      technical_report_link
    } = props.state
    const hse = hse_report_link && hse_report_link.length > 0
    const operation = operation_report_link && operation_report_link.length > 0
    const repair = repair_report_link && repair_report_link.length > 0
    const technical = technical_report_link && technical_report_link.length > 0
    const result = hse || operation || repair || technical
    return result
  }
  return (
    <page className='portrate' id='arp_3'>
      <Head
        {...props}
        handleCheck={handleCheck}
        label={
          <React.Fragment>
            گزارش دیسیپلین های مختلف
            <br />
            (تیم های بررسی از واحدهای خدمات فنی / بهره برداری / تعمیرات / HSE)
          </React.Fragment>
        }
        certificate_number='ATTACHMENT'
        peyvast={CheckPeyvast()}
      />
      <table>
        <thead>
          <tr className='hss _title'>
            <th style={{ width: '22mm' }}>اداره</th>
            <th style={{ width: '22mm' }}>Discipline</th>
            <th style={{ width: '22mm' }}>سرپرست واحد</th>
            <th style={{ width: '22mm' }}>کارشناس</th>
            <th>مدارک</th>
          </tr>
        </thead>
        <tbody>
          <tr className='hm'>
            <td className='px-1 text-center'>خدمات فنی</td>
            <td className='px-1 text-center'>
              {handleCheck('technical_discipline')}
            </td>
            <td className='px-1 text-center'>
              {handleName('technical_unit_supervisor_info')}
            </td>
            <td className='px-1 text-center'>
              {handleName('technical_event_expert_info')}
            </td>
            <td className='px-1'>
              {handleCheckLink(
                'technical_event_expert_verify',
                'technical_report_link'
              )}
            </td>
          </tr>
          <tr className='hm'>
            <td className='px-1 text-center'>بهره برداری</td>
            <td className='px-1 text-center'>
              {handleCheck('operation_discipline')}
            </td>
            <td className='px-1 text-center'>
              {handleName('operation_unit_supervisor_info')}
            </td>
            <td className='px-1 text-center'>
              {handleName('operation_event_expert_info')}
            </td>
            <td className='px-1'>
              {handleCheckLink(
                'operation_event_expert_verify',
                'operation_report_link'
              )}
            </td>
          </tr>
          <tr className='hm'>
            <td className='px-1 text-center'>تعمیرات</td>
            <td className='px-1 text-center'>
              {handleCheck('repair_discipline')}
            </td>
            <td className='px-1 text-center'>
              {handleName('repair_unit_supervisor_info')}
            </td>
            <td className='px-1 text-center'>
              {handleName('repair_event_expert_info')}
            </td>
            <td className='px-1'>
              {handleCheckLink(
                'repair_event_expert_verify',
                'repair_report_link'
              )}
            </td>
          </tr>
          <tr className='hm'>
            <td className='px-1 text-center'>HSE</td>
            <td className='px-1 text-center'>
              {handleCheck('hse_discipline')}
            </td>
            <td className='px-1 text-center'>
              {handleName('hse_unit_supervisor_info')}
            </td>
            <td className='px-1 text-center'>
              {handleName('hse_event_expert_info')}
            </td>
            <td className='px-1'>
              {handleCheckLink('hse_event_expert_verify', 'hse_report_link')}
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr className='hss _title'>
            <th>تخصیص نفر به عنوان دبیر کمیته بررسی حادثه</th>
          </tr>
          <tr className='hm'>
            <td>
              نام و نام خانوادگی دبیر کمیته :
              {` ${handleName('secretary_committee_info')} `}
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr className='hss _title'>
            <th>مکان و زمان برگزاری جلسه بررسی حادثه</th>
          </tr>
          <tr className='hs'>
            <td className='px-1'>
              مکان :{` ${handleCheck('meeting_place')} `}
            </td>
          </tr>
          <tr className='hs'>
            <td className='px-1'>
              زمان :
              {` ${handleCheck('meeting_hour')} - ${handleCheck(
                'meeting_date'
              )}`}
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr className='hss _title'>
            <th>نفرات شرکت کننده در جلسه بررسی حادثه</th>
          </tr>
        </thead>
      </table>
      <table>
        <tbody>
          <tr className='hss'>
            <td className='text-center' style={{ width: '22mm' }}>
              خدمات فنی
            </td>
            <td>{MultiUser('technical_meeting_users_info')}</td>
          </tr>
          <tr className='hss'>
            <td className='text-center' style={{ width: '22mm' }}>
              بهره برداری
            </td>
            <td>{MultiUser('operation_meeting_users_info')}</td>
          </tr>
          <tr className='hss'>
            <td className='text-center' style={{ width: '22mm' }}>
              تعمیرات
            </td>
            <td>{MultiUser('repair_meeting_users_info')}</td>
          </tr>
          <tr className='hss'>
            <td className='text-center' style={{ width: '22mm' }}>
              HSE
            </td>
            <td>{MultiUser('hse_meeting_users_info')}</td>
          </tr>
        </tbody>
      </table>
    </page>
  )
}
export default Form_2
