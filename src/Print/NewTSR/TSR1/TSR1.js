import React from 'react'
import Header from '../Header/Header'
import handleString from '../../../handleString'
import Attachment from '../Attachment/Attachment'
import ImprovementType from './ImprovementType'
import Sign from '../Sign/Sign'
const TSR1 = props => {
  let {
    applicant_unit,
    area,
    operation_unit,
    machine_no,
    technical_problem_description,
    execution_cause,
    corrective_suggest
  } = props.data
  return (
    <page className='portrate'>
      <div className='holder'>
        <div className='holder_right position-relative flex-custome'>
          <div className='rotate flex-custome'>
            <span className='rotate-180 ltr'>.این صفحه توسط متقاضی تكميل میگردد</span>
          </div>
        </div>
        <div className='holder_left'>
          <Header {...props} />
          <div className='___mainSign'>
            <p className='b f16 tealc'>صفحه اول - صدور درخواست توسط متقاضی</p>
            <div className='conti'>
              <span className='conti_span'>مشخصات درخواست</span>
              <table>
                <tbody>
                  <tr style={{ height: '6.5mm' }} className='hsss'>
                    <td className='tealc' style={{ width: '40mm' }}>
                      واحد درخواست كننده :
                    </td>
                    <td style={{ width: '60mm' }}>
                      {handleString(applicant_unit)}
                    </td>
                    <td className='tealc' style={{ width: '30mm' }}>
                      ناحيه (Unit):
                    </td>
                    <td style={{ width: '70mm' }}>{handleString(area)}</td>
                  </tr>
                  <tr style={{ height: '6.5mm' }} className='hsss'>
                    <td className='tealc'>واحد عملياتی :</td>
                    <td>{handleString(operation_unit)}</td>
                    <td className='tealc'>شماره دستگاه:</td>
                    <td>{handleString(machine_no)}</td>
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
                      <p>{handleString(technical_problem_description)}</p>
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
                      <p>{handleString(execution_cause)}</p>
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
                    <td>{handleString(corrective_suggest)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Attachment
              {...props}
              foreign='foreign_attachments'
              internal='internal_attachments'
            />
            <ImprovementType {...props} />
            <Sign {...props} id={1} />
          </div>
        </div>
      </div>
    </page>
  )
}
export default TSR1
