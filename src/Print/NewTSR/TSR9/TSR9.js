import React from 'react'
import handleCheckText from '../../../handleCheckText'
import StaticList from '../../../tsrNew/TSR9/StaticList'
import Page9 from './Page9'
const TSR9 = props => {
  const listTab = StaticList.listTab || []
  function handleCheckShow(data) {
    const { value } = data
    const contractor_name = `${value}_contractor_verify_by`
    let contractor = props.data[contractor_name]
    const instruction_name = `${value}_instruction`
    const instruction = props.data[instruction_name] || []
    const state1 = handleCheckText(contractor)
    const dispatch_name = `${value}_is_dispatch`
    const dispatch = props.data[dispatch_name]
    const state2 = dispatch === '1'
    let state3 = instruction.length > 0
    const finalState = state1 || state2 || state3
    return finalState
  }
  const filter1 = listTab.filter(data => handleCheckShow(data))
  const filter2 = listTab.filter((data, key) => data && key === 0)
  const filter = filter1.length > 0 ? filter1 : filter2
  return filter.map(
    (data, key) =>
      <Page9
        key={key}
        numTab={`${data.tab}`}
        {...props}
        name={data.label}
        value={data.value}
      />
  )
}
export default TSR9
