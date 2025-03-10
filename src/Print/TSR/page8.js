import React from 'react'
import handleCheckText from '../../handleCheckText'
const Page8 = props => {
  const {
    tsr8_foreign_attachment,
    tsr8_internal_attachment,
    tsr8_author_sign,
    tsr8_inspection_verify_sign,
    tsr8_supervisor_verify_sign
  } = props.state
  function handleCheck (name) {
    let value = props.state[name]
    return handleCheckText(value) ? ` ${value} ` : '-'
  }
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right roteated'>
          <span className='a'>(.این صفحه توسط متقاضی تكميل میگردد)</span>
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
              صفحه هشتم- دستورالعمل بازرسی فنی
            </div>
            <div className='conti'>
              <table>
                <tbody>
                  <tr style={{ height: '6.5mm' }} className='hsss'>
                    <td className='b' style={{ width: '90mm' }}>
                      گروه صادر كننده دستورالعمل:
                      <span className='value'>
                        {handleCheck('tsr8_exporter_group')}
                      </span>
                    </td>
                    <td className='b' style={{ width: '90mm' }}>
                      تاریخ صدور دستورالعمل:
                      <span>{props.handleDate('tsr8_export_date')}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>شرح دستورالعمل بازرسی</span>
              <table>
                <tbody>
                  <tr style={{ height: '43mm' }}>
                    <td>
                      <p>{handleCheck('tsr8_instruction_description')}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style={{ marginTop: '4mm' }}>
                <tbody>
                  <tr className='hsss'>
                    <td style={{ width: '20mm' }}>زمان اجرا:</td>
                    <td>
                      <span className='value'>
                        {props.handleDate('tsr8_execution_date')}
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
                      tsr8_foreign_attachment,
                      tsr8_internal_attachment
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
                        كارشناس :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>
                            {handleCheck('tsr8_author_name')}
                          </span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr8_created_at')}
                          </span>
                        </span>
                        {tsr8_author_sign ? (
                          <img
                            src={tsr8_author_sign}
                            alt={handleCheck('tsr8_author_name')}
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
                        سرپرست گروه :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr8_supervisor_verify_firstName'
                          )} ${handleCheck(
                            'tsr8_supervisor_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr8_supervisor_verify_at')}
                          </span>
                        </span>
                        {tsr8_supervisor_verify_sign ? (
                          <img
                            src={tsr8_supervisor_verify_sign}
                            alt={`${handleCheck(
                              'tsr8_supervisor_verify_firstName'
                            )} ${handleCheck(
                              'tsr8_supervisor_verify_lastName'
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
                        رئیس اداره بازرسی :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr8_inspection_verify_firstName'
                          )} ${handleCheck(
                            'tsr8_inspection_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr8_inspection_verify_at')}
                          </span>
                        </span>
                        {tsr8_inspection_verify_sign ? (
                          <img
                            src={tsr8_inspection_verify_sign}
                            alt={`${handleCheck(
                              'tsr8_inspection_verify_firstName'
                            )} ${handleCheck(
                              'tsr8_inspection_verify_lastName'
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
export default Page8
