import React from 'react'
import Attachment from '../Attachment/Attachment'
const MultiAttachment = props => {
  const list = [
    { value: 'process', label: 'مهندسی فرآیند' },
    { value: 'general', label: 'مهندسی عمومی' },
    { value: 'inspection', label: 'بازرسی فنی' },
    { value: 'tech', label: 'خدمات فنی' }
  ]
  function check (data) {
    const { DocumentaArray } = props.API
    let foreign = props.data[`${data.value}_foreign_attachment`] || []
    let internal = props.data[`${data.value}_internal_attachment`] || []
    let list = DocumentaArray(foreign, internal)
    let result = list.length > 0
    return result
  }
  return list.map((data, key) => (
    <div className='conti' key={key}>
      {check(data) && (
        <React.Fragment>
          <span className='b'>{data.label}</span>
          <Attachment
            {...props}
            foreign={`${data.value}_foreign_attachment`}
            internal={`${data.value}_internal_attachment`}
            className='font-8 m-auto'
            titleclass='little-font'
            notitle={true}
            multi={true}
            showHead={key === 0}
          />
        </React.Fragment>
      )}
    </div>
  ))
}
export default MultiAttachment
