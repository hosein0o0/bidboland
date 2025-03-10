import React from 'react'
import handleCheckText from '../../handleCheckText'
const Page11 = props => {
  function handleCheck (name) {
    let value = props.state[name]
    return handleCheckText(value) ? ` ${value} ` : '-'
  }
  const {
    tsr11_author_sign,
    tsr11_supervisor_verify_sign,
    tsr11_general_eng_boss_verify_sign
  } = props.state
  function handleLink (data) {
    const { attachment, attachmentName } = data
    const check = attachment && attachmentName
    if (check) {
      let convert = Object.keys(attachment).map(_value => {
        return attachment[_value]
      })
      let _check =
        convert.length === attachmentName.length && attachmentName.length > 0
      let list = []
      if (_check) {
        attachmentName.forEach((_item, _index) => {
          list.push(
            <span key={_index} className='_link'>
              <a href={convert[_index]}>{_item}</a>
            </span>
          )
        })
      } else {
        list = 'ندارد'
      }
      return list
    }
    return ''
  }
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right roteated'>
          <span className='a'>(این صفحه توسط مسئول ،TSRتكميل می گردد.)</span>
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
              صفحه يازدهم- تحويل نقشه هاي As Built
            </div>
            <div style={{ margin: 0 }} className='conti'>
              <table>
                <tbody>
                  <tr style={{ height: '6.5mm' }} className='hsss'>
                    <td className='b tealc' style={{ width: '40mm' }}>
                      نوع اسناد:
                    </td>
                    <td>
                      <p className='value'>
                        {handleCheck('tsr11_typeDocuments')}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>اسناد جدید</span>
              <table className='dl'>
                <tbody>
                  <tr className='hsss'>
                    <td style={{ width: '15mm' }} className='tealc'>
                      Attachement
                    </td>
                    <td style={{ width: '45mm' }} className='tealc'>
                      Document Nomber
                    </td>
                    <td style={{ width: '60mm' }} className='tealc'>
                      Document Title
                    </td>
                    <td style={{ width: '13mm' }} className='tealc'>
                      Rev.
                    </td>
                  </tr>
                  {props
                    .handleConvert('tsr11_new_document_attachment')
                    .map((data, key) => (
                      <tr className='hsss' key={key}>
                        <td className={props.handleClassName(handleLink(data))}>
                          {handleLink(data)}
                        </td>
                        <td
                          className={props.handleClassName(data.documentNumber)}
                        >
                          {data.documentNumber}
                        </td>
                        <td className={props.handleClassName(data.title)}>
                          {data.title}
                        </td>
                        <td className={props.handleClassName(data.editNumber)}>
                          {data.editNumber}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>اسناد ویرایش شده</span>
              <table className='dl'>
                <tbody>
                  <tr className='hsss'>
                    <td style={{ width: '15mm' }} className='tealc'>
                      Attachement
                    </td>
                    <td style={{ width: '45mm' }} className='tealc'>
                      Document Nomber
                    </td>
                    <td style={{ width: '60mm' }} className='tealc'>
                      Document Title
                    </td>
                    <td style={{ width: '13mm' }} className='tealc'>
                      Rev.
                    </td>
                  </tr>
                  {props
                    .handleConvert('tsr11_edited_document_attachment')
                    .map((data, key) => (
                      <tr className='hsss' key={key}>
                        <td className={props.handleClassName(handleLink(data))}>
                          {handleLink(data)}
                        </td>
                        <td
                          className={props.handleClassName(data.documentNumber)}
                        >
                          {data.documentNumber}
                        </td>
                        <td className={props.handleClassName(data.title)}>
                          {data.title}
                        </td>
                        <td className={props.handleClassName(data.editNumber)}>
                          {data.editNumber}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>
                توسط مركز اسناد به ادارات زير توزيع گردد:
              </span>
              <table>
                <tbody>
                  <tr className='hss'>
                    <th className='p0 nob' style={{ width: '7mm' }}>
                      ردیف
                    </th>
                    <th className='p0 nob' style={{ width: '36mm' }}>
                      نام اداره
                    </th>
                    <th className='p0 nob' style={{ width: '24mm' }}>
                      تعداد نسخ
                    </th>
                  </tr>
                  {props
                    .handleConvert('tsr11_documents_distribution')
                    .map((data, key) => (
                      <tr className='hsss'>
                        <td className='text-center'>{key + 1}</td>
                        <td className={props.handleClassName(data.officeName)}>
                          {data.officeName}
                        </td>
                        <td className={props.handleClassName(data.number)}>
                          {data.number}
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
                        مسئول TSR :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>
                            {handleCheck('tsr11_author_name')}
                          </span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr11_created_at')}
                          </span>
                        </span>
                        {tsr11_author_sign ? (
                          <img
                            src={tsr11_author_sign}
                            alt={handleCheck('tsr11_author_name')}
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
                            'tsr11_supervisor_verify_firstName'
                          )} ${handleCheck(
                            'tsr11_supervisor_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr11_supervisor_verify_at')}
                          </span>
                        </span>
                        {tsr11_supervisor_verify_sign ? (
                          <img
                            src={tsr11_supervisor_verify_sign}
                            alt={`${handleCheck(
                              'tsr11_supervisor_verify_firstName'
                            )} ${handleCheck(
                              'tsr11_supervisor_verify_lastName'
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
                        رئیس مهندسی عمومی :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr11_general_eng_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr11_general_eng_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate(
                              'tsr11_general_eng_boss_verify_at'
                            )}
                          </span>
                        </span>
                        {tsr11_general_eng_boss_verify_sign ? (
                          <img
                            src={tsr11_general_eng_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr11_general_eng_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr11_general_eng_boss_verify_lastName'
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
export default Page11
