import React from 'react'
import handleCheckText from '../../handleCheckText'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const Page10 = props => {
  function handleCheck (name) {
    let value = props.state[name]
    return handleCheckText(value) ? ` ${value} ` : '-'
  }
  const {
    tsr10_review_result,
    tsr10_author_sign,
    tsr10_use_verify_sign,
    tsr10_hse_verify_sign,
    tsr10_process_eng_verify_sign,
    tsr10_technical_inspection_verify_sign,
    tsr10_general_eng_boss_verify_sign
  } = props.state
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right roteated'>
          <span>&nbsp;</span>
        </div>
        <div className='holder_left'>
          <table>
            <thead>
              <tr className='hsss'>
                <th className='p1' style={{ width: '50mm' }} rowSpan={3}>
                  <img src='/refrence/img/tsr_img/bigi.jpg' alt='' />
                </th>
                <th style={{ width: '82mm', fontSize: '16px' }} rowSpan={3}>
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
                  تاریخ : {props.handleDate('tsr1_created_at')}
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
              style={{ borderBottom: '1px solid', paddingBottom: '1mm' }}
            >
              صفحه دهم -بررسی پايان اجراي كار
            </div>
            <div style={{ margin: 0 }} className='conti'>
              <table>
                <tbody>
                  <tr style={{ height: '6.5mm' }} className='hsss'>
                    <td style={{ width: '40mm' }}>
                      شماره دستورالعمل:
                      <p className='d-inline-block mr-2'>
                        {handleCheck('tsr10_instructionNumber')}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>نتيجه بررسی</span>
              <table>
                <tbody>
                  <tr style={{ height: '8mm' }}>
                    <td
                      style={{
                        paddingRight: '10mm',
                        width: '40mm',
                        borderBottom: 'none'
                      }}
                    >
                      <span className='_tikbox'>
                        {tsr10_review_result === '1' ? (
                          <CheckBoxRoundedIcon />
                        ) : (
                          <CheckBoxOutlineBlankRoundedIcon />
                        )}
                      </span>
                      مورد تایيد است
                    </td>
                  </tr>
                  <tr style={{ height: '8mm' }}>
                    <td
                      style={{
                        paddingRight: '10mm',
                        width: '40mm',
                        borderTop: 'none'
                      }}
                    >
                      <span className='_tikbox'>
                        {tsr10_review_result === '0' ? (
                          <CheckBoxRoundedIcon />
                        ) : (
                          <CheckBoxOutlineBlankRoundedIcon />
                        )}
                      </span>
                      مورد تایيد نيست.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span' style={{ fontSize: '13px' }}>
                ليست مشکلات كار اجرا شده
              </span>
              <table>
                <tbody>
                  <tr className='hss'>
                    <th style={{ width: '7mm' }}>رديف</th>
                    <th style={{ width: '60mm' }}>شرح اشکال</th>
                    <th style={{ width: '22mm' }}>پيگيري كننده </th>
                    <th style={{ width: '24mm' }}>مهلت اقدام</th>
                    <th style={{ width: '26mm' }}>تائيد كننده</th>
                  </tr>
                  {props
                    .handleConvert('tsr10_executed_problems')
                    .map((data, key) =>
                      handleCheckText(data.description) ||
                      handleCheckText(data.FollowUp) ||
                      handleCheckText(data.actionDate) ||
                      handleCheckText(data.confirmation) ? (
                        <tr className='hsss'>
                          <td className='text-center'>{key + 1}</td>
                          <td
                            className={props.handleClassName(data.description)}
                          >
                            {data.description}
                          </td>
                          <td className={props.handleClassName(data.FollowUp)}>
                            {data.FollowUp}
                          </td>
                          <td
                            className={props.handleClassName(data.actionDate)}
                          >
                            {data.actionDate}
                          </td>
                          <td
                            className={props.handleClassName(data.confirmation)}
                          >
                            {data.confirmation}
                          </td>
                        </tr>
                      ) : (
                        ''
                      )
                    )}
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
                        style={{ paddingBottom: '1mm', whiteSpace: 'nowrap' }}
                      >
                        تعمیرات :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>
                            {handleCheck('tsr10_author_name')}
                          </span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr10_created_at')}
                          </span>
                        </span>
                        {tsr10_author_sign ? (
                          <img
                            src={tsr10_author_sign}
                            alt={handleCheck('tsr10_author_name')}
                            style={{
                              maxWidth: '30mm',
                              height: '20mm',
                              display: 'flex',
                              padding: '.8mm'
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
                        style={{ paddingBottom: '1mm', whiteSpace: 'nowrap' }}
                      >
                        بهره برداري :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr10_use_verify_firstName'
                          )} ${handleCheck(
                            'tsr10_use_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr10_use_verify_at')}
                          </span>
                        </span>
                        {tsr10_use_verify_sign ? (
                          <img
                            src={tsr10_use_verify_sign}
                            alt={`${handleCheck(
                              'tsr10_use_verify_firstName'
                            )} ${handleCheck('tsr10_use_verify_lastName')}`}
                            style={{
                              maxWidth: '30mm',
                              height: '20mm',
                              display: 'flex',
                              padding: '.8mm'
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
                        style={{ paddingBottom: '1mm', whiteSpace: 'nowrap' }}
                      >
                        ایمنی و آتش نشانی :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr10_hse_verify_firstName'
                          )} ${handleCheck(
                            'tsr10_hse_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr10_hse_verify_at')}
                          </span>
                        </span>
                        {tsr10_hse_verify_sign ? (
                          <img
                            src={tsr10_hse_verify_sign}
                            alt={`${handleCheck(
                              'tsr10_hse_verify_firstName'
                            )} ${handleCheck('tsr10_hse_verify_lastName')}`}
                            style={{
                              maxWidth: '30mm',
                              height: '20mm',
                              display: 'flex',
                              padding: '.8mm'
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
                        style={{ paddingBottom: '1mm', whiteSpace: 'nowrap' }}
                      >
                        مهندسی فرآیند :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr10_process_eng_verify_firstName'
                          )} ${handleCheck(
                            'tsr10_process_eng_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr10_process_eng_verify_at')}
                          </span>
                        </span>
                        {tsr10_process_eng_verify_sign ? (
                          <img
                            src={tsr10_process_eng_verify_sign}
                            alt={`${handleCheck(
                              'tsr10_process_eng_verify_firstName'
                            )} ${handleCheck(
                              'tsr10_process_eng_verify_lastName'
                            )}`}
                            style={{
                              maxWidth: '30mm',
                              height: '20mm',
                              display: 'flex',
                              padding: '.8mm'
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
                        style={{ paddingBottom: '1mm', whiteSpace: 'nowrap' }}
                      >
                        بازرسی فنی :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr10_technical_inspection_verify_firstName'
                          )} ${handleCheck(
                            'tsr10_technical_inspection_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate(
                              'tsr10_technical_inspection_verify_at'
                            )}
                          </span>
                        </span>
                        {tsr10_technical_inspection_verify_sign ? (
                          <img
                            src={tsr10_technical_inspection_verify_sign}
                            alt={`${handleCheck(
                              'tsr10_technical_inspection_verify_firstName'
                            )} ${handleCheck(
                              'tsr10_technical_inspection_verify_lastName'
                            )}`}
                            style={{
                              maxWidth: '30mm',
                              height: '20mm',
                              display: 'flex',
                              padding: '.8mm'
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
                        style={{ paddingBottom: '1mm', whiteSpace: 'nowrap' }}
                      >
                        مهندسی عمومی :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr10_general_eng_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr10_general_eng_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate(
                              'tsr10_general_eng_boss_verify_at'
                            )}
                          </span>
                        </span>
                        {tsr10_general_eng_boss_verify_sign ? (
                          <img
                            src={tsr10_general_eng_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr10_general_eng_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr10_general_eng_boss_verify_lastName'
                            )}`}
                            style={{
                              maxWidth: '30mm',
                              height: '20mm',
                              display: 'flex',
                              padding: '.8mm'
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
export default Page10
