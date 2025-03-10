import React from 'react'
const Sign = props => {
  const detail = props.state[props.detail] ? props.state[props.detail] : {}
  const checkVerify =
    props.state[props.checksign] === '1' ||
    (props.checksign === 'author' && props.checkAuthor)
  return (
    <td
      className='sign bt'
      style={{ verticalAlign: 'top', paddingTop: '2mm' }}
      name='author'
    >
      <span className='end d-flex px-1' style={{ paddingBottom: '1mm' }}>
        {props.label}
      </span>
      <span className='px-1 d-block'>
        <span
          className='d-block sign-text'
          style={{ marginTop: '1mm', marginBottom: '1mm' }}
        >
          نام و نام خانوادگی :
          <span className='value'>
            {checkVerify ? ` ${detail.first_name} ${detail.last_name} ` : ''}
          </span>
        </span>
        <span
          className='d-block sign-text'
          style={{ marginBottom: '1mm', marginBottom: '1mm' }}
        >
          تاریخ :
          <span className='value'>
            {checkVerify ? props.handleDate(props.date) : ''}
          </span>
        </span>
        {detail.sign && checkVerify ? (
          <img
            alt={`${detail.first_name} ${detail.last_name}`}
            src={`/${detail.sign}`}
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
  )
}
export default Sign
