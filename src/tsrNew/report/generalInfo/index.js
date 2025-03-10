import { useMemo, useState } from 'react'
import { SituationBox } from '../../../Component/situation/box'
import { BarChart } from '../../../Component/chart/barChart'
import { BoxChart } from '../boxChart'
import { PieChart } from '../../../Component/chart/pieChart'
export function GeneralInfo({ data }) {
  const [state, setState] = useState('barChart')
  const datanfo = useMemo(() => {
    if (data) {
      const { all_checkable, all_reject, all_checking, all_finish } =
        data
      return [
        { value: all_checkable, label: 'قابل بررسی-وروری', color: '#33c9fe' },
        { value: all_reject, label: 'رد شده', color: '#f03a34' },
        {
          value: all_checking,
          label: 'در دست بررسی-درحال انجام',
          color: '#ffd600'
        },
        { value: all_finish, label: 'به اتمام رسید', color: '#0ee67b' }
      ]
    }
    return []
  }, [data])
  const dataFiltered = useMemo(() => {
    return datanfo.filter(d => d.label !== 'قابل بررسی-وروری')
  }, [datanfo])
  return (
    <div className='w-100 d-flex'>
      <SituationBox title='آخرین وضعیت TSR' data={datanfo} />
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
