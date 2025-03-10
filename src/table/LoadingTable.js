import React from 'react'
import Loading from '../layout/loading'
const LoadingTable = () => {
  return (
    <tr className='loading'>
      <td className='main-loading'>
        <span className='w-100 row m-0 justify-content-center'>
          <Loading className='table row m-0 justify-content-center' />
          <span className='w-100 mt-2'>در حال بارگذاری</span>
        </span>
      </td>
    </tr>
  )
}
export default LoadingTable
