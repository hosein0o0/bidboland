import InsertChartIcon from '@material-ui/icons/InsertChart'
export const SituationBox = ({ title, data }) => {
  return (
    <div className='SituationBox'>
      <div className='title'>
        <h2>
          <InsertChartIcon />
          {title}
        </h2>
      </div>
      <div className='main-detail-SituationBox'>
        <div className='box-detail'>
          {data?.map((item, index) => (
            <div className='box-detail-item' key={index}>
              <span
                className='color'
                style={{ backgroundColor: item.color }}
              ></span>
              <label className='label'>{item.label}</label>
              <span className='col border-dot'></span>
              <span className='value'>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
