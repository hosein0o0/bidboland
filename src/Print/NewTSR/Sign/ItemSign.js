import React from 'react'
import handleString from '../../../handleString'
import moment from 'moment-jalaali'
import handleCheckText from '../../../handleCheckText'
import StaticData from '../../../staticData'
// import CheckDownload from '../../../CheckDownload'
const ItemSign = props => {
  const { dataSend, data } = props
  const {
    date,
    firstName,
    label,
    lastName,
    sign,
    check_sign,
    // array_sign,
    link_name,
    expect
  } = data
  const fullName = `${handleString(dataSend[firstName])} ${handleString(
    dataSend[lastName]
  )}`
  let convertDate = ''
  if (handleCheckText(dataSend[date])) {
    let dataMoment = moment(dataSend[date], 'YYYY-MM-DD hh:mm:ss')
    convertDate = dataMoment.locale('fa').format('HH:mm - jYYYY/jMM/jDD')
  }
  const check = expect || handleCheckText(dataSend[check_sign])
  const handleCheckName = () => {
    let array_result = []
    let base_url = StaticData.link_file
    if (link_name) {
      const list_url = props.dataSend[link_name] || []
      const url = list_url[0] || ''
      const check_url = handleCheckText(url)
      if (check_url) {
        array_result.push(
          <span className='value'>
            <a href={`${base_url}/${url}`}>{fullName}</a>
          </span>
        )
      } else array_result.push(<span className='value'>{fullName}</span>)
    } else {
      array_result.push(<span className='value'>{fullName}</span>)
    }
    return array_result
  }
  return (
    <td className='sign_item bt' key={props._key}>
      <span className='end d-flex px-1 pb_1mm white-space text-center flex-custome'>
        {label} :
      </span>
      <span className='px-1 d-block'>
        <span className='d-block sign-text'>
          نام و نام خانوادگی :{check ? handleCheckName() : ''}
        </span>
        <span className='d-block sign-text'>
          تاریخ :
          {check && <span className='value'>{handleString(convertDate)}</span>}
        </span>
        {check && (
          <img className='image_sign' src={`/${dataSend[sign]}`} alt={fullName} />
        )}
      </span>
    </td>
  )
}
export default ItemSign
