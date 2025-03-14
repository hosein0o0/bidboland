import { useEffect, useState } from 'react'
import { GeneralInfo } from './generalInfo'
import { LastStatusForm } from './lastStatusForm'
import { get } from '../../api'
import { LastStatusOffice } from './lastStatusOffice'
import { LastStatusDiscipline } from './lastStatusDiscipline'
export function ContentReport() {
  const [formList, setFormList] = useState([])
  const [officeList, setOfficeList] = useState([])
  const [disciplineList, setDisciplineList] = useState([])
  const [dataInfo, setDataInfo] = useState()
  useEffect(() => {
    fuetchData()
  }, [])
  const fuetchData = async () => {
    const generalInfo = await get('tsrMg/get')

    setFormList(generalInfo?.form_list ?? [])

    setOfficeList(generalInfo?.office_list ?? [])

    setDisciplineList(generalInfo?.discipline_list ?? [])

    setDataInfo(() => generalInfo)
  }
  return (
    <>
      <GeneralInfo data={dataInfo} />
      <hr />
      <LastStatusForm list={formList} />
      <hr />
      <LastStatusOffice list={officeList} />
      <hr />
      <LastStatusDiscipline list={disciplineList} />
    </>
  )
}
