import { useEffect, useMemo, useState } from 'react'
import { SituationBox } from '../../../Component/situation/box'
import { Switch } from '../switch'
import { get } from '../../../api'
import { BoxChart } from '../boxChart'
import { BarChart } from '../../../Component/chart/barChart'
import { PieChart } from '../../../Component/chart/pieChart'

export function LastStatusForm({ list }) {
  const [index, setIndex] = useState()
  const [state, setState] = useState('barChart')

  const [data, setData] = useState()

  useEffect(() => {
    fetchData()
  }, [index])

  const fetchData = async () => {
    if(index){
      const lastStatus = await get(`tsrMg/getByForm?form=${index}`)
      setData(lastStatus)
    }
  }

  const titleElm = useMemo(() => {
    return (
      <>
        آخرین وضعیت TSR در <Switch setValue={setIndex} list={list}/>
      </>
    )
  }, [index, list])

  const dataLastStatus = useMemo(() => {
    if (data) {
      const {
        form_checkable,
        form_reject,
        form_checking,
        form_accept,
        form_performance,
        form_remainder
      } = data
      return [
        { value: form_checkable, label: 'قابل بررسی-وروری', color: '#33c9fe' },
        { value: form_reject, label: 'رد شده', color: '#f03a34' },
        {
          value: form_checking,
          label: 'در دست بررسی-درحال انجام',
          color: '#ffd600'
        },
        { value: form_accept, label: 'تایید شده', color: '#0ee67b' },
        {
          value: form_performance + '%',
          label: 'درصد عملکرد',
          color: '#405d80'
        },
        {
          value: form_remainder + '%',
          label: 'درصد باقی‌مانده',
          color: '#5b85d9'
        }
      ]
    }
    return []
  }, [data])
  const filteredData = useMemo(
    () =>
      dataLastStatus.filter(
        d => d.label !== 'درصد باقی‌مانده' && d.label !== 'درصد عملکرد' && d.label !== 'قابل بررسی-وروری'
      ),
    [dataLastStatus]
  )
  return (
    <div className='w-100 d-flex'>
      <div style={{width : 408}}>
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
