import { useEffect, useMemo, useState } from 'react'
import { SituationBox } from '../../../Component/situation/box'
import { Switch } from '../switch'
import { get } from '../../../api'
import { BoxChart } from '../boxChart'
import { BarChart } from '../../../Component/chart/barChart'
import { PieChart } from '../../../Component/chart/pieChart'
import { DownloadBtn } from './download'

export function LastStatusImprove({ list, officeList }) {
  const [index, setIndex] = useState()
  const [indexOffice, setIndexOffice] = useState()

  const [data, setData] = useState()
  const [state, setState] = useState('barChart')

  useEffect(() => {
    fetchData()
  }, [index])

  const fetchData = async () => {
    if (index) {
      const lastStatus = await get(
        `tsrMg/getByImprove?improvement_type=${index}&office=${indexOffice}`
      )
      setData(lastStatus)
    }
  }

  const titleElm = useMemo(() => {
    return (
      <>
        آخرین وضعیت TSR براساس نوع بهبود{' '}
        <div className='my-2' >
          <span>بهبود:</span>
          <div style={{ marginRight: '-16px' }}>
            <Switch setValue={setIndex} list={list} multi />
          </div>
        </div>
        <div className='my-2'>
          <span>اداره:</span>
          <div style={{ marginRight: '-16px' }}>
            <Switch setValue={setIndexOffice} list={officeList} multi />
          </div>
        </div>
      </>
    )
  }, [index, list])

  const dataLastStatus = useMemo(() => {
    if (data) {
      const { total, sum_improvement, percent_improvement } = data
      return [
        {
          value: total,
          label: 'تعداد TSR',
          color: '#33c9fe'
        },
        { value: sum_improvement, label: 'مجموع بهبودها', color: '#f03a34' },
        { value: percent_improvement, label: 'درصد بهبودها', color: '#ffd600' }
      ]
    }
    return []
  }, [data])
  return (
    <div className='w-100 d-flex'>
      <div style={{ width: 408 }}>
        <SituationBox title={titleElm} data={dataLastStatus} />
      </div>
      <div className='col'>
        <BoxChart
          onClick={() =>
            setState(s => (s === 'barChart' ? 'pieChart' : 'barChart'))
          }
          state={state}
        >
          <DownloadBtn improvement_type={index} office={indexOffice}/>
          {state === 'barChart' && <BarChart data={dataLastStatus} />}
          {state === 'pieChart' && <PieChart data={dataLastStatus} />}
        </BoxChart>
      </div>
    </div>
  )
}
