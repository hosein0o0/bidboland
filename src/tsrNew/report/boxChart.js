import PieChartOutlinedIcon from '@material-ui/icons/PieChartOutlined'
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined'
export const BoxChart = ({ children, onClick, state }) => {
  return (
    <div className='BoxChart position-relative'>
      <button
        className='position-absolute m-2 border-0 p-1 rounded outline-none'
        style={{ width: 32, height: 32, zIndex: 2 , outline : 'none'}}
        onClick={onClick}
      >
        {state === 'pieChart' && <PieChartOutlinedIcon />}
        {state === 'barChart' && <InsertChartOutlinedIcon />}
      </button>
      {children}
    </div>
  )
}
