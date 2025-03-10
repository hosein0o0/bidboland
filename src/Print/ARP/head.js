import React from 'react'
const Head = props => {
  function handleWidth () {
    const width = props.discipline ? '32.5' : '42.5'
    return `${width}mm`
  }
  return (
    <React.Fragment>
      <table>
        <thead>
          <tr className='hs'>
            <th className='p1' style={{ width: '50mm' }} rowSpan={2}>
              <img className='_logo' src={props.logo} alt='' />
            </th>
            <th style={{ width: '82mm', fontSize: '16px' }} rowSpan={2}>
              فرم {props.label}
            </th>
            <td className='tealc f16 b' style={{ width: '54mm' }}>
              شماره مدرک: <br />
              <span className='value' id='number'>
                {props.certificate_number}
              </span>
            </td>
          </tr>
          <tr className='hm'>
            <td className='nob f16'>
              شماره :
              <span className='value' id='arp_no'>
                {props.handleCheck('arp_no')}
              </span>
              <br style={{ marginTop: '2mm' }} />
              تاریخ :
              <span className='value' id='created_at'>
                {props.handleDate('created_at')}
              </span>
              <br style={{ marginTop: '2mm' }} />
              پیوست :
              <span className='value' id='peyvast'>
                {props.peyvast ? ' دارد ' : ' ندارد '}
              </span>
            </td>
          </tr>
        </thead>
      </table>
      <div style={{ marginTop: '4mm' }}>
        <table>
          <tbody>
            <tr className='hss'>
              <td style={{ width: handleWidth() }}>
                ناحیه :
                <span className='value' id='area'>
                  {` ${props.handleCheck('area')} `}
                </span>
              </td>
              <td style={{ width: handleWidth() }}>
                واحد :
                <span className='value' id='unit'>
                  {` ${props.handleCheck('unit')} `}
                </span>
              </td>
              <td
                style={{
                  width: handleWidth(),
                  direction: 'ltr',
                  textAlign: 'right'
                }}
              >
                <span className='value' id='tag_number'>
                  {` ${props.handleCheck('tag_number')} `}
                </span>
                : Tag No
              </td>
              {props.discipline ? (
                <td
                  style={{
                    width: handleWidth(),
                    textAlign: 'right'
                  }}
                >
                  discipline :
                  <span className='value' id='discipline'>
                    {` ${props.handleCheck('discipline')} `}
                  </span>
                </td>
              ) : (
                ''
              )}
              <td style={{ width: props.discipline ? '40mm' : '42.5mm' }}>
                تاریخ و ساعت حادثه :
                <span className='value' id='event_date' seconddata='event_hour'>
                  {` ${props.handleCheck('event_hour')} - ${props.handleCheck(
                    'event_date'
                  )} `}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}
export default Head
