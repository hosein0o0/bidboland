import { get } from './api'
import StaticData from './staticData'
export default async function DownloadInNewPage (url) {
  const data = await get(url)
  if (data) window.open(`${StaticData.FrontIp}/downloadFile/${data}`, '_blank')
}
