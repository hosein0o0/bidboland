import React from 'react'
import handleCheckText from '../../handleCheckText'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const Page12 = props => {
  function handleCheck (name) {
    let value = props.state[name]
    return handleCheckText(value) ? ` ${value} ` : '-'
  }
  const {
    tsr12_effective,
    tsr12_author_sign,
    tsr12_unit_boss_verify_sign,
    tsr12_office_boss_verify_sign
  } = props.state
  return (
    <page className='portrate' style={{ height: '293mm' }}>
      <div className='holder'>
        <div className='holder_right roteated'>
          <span className='a'>
            (این صفحه توسط واحد متقاضی، شش ماه پس از صورتجلسه پایان كار، تكميل
            می گردد.)
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
            <div className='b f16 tealc'>صفحه دوازدهم- ارزيابی اثر بخشی</div>
            <div style={{ margin: 0 }} className='conti'>
              <table>
                <tbody>
                  <tr style={{ height: '6.5mm' }} className='hsss'>
                    <td className='b tealc' style={{ width: '40mm' }}>
                      تاريخ صورتجلسه تائيد پايان كار:
                    </td>
                    <td>
                      <span className='value'>
                        {handleCheck('tsr12_minutes_of_the_end_work')}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ margin: 0 }} className='conti'>
              <table>
                <tbody>
                  <tr style={{ height: '6.5mm' }} className='hsss'>
                    <td className='b tealc' style={{ width: '40mm' }}>
                      تاريخ شروع بهره برداري:
                    </td>
                    <td>
                      <span className='value'>
                        {handleCheck('tsr12_operation_start_date')}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>نتيجه بررسی</span>
              <table>
                <tbody>
                  <tr style={{ height: '6.5mm' }} className='hsss'>
                    <td className='b' style={{ width: '40mm' }}>
                      آيا TSRاثر بخش بوده است؟
                      <span style={{ marginRight: '14mm' }}>
                        <span style={{ marginLeft: '2mm' }} className='_tikbox'>
                          {tsr12_effective === '1' ? (
                            <CheckBoxRoundedIcon />
                          ) : (
                            <CheckBoxOutlineBlankRoundedIcon />
                          )}
                        </span>
                        <span style={{ marginLeft: '14mm' }}>بلی</span>
                        <span style={{ marginLeft: '2mm' }} className='_tikbox'>
                          {tsr12_effective === '0' ? (
                            <CheckBoxRoundedIcon />
                          ) : (
                            <CheckBoxOutlineBlankRoundedIcon />
                          )}
                        </span>
                        <span>خیر</span>
                      </span>
                    </td>
                  </tr>
                  <tr style={{ height: '6.5mm' }} className='hsss'>
                    <td className='b'>
                      نوع اثر بخشی :
                      <p className='value'>
                        {handleCheck('tsr12_effective_kind')}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>توضيحات</span>
              <table>
                <tbody>
                  <tr style={{ height: '40mm' }}>
                    <td>
                      <p className='value'>
                        {handleCheck('tsr12_description')}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {tsr12_effective === '0' ? (
              <div className='conti'>
                <span className='conti_span'>
                  راهکار هاي پيشنهادي در صورت اثر بخش نبودن TSR
                </span>
                <table>
                  <tbody>
                    <tr style={{ height: '60mm' }}>
                      <td colSpan={2}>
                        <p className='value'>
                          {handleCheck('tsr12_suggested_ways')}
                        </p>
                      </td>
                    </tr>
                    <tr className='hsss'>
                      <td
                        className='tealc'
                        style={{ width: '40mm', fontSize: '13px' }}
                      >
                        شماره TSRجدید:
                      </td>
                      <td> &nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ''
            )}
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
                            {handleCheck('tsr12_author_name')}
                          </span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr12_created_at')}
                          </span>
                        </span>
                        {tsr12_author_sign ? (
                          <img
                            src={tsr12_author_sign}
                            alt={handleCheck('tsr12_author_name')}
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
                        تائید رئیس واحد :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr12_unit_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr12_unit_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr12_unit_boss_verify_at')}
                          </span>
                        </span>
                        {tsr12_unit_boss_verify_sign ? (
                          <img
                            src={tsr12_unit_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr12_unit_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr12_unit_boss_verify_lastName'
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
                        تائید رئیس اداره/امور :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>{`${handleCheck(
                            'tsr12_office_boss_verify_firstName'
                          )} ${handleCheck(
                            'tsr12_office_boss_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr12_office_boss_verify_at')}
                          </span>
                        </span>
                        {tsr12_office_boss_verify_sign ? (
                          <img
                            src={tsr12_office_boss_verify_sign}
                            alt={`${handleCheck(
                              'tsr12_office_boss_verify_firstName'
                            )} ${handleCheck(
                              'tsr12_office_boss_verify_lastName'
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
            {/* <div className='conti'>
              <table className='end'>
                <tbody>
                  <tr className='hsss'>
                    <th>بررسی كننده</th>
                    <th>تایيد رئیس واحد</th>
                    <th>تایيد رئیس اداره / امور</th>
                  </tr>
                  <tr className='hsss'>
                    <td>نام و نام خانوادگی:</td>
                    <td>نام و نام خانوادگی:</td>
                    <td>نام و نام خانوادگی:</td>
                  </tr>
                  <tr className='hsss'>
                    <td>تاریخ:</td>
                    <td>تاریخ:</td>
                    <td>تاریخ:</td>
                  </tr>
                  <tr className='hl _sign'>
                    <td style={{ verticalAlign: 'top' }}>امضاء</td>
                    <td style={{ verticalAlign: 'top' }}>امضاء</td>
                    <td style={{ verticalAlign: 'top' }}>امضاء</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
        </div>
      </div>
    </page>
  )
}
export default Page12
