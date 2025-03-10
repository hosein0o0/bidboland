import React, { useEffect, useState } from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleCheckText from '../../handleCheckText'
import Sign from './sign'
import Head from './head'
const Form_1 = props => {
  const {
    unit_conditions,
    event_type,
    // event_possibility_reported_before,
    // event_in_last_six_months,
    event_in_last_six_months_date,
    // has_trend,
    trend_link,
    // has_log_sheets,
    log_sheets_link
  } = props.state
  const [data, setData] = useState(null)
  useEffect(() => {
    setData(props.state)
  }, [props])
  function handleCheck(name) {
    if (data) {
      if (data[name]) {
        return data[name]
      } else return ''
    } else return ''
  }
  // function CheckClassName (name, value) {
  //   const check = data ? (data[name] === value ? '_checked' : '') : ''
  //   return check
  // }
  function CheckOther() {
    const check =
      event_type !== 'انسانی' &&
      event_type !== 'خسارت به تجهیزات' &&
      event_type !== 'Total S/D' &&
      event_type !== 'زیست محیطی' &&
      event_type !== 'نشتی مواد' &&
      event_type !== 'آتش سوزی' &&
      handleCheckText(event_type)
    return check
  }
  function handleCheckLink(link) {
    let _Array = []
    if (link) {
      link.forEach((data, _key) => {
        _Array.push(
          <React.Fragment>
            <span className='_link' key={_key}>
              <a href={`/${data}`} target='_blank' rel='noreferrer'>
                {data}
              </a>
            </span>
            {_key !== link.length - 1 ? ' & ' : ''}
          </React.Fragment>
        )
      })
    }
    return _Array
  }
  function handleCheckBox(name) {
    const _data = props.state[name]
    const result = _data === '1' || _data === true
    return result
  }
  function CheckPeyvast() {
    const { has_log_sheets, log_sheets_link, has_trend } = props.state
    const checkLogosheet =
      has_log_sheets === '1' && log_sheets_link && log_sheets_link.length > 0
    const checkTrend = has_trend === '1' && trend_link && trend_link.length > 0
    const result = checkLogosheet || checkTrend
    return result
  }
  return (
    <page className='portrate' id='arp_1'>
      <Head
        {...props}
        handleCheck={handleCheck}
        label='گزارش فنی حوادث مجتمع'
        certificate_number='PGBGT-GE-FO-001'
        peyvast={CheckPeyvast()}
      />
      <div className='__MainData'>
        <table style={{ height: '100%' }}>
          <tbody>
            <tr className='hss'>
              <td className='value' name='unit_conditions'>
                شرایط واحد در زمان حادثه :
                <span>
                  بهره برداری
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className='_tikbox'
                  >
                    {unit_conditions === 'بهره برداری' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span name='تعمیرات'>
                  تعمیرات
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className='_tikbox'
                  >
                    {unit_conditions === 'تعمیرات' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span name='تعمیرات اساسی'>
                  تعمیرات اساسی
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className='_tikbox'
                  >
                    {unit_conditions === 'تعمیرات اساسی' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span name='Shut Down'>
                  Shut Down
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className='_tikbox'
                  >
                    {unit_conditions === 'Shut Down' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span name='راه اندازی'>
                  راه اندازی
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className='_tikbox'
                  >
                    {unit_conditions === 'راه اندازی' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
              </td>
            </tr>
            <tr className='hss'>
              <td className='value' id='select' name='event_type'>
                نوع حادثه :
                <span name='انسانی'>
                  انسانی
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className='_tikbox'
                  >
                    {event_type === 'انسانی' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span name='خسارت به تجهیزات'>
                  خسارت به تجهیزات
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className='_tikbox'
                  >
                    {event_type === 'خسارت به تجهیزات' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span name='Total S/D'>
                  Total S/D
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className='_tikbox'
                  >
                    {event_type === 'Total S/D' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span name='زیست محیطی'>
                  زیست محیطی
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className='_tikbox'
                  >
                    {event_type === 'زیست محیطی' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span name='نشتی مواد'>
                  نشتی مواد
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className='_tikbox'
                  >
                    {event_type === 'نشتی مواد' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span name='آتش سوزی'>
                  آتش سوزی
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className='_tikbox'
                  >
                    {event_type === 'آتش سوزی' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span name='سایر'>
                  سایر {CheckOther() ? `( ${handleCheck('event_type')} )` : ''}
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className='_tikbox'
                  >
                    {CheckOther() ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
              </td>
            </tr>
            <tr>
              <td
                className='no_BB'
                style={{ verticalAlign: 'top', paddingTop: '2mm' }}
              >
                <span>
                  <span className='b'>1- مقدمه و شرح حادثه </span>
                  (چگونگی وقوع حادثه، ساعت شروع و فرایند گسترش، تجهیزات درگیر،
                  خسارتهای ایجاد شده، اقدامات فوری به منظور کنترل حادثه و...) :
                </span>
                <p className='value' id='event_explain'>
                  {handleCheck('event_explain')}
                </p>
              </td>
            </tr>
            <tr></tr>
            <tr style={{ height: '42mm' }}>
              <td style={{ verticalAlign: 'top', paddingTop: '2mm' }}>
                <span>
                  <span className='b'>2- تجزیه و تحلیل حادثه </span>
                  (چه عللی (علل مستقیم، غیر مستقیم، ریشه‌ای و...) باعث ایجاد
                  حادثه شده است؟ اقدام کنترلی برای جلوگیری از حادثه وجود داشته
                  است؟ دلیل عدم تاثیر اقدامات کنترلی؟)
                </span>
                <p className='value' id='event_analyze'>
                  {handleCheck('event_analyze')}
                </p>
              </td>
            </tr>
            <tr className='hss'>
              <td
                className='value'
                id='select'
                name='arp1_accident_possibility_reported_before'
              >
                3- آیا احتمال وقوع حادثه قبلاً گزارش شده است؟
                <span className='mx-1' name={1}>
                  بلی
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className={`_tikbox`}
                  >
                    {handleCheckBox('event_possibility_reported_before') ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span className='mx-1' name={0}>
                  خیر
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className={`_tikbox`}
                  >
                    {handleCheckBox('event_possibility_reported_before') ? (
                      <CheckBoxOutlineBlankRoundedIcon />
                    ) : (
                      <CheckBoxRoundedIcon />
                    )}
                  </span>
                </span>
              </td>
            </tr>
            <tr className='hss'>
              <td
                className='value'
                id='select'
                name='arp1_accident_in_last_six_months'
              >
                4- آیا برای دستگاه مذکور طی شش ماه گذشته حادثه مشابهی روی داده
                است؟
                <span className='mx-1' name={1}>
                  بلی
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className={`_tikbox`}
                  >
                    {handleCheckBox('event_in_last_six_months') ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span className='mx-1' name={0}>
                  خیر
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className={`_tikbox`}
                  >
                    {handleCheckBox('event_in_last_six_months') ? (
                      <CheckBoxOutlineBlankRoundedIcon />
                    ) : (
                      <CheckBoxRoundedIcon />
                    )}
                  </span>
                </span>
                {handleCheckBox('event_in_last_six_months') ? (
                  <React.Fragment>
                    (تاریخ حادثه را ذکر نمایید :
                    <span className='value'>
                      {event_in_last_six_months_date}
                    </span>
                    )
                  </React.Fragment>
                ) : (
                  ''
                )}
              </td>
            </tr>
            <tr style={{ height: '15mm' }}>
              <td
                className='value'
                id='select'
                name='arp1_has_trend_attachment'
              >
                5- آیا Trendپارامتری که نشان دهنده نحوه کارکرد دستگاه مذکور باشد
                وجود دارد؟
                <span className='mx-1' name={1}>
                  بلی
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className={`_tikbox`}
                  >
                    {handleCheckBox('has_trend') ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span className='mx-1' name={0}>
                  خیر
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className={`_tikbox`}
                  >
                    {handleCheckBox('has_trend') ? (
                      <CheckBoxOutlineBlankRoundedIcon />
                    ) : (
                      <CheckBoxRoundedIcon />
                    )}
                  </span>
                  <br />
                  <br />
                </span>
                {handleCheckBox('has_trend') ? (
                  <React.Fragment>
                    (در صورت پاسخ مثبت، Trend مذکور ضمیمه شود :
                    {handleCheckLink(trend_link)})
                  </React.Fragment>
                ) : (
                  ''
                )}
              </td>
            </tr>
            <tr style={{ height: '32mm' }}>
              <td
                className='no_BB value'
                id='select'
                name='has_log_sheets'
                style={{ verticalAlign: 'top', paddingTop: '2mm' }}
              >
                6- آیا برای دستگاه مذکور Log Sheet تکمیل می گردد؟
                <span name={1} className='mx-1'>
                  بلی
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className={`_tikbox`}
                  >
                    {handleCheckBox('has_log_sheets') ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                </span>
                <span name={0} className='mx-1'>
                  خیر
                  <span
                    style={{ marginLeft: '5mm', marginRight: '2mm' }}
                    className={`_tikbox`}
                  >
                    {handleCheckBox('has_log_sheets') ? (
                      <CheckBoxOutlineBlankRoundedIcon />
                    ) : (
                      <CheckBoxRoundedIcon />
                    )}
                  </span>
                </span>
                <br />
                <br />
                {handleCheckBox('has_log_sheets') ? (
                  <React.Fragment>
                    (در صورت پاسخ مثبت، Log Sheet مذکور ضمیمه شود :
                    {handleCheckLink(log_sheets_link)})
                  </React.Fragment>
                ) : (
                  ''
                )}
              </td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      </div>
      <div className='conti'>
        <table className='end'>
          <tbody>
            <tr style={{ height: '35mm' }}>
              <Sign
                {...props}
                label='تهیه کننده گزارش'
                detail='author_info'
                date='created_at'
                checksign='author'
              />
              <Sign
                {...props}
                label='سرپرست واحد'
                detail='unit_supervisor_info'
                date='unit_supervisor_verify_at'
                checksign='unit_supervisor_verify'
              />
              <Sign
                {...props}
                label='رئیس واحد'
                detail='unit_boss_info'
                date='unit_boss_verify_at'
                checksign='unit_boss_verify'
              />
              <Sign
                {...props}
                label='رئیس اداره'
                detail='office_boss_info'
                date='office_boss_verify_at'
                checksign='office_boss_verify'
              />
            </tr>
          </tbody>
        </table>
      </div>
    </page>
  )
}
export default Form_1
