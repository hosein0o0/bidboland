import { Tooltip } from '@material-ui/core'
import DownloadInNewPage from '../../../download'
import { useState } from 'react'
import Loading from '../../../layout/loading'
export const DownloadBtn = () => {
  const style = {
    width: 32,
    height: 32,
    zIndex: 2,
    outline: 'none'
  }
  const [loading, setLoading] = useState('')
  const download = async (url, status) => {
    setLoading(status)
    DownloadInNewPage(url)
    setLoading()
  }
  const className =
    'position-absolute m-2 border-0 p-1 rounded outline-none d-flex align-items-center justify-content-center'
  return (
    <>
      <Tooltip title='دانلود اکسل' arrow>
        <button
          className={className}
          style={{ ...style, right: 40 }}
          onClick={() => download('tsrMg/getByImproveExcel', 'excel')}
          disabled={Boolean(loading)}
        >
          {loading === 'excel' ? (
            <Loading />
          ) : (
            <img src='/img/XLS.svg' alt='xls' />
          )}
        </button>
      </Tooltip>

      <Tooltip title='دانلود اکسل جزئیات' arrow>
        <button
          className={className}
          style={{ ...style, right: 80 }}
          onClick={() =>
            download('tsrMg/getByImproveExcelDetail', 'excelDetail')
          }
        >
          {loading === 'excelDetail' ? (
            <Loading />
          ) : (
            <img src='/img/XLS.svg' alt='xls' />
          )}
        </button>
      </Tooltip>
    </>
  )
}
