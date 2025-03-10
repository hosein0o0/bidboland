import React from 'react'
import handleCheckText from '../../handleCheckText'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const Page7 = props => {
  function handleCheck (name) {
    let value = props.state[name]
    return handleCheckText(value) ? ` ${value} ` : '-'
  }
  const {
    tsr7_Instrumentation_foreign_attachments,
    tsr7_Instrumentation_internal_attachments,
    tsr7_building_foreign_attachments,
    tsr7_building_internal_attachments,
    tsr7_electrical_foreign_attachments,
    tsr7_electrical_internal_attachments,
    tsr7_mechanical_foreign_attachments,
    tsr7_mechanical_internal_attachments,
    tsr7_leader_verify_sign,
    tsr7_author_sign,
    tsr7_general_eng_head_verify_sign,
    tsr7_technical_service_head_verify_sign,
    tsr7_purchase_packages
  } = props.state
  function handleMerge () {
    let Instrumentation = props.DocumentaArray(
        tsr7_Instrumentation_foreign_attachments,
        tsr7_Instrumentation_internal_attachments
      ),
      building = props.DocumentaArray(
        tsr7_building_foreign_attachments,
        tsr7_building_internal_attachments
      ),
      electrical = props.DocumentaArray(
        tsr7_electrical_foreign_attachments,
        tsr7_electrical_internal_attachments
      ),
      mechanical = props.DocumentaArray(
        tsr7_mechanical_foreign_attachments,
        tsr7_mechanical_internal_attachments
      )
    let merge = Instrumentation.concat(building)
    merge = merge.concat(electrical)
    merge = merge.concat(mechanical)
    return merge
  }
  function PurchasePackages () {
    let list = tsr7_purchase_packages
      ? Object.keys(tsr7_purchase_packages).map(__ => {
          return tsr7_purchase_packages[__]
        })
      : []
    let filter = list.filter(
      data =>
        handleCheckText(data.date) ||
        handleCheckText(data.description) ||
        handleCheckText(data.number)
    )
    return filter
  }
  function handleMultiCheckbox (name) {
    const check1 = check_eng_instruction(name)
    const check2 = check_foreign_attachments(name)
    const check3 = check_internal_attachments(name)
    const finalCheck = check1 || check2 || check3
    return finalCheck
  }
  function check_internal_attachments (name) {
    let data = props.state[`tsr7_${name}_internal_attachments`]
    let check = false,
      i = 0
    if (data) {
      const array = Object.keys(data).map(__ => {
        return data[__]
      })
      if (array) {
        while (i < array.length) {
          let obj = array[i]
          check =
            handleCheckText(obj.degreeTitle) ||
            handleCheckText(obj.descriptionAttachment) ||
            handleCheckText(obj.documentNumber) ||
            handleCheckText(obj.numberPages)
          if (check) {
            break
          }
          i++
        }
      }
    }
    return check
  }
  function check_foreign_attachments (name) {
    let data = props.state[`tsr7_${name}_foreign_attachments`]
    let check = false,
      i = 0
    if (data) {
      const array = Object.keys(data).map(__ => {
        return data[__]
      })
      if (array) {
        while (i < array.length) {
          let obj = array[i]
          check =
            handleCheckText(obj.degreeTitle) ||
            handleCheckText(obj.descriptionAttachment) ||
            handleCheckText(obj.documentNumber) ||
            handleCheckText(obj.numberPages) ||
            obj.Attachement
              ? obj.Attachement.length > 0
              : false
          if (check) {
            break
          }
          i++
        }
      }
    }
    return check
  }
  function check_eng_instruction (name) {
    let data = props.state[`tsr7_${name}_eng_instruction`]
    let check = false,
      i = 0
    if (data) {
      const array = Object.keys(data).map(__ => {
        return data[__]
      })
      while (i < array.length) {
        let obj = array[i]
        check = handleCheckText(obj.description)
        if (check) {
          break
        }
        i++
      }
    }
    return check
  }
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right roteated'>
          <span className='a'>(این صفحه توسط كارشناس TSRتكميل میگردد.)</span>
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
              صفحه هفتم- دستور كار مهندسی
            </div>
            <div className='conti'>
              <table>
                <tbody>
                  <tr className='hsss'>
                    <td className='b' style={{ width: '64mm' }}>
                      شماره /TSRنامه:
                      <span className='value'>
                        {handleCheck('tsr1_tsr_no')}
                      </span>
                    </td>
                    <th
                      style={{ verticalAlign: 'top', width: '70mm' }}
                      rowSpan={2}
                    >
                      به: برنامه ريزي تعميرات
                    </th>
                    <td className='b' style={{ width: '64mm' }}>
                      شماره:
                      <span className='value'>
                        {handleCheck('tsr1_tsr_no')}
                      </span>
                    </td>
                  </tr>
                  <tr className='hsss'>
                    <td className='b' style={{ width: '64mm' }}>
                      نام متقاضی:
                      <span className='value'>
                        {handleCheck('tsr1_author_name')}
                      </span>
                    </td>
                    <td className='b' style={{ width: '64mm' }}>
                      تاريخ:
                      {props.handleDate('tsr1_created_at')}
                    </td>
                  </tr>
                  <tr className='hsss'>
                    <td className='b'>
                      واحد:
                      {handleCheck('tsr1_applicant_unit')}
                    </td>
                    <td colSpan={2}>
                      <span>نوع کار:</span>
                      <span className='mr-1'>
                        <span className='padRight'>مکانیک</span>
                        <span className='_tikbox'>
                          {handleMultiCheckbox('mechanical') ? (
                            <CheckBoxRoundedIcon className='mr-1 ml-1' />
                          ) : (
                            <CheckBoxOutlineBlankRoundedIcon className='mr-1 ml-1' />
                          )}
                        </span>
                      </span>

                      <span className='mr-1'>
                        <span className='padRight'>برق</span>
                        <span className='_tikbox'>
                          {handleMultiCheckbox('electrical') ? (
                            <CheckBoxRoundedIcon className='mr-1 ml-1' />
                          ) : (
                            <CheckBoxOutlineBlankRoundedIcon className='mr-1 ml-1' />
                          )}
                        </span>
                      </span>

                      <span className='mr-1'>
                        <span className='padRight'>ابزار دقیق</span>
                        <span className='_tikbox'>
                          {handleMultiCheckbox('Instrumentation') ? (
                            <CheckBoxRoundedIcon className='mr-1 ml-1' />
                          ) : (
                            <CheckBoxOutlineBlankRoundedIcon className='mr-1 ml-1' />
                          )}
                        </span>
                      </span>

                      <span className='mr-1'>
                        <span className='padRight'>ساختمان</span>
                        <span className='_tikbox'>
                          {handleMultiCheckbox('building') ? (
                            <CheckBoxRoundedIcon className='mr-1 ml-1' />
                          ) : (
                            <CheckBoxOutlineBlankRoundedIcon className='mr-1 ml-1' />
                          )}
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className='hsss'>
                    <td className='p1 b' colSpan={3}>
                      موضوع :
                      <p className='d-inline-block'>
                        {handleCheck('tsr1_subject')}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='conti'>
              <span className='conti_span'>شرح دستورالعمل مهندسی</span>
              <table>
                <tbody>
                  <tr className='hll'>
                    <td className='description'>
                      {props.handleInstructionsOrder().map((data, key) => (
                        <React.Fragment key={key}>
                          {data.list.length > 0 ? (
                            <span className='value'>{data.name}</span>
                          ) : (
                            ''
                          )}
                          {data.list.map((_data, _key) => (
                            <p key={_key}>{_data.description}</p>
                          ))}
                        </React.Fragment>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style={{ marginTop: '4mm' }}>
                <tbody>
                  <tr className='hsss'>
                    <td style={{ width: '20mm' }}>زمان اجرا: </td>
                    <td>
                      {props.handleInstructionsOrder().map((data, key) => (
                        <React.Fragment key={key}>
                          {data.list.length > 0 ? (
                            <span className='mr-1 ml-1'>
                              <span className='mr-1 ml-1 d-inline-block'>{`${data.name} : `}</span>
                              {data.list.map((_data, _key) => (
                                <React.Fragment>
                                  {_data.executionTime ? (
                                    <span className='mr-1 ml-1'>
                                      {_data.executionTime}
                                    </span>
                                  ) : (
                                    <span>ندارد</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </span>
                          ) : (
                            ''
                          )}
                        </React.Fragment>
                      ))}
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
                  {handleMerge().map((data, key) => (
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
            {PurchasePackages().length > 0 ? (
              <div className='conti'>
                <span className='conti_span'>درخواست های خرید</span>
                <table>
                  <tbody>
                    <tr className='hss'>
                      <th style={{ width: '7mm' }}>رديف</th>
                      <th style={{ width: '28mm' }}>شماره تقاضا</th>
                      <th style={{ width: '62mm' }}>خلاصه شرح </th>
                      <th style={{ width: '36mm' }}>تاريخ تامين كالا</th>
                    </tr>
                    {PurchasePackages().map((data, key) => (
                      <tr className='hsss' key={key}>
                        <td className='text-center'>{key + 1}</td>
                        <td className={props.handleClassName(data.number)}>
                          {data.number}
                        </td>
                        <td className={props.handleClassName(data.description)}>
                          {data.description}
                        </td>
                        <td className={props.handleClassName(data.date)}>
                          {data.date}
                        </td>
                      </tr>
                    ))}
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
                        مهندس مسئول :
                      </span>
                      <span className='px-1 d-block'>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          نام و نام خانوادگی :
                          <span className='value'>
                            {handleCheck('tsr7_author_name')}
                          </span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr7_created_at')}
                          </span>
                        </span>
                        {tsr7_author_sign ? (
                          <img
                            src={tsr7_author_sign}
                            alt={handleCheck('tsr7_author_name')}
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
                            'tsr7_leader_verify_firstName'
                          )} ${handleCheck(
                            'tsr7_leader_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate('tsr7_leader_verify_at')}
                          </span>
                        </span>
                        {tsr7_leader_verify_sign ? (
                          <img
                            src={tsr7_leader_verify_sign}
                            alt={`${handleCheck(
                              'tsr7_leader_verify_firstName'
                            )} ${handleCheck('tsr7_leader_verify_lastName')}`}
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
                            'tsr7_general_eng_head_verify_firstName'
                          )} ${handleCheck(
                            'tsr7_general_eng_head_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate(
                              'tsr7_general_eng_head_verify_at'
                            )}
                          </span>
                        </span>
                        {tsr7_general_eng_head_verify_sign ? (
                          <img
                            src={tsr7_general_eng_head_verify_sign}
                            alt={`${handleCheck(
                              'tsr7_general_eng_head_verify_firstName'
                            )} ${handleCheck(
                              'tsr7_general_eng_head_verify_lastName'
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
                            'tsr7_technical_service_head_verify_firstName'
                          )} ${handleCheck(
                            'tsr7_technical_service_head_verify_lastName'
                          )}`}</span>
                        </span>
                        <span
                          className='d-block sign-text'
                          style={{ marginTop: '1mm', marginBottom: '1mm' }}
                        >
                          تاریخ :
                          <span className='value'>
                            {props.handleDate(
                              'tsr7_technical_service_head_verify_at'
                            )}
                          </span>
                        </span>
                        {tsr7_technical_service_head_verify_sign ? (
                          <img
                            src={tsr7_technical_service_head_verify_sign}
                            alt={`${handleCheck(
                              'tsr7_technical_service_head_verify_firstName'
                            )} ${handleCheck(
                              'tsr7_technical_service_head_verify_lastName'
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
export default Page7
