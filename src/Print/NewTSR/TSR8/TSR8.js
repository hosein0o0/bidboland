import React from 'react'
import ListTab from '../../../tsrNew/TSR8/ListTab'
import Page8 from './Page8'
const TSR8 = props => {
  const { handleCheckShow8 } = props.API
  const list = ListTab.List || []
  const filter = handleCheckShow8(list || [])
  return filter.map((data, key) => <Page8 {...props} dataSend={data} key={key} numTab={data.numTab} />)
}
export default TSR8
