import React from 'react'
import handleCheckText from '../../handleCheckText'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const Page5 = props => {
  function handleCheck (name) {
    let value = props.state[name]
    return handleCheckText(value) ? ` ${value} ` : '-'
  }
  const {
    tsr5_review_result,
    tsr5_foreign_attachment,
    tsr5_internal_attachment,
    tsr5_author_sign,
    tsr5_supervisor_verify_sign,
    tsr5_general_eng_verify_sign
  } = props.state
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right roteated'>
          <span className='a'>(.این قسمت در صورت عدم تایيد تكميل گردد )</span>
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
              style={{ borderBottom: '3px solid', paddingBottom: '1mm' }}
            >
              صفحه پنجم - بررسی TSRتوسط مهندسی عمومی
            </div>
            <div className='conti'>
              <span className='conti_span'>نتيجه بررسی</span>
              <table>
                <tbody>
                  <tr style={{ height: '6.5mm' }}>
                    <td
                      className
                      style={{ paddingRight: '10mm', borderBottom: 'none' }}
                    >
                      <span className='_tikbox'>
                        {tsr5_review_result === '1' ? (
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
                      className
                      style={{ paddingRight: '10mm', borderTop: 'none' }}
                    >
                      <span className='_tikbox'>
                        {tsr5_review_result === '0' ? (
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
              {tsr5_review_result === '0' ? (
                <span className='conti_span'>دلایل عدم تایید</span>
              ) : (
                ''
              )}
              <table>
                <tbody>
                  {tsr5_review_result === '0' ? (
                    <tr className='halxx'>
                      <td>
                        <p>{handleCheck('tsr5_reject_msg')}</p>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  <tr>
                    <td className='hss b' style={{ paddingRight: '4mm' }}>
                      زمان پيشنهادي جهت اجرا:
                      <span>
                        {props.handleDate('tsr5_suggested_execution_time')}
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
                      tsr5_foreign_attachment,
                      tsr5_internal_attachment
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
                        بررسی كننده :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>
                            {handleCheck('tsr5_author_name')}
                          </span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr5_created_at')}
                          </span>
                        </span>
                        {tsr5_author_sign ? (
                          <img
                            src={tsr5_author_sign}
                            alt={handleCheck('tsr5_author_name')}
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
                        تایيد سرپرست :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr5_supervisor_verify_firstName'
                          )} ${handleCheck(
                            'tsr5_supervisor_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr5_supervisor_verify_at')}
                          </span>
                        </span>
                        {tsr5_supervisor_verify_sign ? (
                          <img
                            src={tsr5_supervisor_verify_sign}
                            alt={`${handleCheck(
                              'tsr5_supervisor_verify_firstName'
                            )} ${handleCheck(
                              'tsr5_supervisor_verify_lastName'
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
                        تایيد رئيس اداره مهندسی عمومی :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr5_general_eng_verify_firstName'
                          )} ${handleCheck(
                            'tsr5_general_eng_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr5_general_eng_verify_at')}
                          </span>
                        </span>
                        {tsr5_general_eng_verify_sign ? (
                          <img
                            src={tsr5_general_eng_verify_sign}
                            alt={`${handleCheck(
                              'tsr5_general_eng_verify_firstName'
                            )} ${handleCheck(
                              'tsr5_general_eng_verify_lastName'
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
export default Page5
