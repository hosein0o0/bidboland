import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleCheckText from '../../handleCheckText'
const Page2 = props => {
  const {
    conditionsList,
    tsr2_reject_reasons,
    tsr2_issued_status,
    tsr2_responsible,
    tsr2_undergraduate_group,
    tsr2_general_boss_verify_sign,
    tsr2_process_eng_verify_sign,
    tsr2_inspection_boss_verify_sign
  } = props.state
  function handleCheck (name) {
    let value = props.state[name]
    return handleCheckText(value) ? ` ${value} ` : '-'
  }
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right roteated'>
          <span>
            در صورت تطابق درخواست با شرایط صدور ،TSRمسئول آن و گروه كارشناسی
            انتخاب گردد.
          </span>
        </div>
        <div className='holder_left'>
          <table>
            <thead>
              <tr className='hsss'>
                <th className='p1' style={{ width: '50mm' }} rowSpan={3}>
                  <img src='/refrence/img/tsr_img/bigi.jpg' alt='' />
                </th>
                <th style={{ width: '83mm', fontSize: '16px' }} rowSpan={3}>
                  فرم درخواست خدمات فني <br />
                  <br />
                  (TSR) <br />
                  TECHNICAL SERVICE REQUEST
                </th>
                <td className='b' style={{ width: '54mm' }}>
                  <span className='value'> PGBGT-GE-FO-007</span>
                </td>
              </tr>
              <tr className='hsss'>
                <td className='b' style={{ width: '54mm' }}>
                  شماره:
                  <span className='value'>{handleCheck('tsr1_tsr_no')}</span>
                </td>
              </tr>
              <tr className='hsss'>
                <td className='b'>
                  تاریخ :
                  <span className='value'>
                    {props.handleDate('tsr1_created_at')}
                  </span>
                </td>
              </tr>
              <tr className='hss'>
                <td className='p1 b f16' colSpan={3}>
                  موضوع :
                  <p className='d-inline-block'>
                    {handleCheck('tsr1_subject')}
                  </p>
                </td>
              </tr>
              <tr className='hss'>
                <td className='p1 f16 dl' colSpan={3}></td>
              </tr>
            </thead>
          </table>
          <div className='___mainSign'>
            <div
              className='b f16 tealc'
              style={{ borderBottom: '3px solid', paddingBottom: '1mm' }}
            >
              صفحه دوم - بررسی اوليه و انتخاب مسئول TSRو گروه كارشناسی
            </div>
            <div className='conti'>
              <span className='conti_span'>بررسی شرايط صدور TSR</span>
              <div className='border'>
                <div className='padRk'>
                  <span className='_tikbox'>
                    {tsr2_issued_status === '1' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                  درخواست ارایه شده با روش اجرایی درخواست هاي خدمات فنی تطابق
                  دارد.
                </div>
                <div className='padRk'>
                  <span className='_tikbox'>
                    {tsr2_issued_status !== '1' ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                  </span>
                  به دليل عدم تطابق با روش اجرایی درخواست هاي خدمات فنی عودت
                  داده می شود:
                </div>
                {conditionsList.map((item, key) => (
                  <div className='padR' key={key}>
                    <span className='_tikbox'>
                      {props.handleChekboxSelected(
                        item,
                        tsr2_reject_reasons
                      ) ? (
                        <CheckBoxRoundedIcon />
                      ) : (
                        <CheckBoxOutlineBlankRoundedIcon />
                      )}
                    </span>
                    <p className='d-inline-block'>{item.label}</p>
                  </div>
                ))}
              </div>
              <div
                className='border p1'
                style={{ height: '26mm', borderTop: 'none' }}
              >
                <span className='b f12'>توضيحات</span>
                <br />
                {handleCheck('tsr2_issued_description')}
              </div>
            </div>
            <div className='conti'>
              <span className='conti_span'>مسئول TSR</span>
              <table>
                <tbody>
                  <tr className='hsss'>
                    <th style={{ width: '10mm' }}>ردیف</th>
                    <th style={{ width: '25mm' }}>گروه</th>
                    <th style={{ width: '60mm' }}>نام و نام خانوادگی</th>
                    <th style={{ width: '80mm' }}>سمت سازمانی</th>
                  </tr>
                  {props.handnleArray(tsr2_responsible).map((data, key) => (
                    <tr style={{ height: '7mm' }}>
                      <td className='text-center'>{key + 1}</td>
                      <td
                        className={props.handleClassName(data.position_group)}
                      >
                        {data.position_group}
                      </td>
                      <td className={props.handleClassName(data.user_name)}>
                        {data.user_name}
                      </td>
                      <td className={props.handleClassName(data.org_position)}>
                        {data.org_position}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>گروه كارشناسی</span>
              <table>
                <tbody>
                  <tr className='hsss'>
                    <th style={{ width: '10mm' }}>ردیف</th>
                    <th style={{ width: '25mm' }}>گروه</th>
                    <th style={{ width: '60mm' }}>نام و نام خانوادگی</th>
                    <th style={{ width: '80mm' }}>سمت سازمانی</th>
                  </tr>
                  {props
                    .handnleArray(tsr2_undergraduate_group)
                    .map((data, key) => (
                      <tr style={{ height: '7mm' }}>
                        <td className='text-center'>{key + 1}</td>
                        <td
                          className={props.handleClassName(data.position_group)}
                        >
                          {data.position_group}
                        </td>
                        <td className={props.handleClassName(data.user_name)}>
                          {data.user_name}
                        </td>
                        <td
                          className={props.handleClassName(data.org_position)}
                        >
                          {data.org_position}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className='conti __sign'>
              <table className='end'>
                <tbody>
                  <tr style={{ height: '35mm' }}>
                    <td
                      className='sign bt'
                      style={{ verticalAlign: 'top', paddingTop: '2mm' }}
                    >
                      <span
                        className='end d-flex px-1'
                        style={{ paddingBottom: '1mm' }}
                      >
                        تایيد رئيس مهندسی عمومی :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr2_general_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr2_general_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr2_general_boss_verify_at')}
                          </span>
                        </span>
                        {tsr2_general_boss_verify_sign ? (
                          <img
                            src={tsr2_general_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr2_general_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr2_general_boss_verify_lastName'
                            )}`}
                            style={{
                              width: '30mm',
                              height: '20mm',
                              display: 'flex',
                              padding: '1mm'
                            }}
                          />
                        ) : (
                          ''
                        )}
                      </span>
                    </td>
                    <td
                      className='sign bt'
                      style={{ verticalAlign: 'top', paddingTop: '2mm' }}
                    >
                      <span
                        className='end d-flex px-1'
                        style={{ paddingBottom: '1mm' }}
                      >
                        تایيد رئيس مهندسی فرآیند :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr2_process_eng_verify_firstName'
                          )} ${handleCheck(
                            'tsr2_process_eng_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr2_process_eng_verify_at')}
                          </span>
                        </span>
                        {tsr2_process_eng_verify_sign ? (
                          <img
                            src={tsr2_process_eng_verify_sign}
                            alt={`${handleCheck(
                              'tsr2_process_eng_verify_firstName'
                            )} ${handleCheck(
                              'tsr2_process_eng_verify_lastName'
                            )}`}
                            style={{
                              width: '30mm',
                              height: '20mm',
                              display: 'flex',
                              padding: '1mm'
                            }}
                          />
                        ) : (
                          ''
                        )}
                      </span>
                    </td>
                    <td
                      className='sign bt'
                      style={{ verticalAlign: 'top', paddingTop: '2mm' }}
                    >
                      <span
                        className='end d-flex px-1'
                        style={{ paddingBottom: '1mm' }}
                      >
                        تایيد رئيس بازرسی فنی :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr2_inspection_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr2_inspection_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr2_inspection_boss_verify_at')}
                          </span>
                        </span>
                        {tsr2_inspection_boss_verify_sign ? (
                          <img
                            src={tsr2_inspection_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr2_inspection_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr2_inspection_boss_verify_lastName'
                            )}`}
                            style={{
                              width: '30mm',
                              height: '20mm',
                              display: 'flex',
                              padding: '1mm'
                            }}
                          />
                        ) : (
                          ''
                        )}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </page>
  )
}
export default Page2
