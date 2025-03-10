import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleCheckText from '../../handleCheckText'
const Page1 = props => {
  let {
    tsr1_internal_attachments,
    improvement_type,
    tsr1_improvement_type,
    tsr1_author_sign,
    tsr1_office_boss_verify_sign,
    tsr1_unit_boss_verify_sign,
    tsr1_foreign_attachments
  } = props.state
  function handleCheck (name) {
    let value = props.state[name]
    return handleCheckText(value) ? ` ${value} ` : '-'
  }
  function Convertor (data) {
    let result = ''
    switch (data.trim()) {
      case 'bahre':
        result = 'بهره برداری'
        break
      case 'repair':
        result = 'تعمیرات'
        break
      default:
        result = data
        break
    }
    return result
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
                <td className='p1 f16 dl' colSpan={3}>
                  Doc NO :
                </td>
              </tr>
            </thead>
          </table>
          <div className='___mainSign'>
            <div className='b f16 tealc'>
              صفحه اول - صدور درخواست توسط متقاضی
            </div>
            <div className='conti'>
              <span className='conti_span'>مشخصات درخواست</span>
              <table>
                <tbody>
                  <tr style={{ height: '6.5mm' }} className='hsss'>
                    <td className='tealc' style={{ width: '40mm' }}>
                      واحد درخواست كننده :
                    </td>
                    <td style={{ width: '60mm' }}>
                      {Convertor(handleCheck('tsr1_applicant_unit'))}
                    </td>
                    <td className='tealc' style={{ width: '30mm' }}>
                      ناحيه (Unit):
                    </td>
                    <td style={{ width: '70mm' }}>
                      {handleCheck('tsr1_area')}
                    </td>
                  </tr>
                  <tr style={{ height: '6.5mm' }} className='hsss'>
                    <td className='tealc'>واحد عملياتی :</td>
                    <td>{handleCheck('tsr1_operation_unit')}</td>
                    <td className='tealc'>شماره دستگاه:</td>
                    <td>{handleCheck('tsr1_machine_no')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>شرح اشکال فنی</span>
              <table>
                <tbody>
                  <tr className='hal'>
                    <td>
                      <p>{handleCheck('tsr1_technical_problem_description')}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>
                ريشه يابی و تجزيه و تحليل علل و توجيه لزوم اجرا
              </span>
              <table>
                <tbody>
                  <tr className='hm'>
                    <td>
                      <p>{handleCheck('tsr1_execution_cause')}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>پيشنهاد اصلاحی</span>
              <table>
                <tbody>
                  <tr className='hm'>
                    <td>{handleCheck('tsr1_corrective_suggest')}</td>
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
                      tsr1_foreign_attachments,
                      tsr1_internal_attachments
                    )
                    .map((data, key) => (
                      <tr className='hsss'>
                        <td className='text-center'>{key + 1}</td>
                        <td
                          className={props.handleClassName(
                            data.documentNumber
                          )}
                        >
                          {data.documentNumber}
                        </td>
                        <td className={props.handleClassName(data.degreeTitle)}>
                          {data.degreeTitle}
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
            <div className='conti'>
              <span className='conti_span'>نوع بهبود</span>
              <table>
                <tbody>
                  {improvement_type.map((data, key) => (
                    <tr key={key}>
                      {data.map((item, index) => (
                        <td className='tableTikBox' key={index}>
                          <span className='_tikbox'>
                            {props.handleChekboxSelected(
                              item,
                              tsr1_improvement_type
                            ) ? (
                              <CheckBoxRoundedIcon />
                            ) : (
                              <CheckBoxOutlineBlankRoundedIcon />
                            )}
                          </span>
                          {item.value}
                        </td>
                      ))}
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
                      className='sign'
                      style={{ verticalAlign: 'top', paddingTop: '2mm' }}
                    >
                      <span
                        className='end d-flex px-1'
                        style={{ paddingBottom: '1mm' }}
                      >
                        پيشنهاد دهنده :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>
                            {handleCheck('tsr1_author_name')}
                          </span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr1_created_at')}
                          </span>
                        </span>
                        {tsr1_author_sign ? (
                          <img
                            src={tsr1_author_sign}
                            alt={handleCheck('tsr1_author_name')}
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
                      className='sign'
                      style={{ verticalAlign: 'top', paddingTop: '2mm' }}
                    >
                      <span
                        className='end d-flex px-1'
                        style={{ paddingBottom: '1mm' }}
                      >
                        تایيد رئیس واحد :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr1_unit_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr1_unit_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr1_unit_boss_verify_at')}
                          </span>
                        </span>
                        {tsr1_unit_boss_verify_sign ? (
                          <img
                            src={tsr1_unit_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr1_unit_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr1_unit_boss_verify_lastName'
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
                      className='sign'
                      style={{ verticalAlign: 'top', paddingTop: '2mm' }}
                    >
                      <span
                        className='end d-flex px-1'
                        style={{ paddingBottom: '1mm' }}
                      >
                        تایيد رئیس اداره/امور :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr1_office_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr1_office_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr1_office_boss_verify_at')}
                          </span>
                        </span>
                        {tsr1_office_boss_verify_sign ? (
                          <img
                            src={tsr1_office_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr1_office_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr1_office_boss_verify_lastName'
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
export default Page1
