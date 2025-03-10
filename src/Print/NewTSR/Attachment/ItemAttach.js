import React from 'react'
import handleString from '../../../handleString'
// import CheckDownload from '../../../CheckDownload'

const ItemAttach = props => {
  // const class_name=(txt)=>CheckDownload(txt) ? 'rtl' : 'ltr'
  const { handleClassName, DocumnentShow } = props.API
  return (
    <tr className='hsss' key={props._key}>
      <td className='text-center' style={{ width: '7mm' }}>
        {props._key + 1}
      </td>
      <td
        className={handleClassName(props.data.documentNumber)}
        style={{ width: '36mm' }}
      >
        {props.className ? (
          <span className={props.className}>
            {handleString(props.data.documentNumber)}
          </span>
        ) : (
          handleString(props.data.documentNumber)
        )}
      </td>
      <td
        className={handleClassName(props.data.degreeTitle)}
        style={{ width: '50mm' }}
      >
        {props.className ? (
          <span className={props.className}>{DocumnentShow(props.data)}</span>
        ) : (
          DocumnentShow(props.data)
        )}
      </td>
      <td
        className={handleClassName(props.data.numberPages)}
        style={{ width: '12mm', fontSize: '9px' }}
      >
        {handleString(props.data.numberPages)}
      </td>
      <td
        className={handleClassName(props.data.descriptionAttachment)}
        style={{ width: '30mm' }}
      >
        {props.className ? (
          <span className={props.className}>
            {handleString(props.data.descriptionAttachment)}
          </span>
        ) : (
          handleString(props.data.descriptionAttachment)
        )}
      </td>
    </tr>
  )
}
export default ItemAttach
