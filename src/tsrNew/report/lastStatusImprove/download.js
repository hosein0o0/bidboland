import { Tooltip } from '@material-ui/core'
import DownloadInNewPage from '../../../download'
import { useState } from 'react'
import Loading from '../../../layout/loading'
import GetAppIcon from '@material-ui/icons/GetApp';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';



export const DownloadBtn = ({ improvement_type, office }) => {
  const style = {
    width: 32,
    height: 32,
    zIndex: 2,
    outline: 'none'
  }
  const [loading, setLoading] = useState('')
  const download = async (url, status) => {
    setLoading(status)
    await DownloadInNewPage(`${url}?improvement_type=${improvement_type}&office=${office}`)
    setLoading()
  }
  const className =
    'position-absolute m-2 border-0 p-1 rounded outline-none d-flex align-items-center justify-content-center pointer'
  return (
    <>
      <Tooltip title='دانلود اکسل' arrow className='IranSans_Bold_FA'>
        <button
          className={className}
          style={{ ...style, right: 40 }}
          onClick={() => download('tsrMg/getByImproveExcel', 'excel')}
          disabled={Boolean(loading)}
        >
          {loading === 'excel' ? (
            <Loading />
          ) : (
            <GetAppIcon />
          )}
        </button>
      </Tooltip>

      <Tooltip title='دانلود اکسل جزئیات' arrow className='IranSans_Bold_FA'>
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
            <CloudDownloadIcon />
          )}
        </button>
      </Tooltip>
    </>
  )
}
