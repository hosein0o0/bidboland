import React from 'react'
import Row from '../../../../table/Row'
const TableHorizontal = props => {
  function handleClick (value) {
    props.handleState({ _selected: value })
  }
  function handleClassName (value) {
    const { _selected } = props.state
    const check = _selected === value
    return check && 'active'
  }
  let { header, row } = props.state
  header = header || []
  row = row || []
  return (
    <div className='main-tableHorizontal'>
      <div className='row w-100 mx-0'>
        <button
          className={`filter_botton pointer ${handleClassName(1)}`}
          onClick={() => handleClick(1)}
        >
          لورم ایپسوم
        </button>
        <button
          className={`filter_botton pointer ${handleClassName(2)}`}
          onClick={() => handleClick(2)}
        >
          لورم ایپسوم
        </button>
        <button
          className={`filter_botton pointer ${handleClassName(3)}`}
          onClick={() => handleClick(3)}
        >
          لورم ایپسوم
        </button>
        <button
          className={`filter_botton pointer ${handleClassName(4)}`}
          onClick={() => handleClick(4)}
        >
          لورم ایپسوم
        </button>
      </div>
      <div className='table persian rtl w-100 mt-4'>
        <table>
          <thead>
            <tr className='header'>
              {header.map((data, index) => (
                <th key={index}>
                  <span className='head-click'>{data.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {row.map((data, key) => (
              <tr key={key}>
                <Row
                  _index={key}
                  data={data}
                  row={Object.keys(header).map(_ => {
                    return header[_].value
                  })}
                  header={header}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default TableHorizontal
