import { useEffect, useMemo, useState } from 'react'
import { SituationBox } from '../../../Component/situation/box'
import { Switch } from '../switch'
import { get } from '../../../api'
import { BoxChart } from '../boxChart'
import { BarChart } from '../../../Component/chart/barChart'
import { PieChart } from '../../../Component/chart/pieChart'

export function LastStatusOffice({ list }) {
  const [index, setIndex] = useState()

  const [data, setData] = useState()
  const [state, setState] = useState('barChart')

  useEffect(() => {
    fetchData()
  }, [index])

  const fetchData = async () => {
    if (index) {
      const lastStatus = await get(`tsrMg/getByOffice?office=${index}`)
      setData(lastStatus)
    }
  }

  const titleElm = useMemo(() => {
    return (
      <>
        آخرین وضعیت TSR در اداره <Switch setValue={setIndex} list={list} multi />
      </>
    )
  }, [index, list])

  const dataLastStatus = useMemo(() => {
    if (data) {
      const {
        office_checkable,
        office_reject,
        office_finish,
        office_checking
      } = data
      return [
        {
          value: office_checkable,
          label: 'قابل بررسی-وروری',
          color: '#33c9fe'
        },
        { value: office_reject, label: 'رد شده', color: '#f03a34' },
        { value: office_finish, label: 'به اتمام رسید', color: '#ffd600' },
        {
          value: office_checking,
          label: 'دردست بررسی-درحال انجام',
          color: '#0ee67b'
        }
      ]
    }
    return []
  }, [data])
  const dataFiltered = useMemo(() => {
    return dataLastStatus.filter(d => d.label !== 'قابل بررسی-وروری')
  }, [dataLastStatus])
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
          {state === 'barChart' && <BarChart data={dataFiltered} />}
          {state === 'pieChart' && <PieChart data={dataFiltered} />}
        </BoxChart>
      </div>
    </div>
  )
}
