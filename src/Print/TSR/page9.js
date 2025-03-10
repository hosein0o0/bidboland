import React from 'react'
import handleCheckText from '../../handleCheckText'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const Page9 = props => {
  function handleCheck (name) {
    let value = props.state[name]
    return handleCheckText(value) ? ` ${value} ` : '-'
  }
  const array = props.handleConvert('tsr9_implement_eng_instruction')
    ? props.handleConvert('tsr9_implement_eng_instruction')
    : []
  const {
    ts9_foreign_attachment,
    tsr9_internal_attachment,
    tsr9_marked_documents,
    tsr9_test_result,
    tsr9_author_sign,
    tsr9_execution_responsible_verify_sign,
    tsr9_unit_boss_verify_sign,
    tsr9_repair_planning_verify_sign
  } = props.state
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right roteated'>
          <span className='a'>&nbsp;</span>
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
            <div className='b f16 tealc'>
              صفحه نهم -اعلام پايان كار توسط مسئول اجرا
            </div>
            <div className='conti'>
              <span className='conti_span'>
                دستور العمل‌های مهندسی اجرا شده
              </span>
              <table>
                <tbody>
                  <tr className='hss'>
                    <th style={{ width: '10mm' }}>رديف</th>
                    <th style={{ width: '15mm' }}>گروه</th>
                    <th className='p0' style={{ width: '20mm' }}>
                      شماره دستورالعمل
                    </th>
                    <th style={{ width: '20mm' }}>تاریخ صدور دستورالعمل </th>
                    <th style={{ width: '50mm' }}>شماره W.O</th>
                    <th style={{ width: '30mm' }}>تاریخ صدور W.O</th>
                    <th style={{ width: '25mm' }}>تاریخ شروع کار</th>
                    <th style={{ width: '40mm' }}>تاریخ پایان کار</th>
                  </tr>
                  {array.map((data, key) => (
                    <React.Fragment>
                      <tr className='hsss'>
                        <td className='text-center'>{key + 1}</td>
                        <td className={props.handleClassName(data.group)}>
                          {handleCheckText(data.group) ? data.group : '-'}
                        </td>
                        <td
                          className={props.handleClassName(
                            data.instructionNumber
                          )}
                        >
                          {handleCheckText(data.instructionNumber)
                            ? data.instructionNumber
                            : '-'}
                        </td>
                        <td
                          className={props.handleClassName(
                            data.dateIssuanceInstructions
                          )}
                        >
                          {handleCheckText(data.dateIssuanceInstructions)
                            ? data.dateIssuanceInstructions
                            : '-'}
                        </td>
                        <td className={props.handleClassName(data.wO)}>
                          {handleCheckText(data.wO) ? data.wO : '-'}
                        </td>
                        <td className={props.handleClassName(data.wODate)}>
                          {handleCheckText(data.wODate) ? data.wODate : '-'}
                        </td>
                        <td className={props.handleClassName(data.startDate)}>
                          {handleCheckText(data.startDate)
                            ? data.startDate
                            : '-'}
                        </td>
                        <td className={props.handleClassName(data.endDate)}>
                          {handleCheckText(data.endDate) ? data.endDate : '-'}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>ملاحظات</span>
              <table>
                <tbody>
                  <tr style={{ height: '50mm' }}>
                    <td>
                      <p>{handleCheck('tsr9_note')}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>مدارك ضميمه</span>
              <span className='b' style={{ marginRight: '6mm' }}>
                <span className='_tikbox'>
                  {tsr9_marked_documents === '1' ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                </span>
                مدارك MARK UP شده
              </span>
              <span className='b' style={{ marginRight: '10mm' }}>
                <span className='_tikbox'>
                  {tsr9_test_result === '1' ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                </span>
                نتایج تست
              </span>
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
                      ts9_foreign_attachment,
                      tsr9_internal_attachment
                    )
                    .map((data, key) => (
                      <tr className='hsss' key={key}>
                        <td>{key + 1}</td>
                        <td>{data.documentNumber}</td>
                        <td>{props.DocumnentShow(data)}</td>
                        <td>{data.numberPages}</td>
                        <td>{data.descriptionAttachment}</td>
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
                        پیمانکار اجرایی :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>
                            {handleCheck('tsr9_author_name')}
                          </span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr9_created_at')}
                          </span>
                        </span>
                        {tsr9_author_sign ? (
                          <img
                            src={tsr9_author_sign}
                            alt={handleCheck('tsr9_author_name')}
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
                        مسئول اجرا :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr9_execution_responsible_verify_firstName'
                          )} ${handleCheck(
                            'tsr9_execution_responsible_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate(
                              'tsr9_execution_responsible_verify_at'
                            )}
                          </span>
                        </span>
                        {tsr9_execution_responsible_verify_sign ? (
                          <img
                            src={tsr9_execution_responsible_verify_sign}
                            alt={`${handleCheck(
                              'tsr9_execution_responsible_verify_firstName'
                            )} ${handleCheck(
                              'tsr9_execution_responsible_verify_lastName'
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
                        رئیس واحد :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr9_unit_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr9_unit_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr9_unit_boss_verify_at')}
                          </span>
                        </span>
                        {tsr9_unit_boss_verify_sign ? (
                          <img
                            src={tsr9_unit_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr9_unit_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr9_unit_boss_verify_lastName'
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
                        برنامه ریزی تعميرات :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr9_repair_planning_verify_firstName'
                          )} ${handleCheck(
                            'tsr9_repair_planning_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr9_repair_planning_verify_at')}
                          </span>
                        </span>
                        {tsr9_repair_planning_verify_sign ? (
                          <img
                            src={tsr9_repair_planning_verify_sign}
                            alt={`${handleCheck(
                              'tsr9_repair_planning_verify_firstName'
                            )} ${handleCheck(
                              'tsr9_repair_planning_verify_lastName'
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
export default Page9
