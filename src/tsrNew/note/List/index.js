import React, { useEffect, useState } from 'react'
import TableAPI from './API'
import Loading from '../../../layout/loading'
import handleString from '../../../handleString'
import handleCheckText from '../../../handleCheckText'
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded'
const List = props => {
  const [row, setRow] = useState([])
  const [loadTable, setLoadTable] = useState(true)
  const myProps = { loadTable, setLoadTable, row, setRow, ...props }
  const myAPI = new TableAPI(myProps)
  const { fetchData, convertDate, ClickRow } = myAPI
  useEffect(fetchData, [])
  return (
    <div className='fixed-heigh-table'>
      <table className='table-note'>
        <thead>
          <tr className='head-tr'>
            <th>فرستنده</th>
            <th>گیرنده</th>
            <th>تاریخ</th>
            <th>متن</th>
            <th></th>
          </tr>
        </thead>
        {loadTable ?
          <div className='mt-5 w-100 row align-items-center justify-content-center position-absolute r-0 t-0 l-0 b-0'>
            <span className='d-block mt-2'>
              <Loading className='table d-flex justify-content-center align-items-center' />
              در حال بارگزاری اطلاعات
            </span>
          </div>
          :
          <tbody className='w-100'>
            {row.length === 0 ?
              <div className='not-found position-absolute r-0 l-0 b-0 d-flex align-items-center justify-content-center'>
                <span className='m-5'>
                  موردی وجود ندارد
                </span>
              </div>
              :
              row?.map((data, key) => (
                <tr className='w-100 pointer row-data' key={key} onClick={() => ClickRow(data)}>
                  <td className='IranSans_Medium_FA'>{handleString(data.send_from)}</td>
                  <td className='IranSans_Medium_FA'>{handleString(data.recieve_to)}</td>
                  <td className='IranSans_Medium_FA'>{handleCheckText(data?.created_at) ? convertDate(handleString(data.created_at)) : '-'}</td>
                  <td className='IranSans_Medium_FA'>
                    <span className='cut-text IranSans_Medium_FA'>
                      {handleString(data.text)}
                    </span>
                  </td>
                  <td>
                    {data?.attach?.length > 0 && <AttachFileRoundedIcon />}
                  </td>
                </tr>
              ))}
          </tbody>
        }
      </table>
    </div>
  )
}
export default List
