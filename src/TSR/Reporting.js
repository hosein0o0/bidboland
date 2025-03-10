import React, { useState, useEffect } from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ReportingItem from './ReportingItem'
const Reporting = props => {
  const [itemReport, setItemReport] = useState([])
  useEffect(() => {
    if (props.state.itemReport) {
      setItemReport(props.state.itemReport)
    }
  }, [props])
  return (
    <div className='box-report'>
      <div className='main-item-report'>
        {itemReport.map((data, key) => (
          <div
            className={`item-report pointer ${
              key === props.state._select_ ? 'active' : ''
            }`}
            key={key}
            onClick={() => props.handleState('_select_', key)}
          >
            <span>{data.name}</span>
            <ChevronLeftIcon />
            {key === props.state._select_ && <ReportingItem {...props} _key={key}/>}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Reporting
