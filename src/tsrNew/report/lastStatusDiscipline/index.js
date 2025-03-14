import { useEffect, useMemo, useState } from 'react'
import { BarChart } from '../../../Component/chart/barChart'
import { PieChart } from '../../../Component/chart/pieChart'
import { SituationBox } from '../../../Component/situation/box'
import { BoxChart } from '../boxChart'
import { get } from '../../../api'
import { Switch } from '../switch'

export const LastStatusDiscipline = ({ list }) => {
  const [index, setIndex] = useState()
  const [state, setState] = useState('barChart')

  const [data, setData] = useState()

  useEffect(() => {
    fetchData()
  }, [index])


  const fetchData = async () => {
    if (index) {
      const lastStatus = await get(`tsrMg/getByDiscipline?discipline=${index}`)
      setData(lastStatus)
    }
  }

  const titleElm = useMemo(() => {
    return (
      <>
        آخرین وضعیت TSR در گروه‌کاری مهندسی عمومی{' '}
        <Switch setValue={setIndex} list={list} multi />
      </>
    )
  }, [index, list])

  const dataLastStatus = useMemo(() => {
    if (data) {
      const {
        discipline_checkable,
        discipline_checked,
        discipline_finish,
        discipline_checking,
        discipline_performance,
        discipline_remainder
      } = data
      return [
        {
          value: discipline_checkable,
          label: 'قابل بررسی-وروری',
          color: '#33c9fe'
          , showChart: true
        },
        { value: discipline_checked, label: 'بررسی شده', color: '#5b85d9', showChart: true },
        { value: discipline_finish, label: 'به اتمام رسید', color: '#ffd600' },
        {
          value: discipline_checking,
          label: 'دردست بررسی-درحال انجام',
          color: '#0ee67b'
        },
        {
          value: discipline_performance + '%',
          label: 'درصد عملکرد',
          color: '#405d80'
        },
        {
          value: discipline_remainder + '%',
          label: 'درصد باقی‌مانده',
          color: '#5b85d9'
        }
      ]
    }
    return []
  }, [data])
  const filteredData = useMemo(() => {
    return dataLastStatus.filter(d => d.showChart)
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
          {state === 'barChart' && <BarChart data={filteredData} />}
          {state === 'pieChart' && <PieChart data={filteredData} />}
        </BoxChart>
      </div>
    </div>
  )
}
