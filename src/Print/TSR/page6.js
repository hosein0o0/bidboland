import React from 'react'
import handleCheckText from '../../handleCheckText'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const Page6 = props => {
  function handleCheck (name) {
    let value = props.state[name]
    return handleCheckText(value) ? ` ${value} ` : '-'
  }
  const {
    tsr6_technical_review,
    tsr6_foreign_attachment,
    tsr6_internal_attachment,
    tsr6_process_eng_boss_verify_sign,
    tsr6_general_eng_boss_verify_sign,
    tsr6_technical_inspector_boss_verify_sign,
    tsr6_technical_service_boss_verify_sign
  } = props.state
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right roteated'>
          <span>
            (این قسمت در صورت عدم تایيد تكميل گردد)&nbsp;&nbsp;&nbsp;&nbsp;(این
            قسمت در صورت عدم تایيد تكميل گردد)
          </span>
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
                  تاریخ :{props.handleDate('tsr1_created_at')}
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
              صفحه ششم - كميته TSR
            </div>
            <div className='conti'>
              <span className='conti_span'>نتيجه بررسی فنی _ اقتصادي</span>
              <table>
                <tbody>
                  <tr style={{ height: '6.5mm' }}>
                    <td
                      style={{
                        paddingRight: '10mm',
                        width: '40mm',
                        borderBottom: 'none'
                      }}
                    >
                      <span className='_tikbox'>
                        {tsr6_technical_review === '1' ? (
                          <CheckBoxRoundedIcon />
                        ) : (
                          <CheckBoxOutlineBlankRoundedIcon />
                        )}
                      </span>
                      مورد تایيد است
                    </td>
                  </tr>
                  <tr style={{ height: '6.5mm' }}>
                    <td
                      style={{
                        paddingRight: '10mm',
                        width: '40mm',
                        borderTop: 'none'
                      }}
                    >
                      <span className='_tikbox'>
                        {tsr6_technical_review === '0' ? (
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
            {tsr6_technical_review === '0' ? (
              <div className='conti'>
                <span className='conti_span'>دلايل عدم تاييد</span>
                <table>
                  <tbody>
                    <tr className='hal'>
                      <td>
                        <p>{handleCheck('tsr6_review_text')}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ''
            )}
            <div className='conti'>
              {tsr6_technical_review === '1' ? (
                <span className='conti_span'>الزامات و ملاحظات</span>
              ) : (
                ''
              )}
              <table>
                <tbody>
                  {tsr6_technical_review === '1' ? (
                    <tr className='halk'>
                      <td>
                        <p>{handleCheck('tsr6_review_text')}</p>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  <tr>
                    <td className='hss b' style={{ paddingRight: '4mm' }}>
                      زمان تائید شده جهت اجرا:
                      <span>
                        {props.handleDate('tsr6_verified_execution_time')}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>مدارك ضميمه</span>
              <table>
                <tbody>
                  <tr className='hss'>
                    <th style={{ width: '7mm' }}>رديف</th>
                    <th style={{ width: '36mm' }}>شماره سند</th>
                    <th style={{ width: '50mm' }}>عنوان مدارك </th>
                    <th
                      className='p0'
                      style={{ width: '12mm', fontSize: '9px' }}
                    >
                      تعداد صفحات
                    </th>
                    <th style={{ width: '30mm' }}>توضيحات</th>
                  </tr>
                  {props
                    .DocumentaArray(
                      tsr6_foreign_attachment,
                      tsr6_internal_attachment
                    )
                    .map((data, key) => (
                      <tr className='hsss' key={key}>
                        <td className='text-center'>{key + 1}</td>
                        <td
                          className={props.handleClassName(
                            data.documentNumber
                          )}
                        >
                          {data.documentNumber}
                        </td>
                        <td
                          className={props.handleClassName(
                            props.DocumnentShow(data)
                          )}
                        >
                          {props.DocumnentShow(data)}
                        </td>
                        <td className={props.handleClassName(data.numberPages)}>
                          {data.numberPages}
                        </td>
                        <td
                          className={props.handleClassName(
                            data.descriptionAttachment
                          )}
                        >
                          {data.descriptionAttachment}
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
                        رئيس مهندسی فرآیند :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr6_process_eng_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr6_process_eng_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate(
                              'tsr6_process_eng_boss_verify_at'
                            )}
                          </span>
                        </span>
                        {tsr6_process_eng_boss_verify_sign ? (
                          <img
                            src={tsr6_process_eng_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr6_process_eng_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr6_process_eng_boss_verify_lastName'
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
                        رئيس مهندسی عمومی :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr6_general_eng_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr6_general_eng_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate(
                              'tsr6_general_eng_boss_verify_at'
                            )}
                          </span>
                        </span>
                        {tsr6_general_eng_boss_verify_sign ? (
                          <img
                            src={tsr6_general_eng_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr6_general_eng_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr6_general_eng_boss_verify_lastName'
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
                        رئيس بازرسی فنی :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr6_technical_inspector_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr6_technical_inspector_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate(
                              'tsr6_technical_inspector_boss_verify_at'
                            )}
                          </span>
                        </span>
                        {tsr6_technical_inspector_boss_verify_sign ? (
                          <img
                            src={tsr6_technical_inspector_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr6_technical_inspector_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr6_technical_inspector_boss_verify_lastName'
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
                        رئيس خدمات فنی :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr6_technical_service_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr6_technical_service_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate(
                              'tsr6_technical_service_boss_verify_at'
                            )}
                          </span>
                        </span>
                        {tsr6_technical_service_boss_verify_sign ? (
                          <img
                            src={tsr6_technical_service_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr6_technical_service_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr6_technical_service_boss_verify_lastName'
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
export default Page6
