import React from 'react'
import LoadingTable from './LoadingTable'
import NotFoundTable from './notFound'
import ItemBody from './ItemBody'
const BodyTable = props => {
  let { loading, row } = props.state
  row = row || []
  function handleShow () {
    if (loading === 'table') {
      return <LoadingTable />
    } else if (row.length === 0) {
      return <NotFoundTable />
    } else
      return row.map((data, key) => (
        <React.Fragment key={key}>
          <ItemBody data={data} _key={key} {...props} />
          {/* {props.action && props.action()} */}
        </React.Fragment>
      ))
  }
  return <tbody>{handleShow()}</tbody>
}
export default BodyTable