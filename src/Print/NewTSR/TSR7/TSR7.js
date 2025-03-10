import React from 'react'
import ShowItems from './ShowItems'
import ListTab from '../../../tsrNew/TSR7/ListTab'
import handleCheckText from '../../../handleCheckText'
const TSR7 = props => {
  const tab_array = ListTab.List || []
  let dataState = props.state.tsr7 || {}
  const { handlecheShow7 } = props.API
  const filter = handlecheShow7() || []
  function CheckList(key) {
    let list = tab_array.filter(item => {
      let text = dataState[`${item.value}_instruction`]
      let dispatch_name = `${item.value}_is_dispatch`
      const check_dispatch = dataState[dispatch_name] === '1'
      const state1 = key === 0
      const state2 = handleCheckText(text) || check_dispatch
      let check = state2 ? state2 : state1
      return check
    })
    return list || []
  }
  return filter.map(
    (data, key) =>
      <ShowItems
        key={key}
        numTab={data.numTab}
        {...props}
        name={data.label}
        value={data.value}
        dataState={dataState}
        listChecked={CheckList(key)}
      />
  )
}
export default TSR7
