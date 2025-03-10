import React from 'react'
import handleCheckText from '../../../handleCheckText'
import handleString from '../../../handleString'
// import handleCheckText from '../../../handleCheckText'
import ItemAttach from './ItemAttach'
const Attachment = props => {
  let foreign = props.data[props.foreign] || []
  let internal = props.data[props.internal] || []
  const { DocumentaArray } = props.API
  let filter = DocumentaArray(foreign, internal)
  const checkTitle = handleCheckText(props.title)
  let title = handleString(props.title)

  // if (filter.length > 0) {
  // let showHead = props.showHead ? true : false
  // let result = props.multi ? showHead : true
  return (
    <div className='conti'>
      {!props.notitle && (
        <span className={`conti_span ${checkTitle ? 'd-flex' : ''}`}>
          مدارك ضميمه
          {checkTitle && (
            <span className='font-8 padRk mb-0 mt-1 pt-1mm'>({title})</span>
          )}
        </span>
      )}
      <table>
        <tbody>
          {/* {result && (
            )} */}
          <tr className='hss'>
            <th className={props.titleclass || ''} style={{ width: '7mm' }}>
              رديف
            </th>
            <th
              className={props.titleclass || ''}
              style={{ width: '36mm' }}
            >
              شماره سند
            </th>
            <th
              className={props.titleclass || ''}
              style={{ width: '50mm' }}
            >
              عنوان مدارك
            </th>
            <th
              className={`p0 ${props.titleclass || ''}`}
              style={{ width: '12mm', fontSize: '9px' }}
            >
              تعداد صفحات
            </th>
            <th
              className={props.titleclass || ''}
              style={{ width: '30mm' }}
            >
              توضيحات
            </th>
          </tr>
          {filter.map((data, key) => (
            <ItemAttach
              {...props}
              key={key}
              _key={key}
              data={data}
              className={props.className}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
  // } else return ''
}
export default Attachment
