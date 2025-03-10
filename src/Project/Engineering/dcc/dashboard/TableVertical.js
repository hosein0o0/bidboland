import React from 'react'
const TableVertical = props => {
  const array = [
    {
      header: 'لورم هدر',
      value: [
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم'
      ]
    },
    {
      header: 'لورم هدر',
      value: [
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم'
      ]
    },
    {
      header: 'لورم هدر',
      value: [
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم'
      ]
    },
    {
      header: 'لورم هدر',
      value: [
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم'
      ]
    },
    {
      header: 'لورم هدر',
      value: [
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم'
      ]
    },
    {
      header: 'لورم هدر',
      value: [
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم'
      ]
    },
    {
      header: 'لورم هدر',
      value: [
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم'
      ]
    },
    {
      header: 'لورم هدر',
      value: [
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم'
      ]
    },
    {
      header: 'لورم هدر',
      value: [
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم'
      ]
    },
    {
      header: 'لورم هدر',
      value: [
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم',
        'لورم ایپسوم'
      ]
    }
  ]
  return (
    <div className='main-verticalTable'>
      <table className='verticalTable'>
        {array.map((data, key) => (
          <tr key={key}>
            <th className='IranSans_Medium_FA'>
              {data.header} {key + 1}
            </th>
            {data.value.map((_value, index) => (
              <td key={index} className='IranSans_Medium_FA'>
                {_value} {index + 1}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}
export default TableVertical
