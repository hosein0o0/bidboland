import React from 'react'
import InsertChartIcon from '@material-ui/icons/InsertChart'
function LastSituationBox (props) {
  return (
    <div className='col-xl-3 clol-lg-3 col-md-3 col-sm-6 col-12 pr-1 pl-1'>
      <div className='SituationBox'>
        <div className='title'>
          <h2>
            <InsertChartIcon />
            {props.data.title}
          </h2>
        </div>
        <div className='title-password col-12 mt-3 mb-2'>
          <span className='IranSans_Bold IranSans_Bold_FA'>
            آخرین {props.data.daramad ? 'درآمد' : props.label} روزانه
          </span>
          <div className='line'></div>
        </div>
        <div className='main-detail-SituationBox'>
          <div className='line-detail-SituationBox'>
            <span
              className='first'
              style={{ width: `${props.data.first.program}%` }}
            ></span>
            <span
              className='second'
              style={{ width: `${props.data.first.real}%` }}
            ></span>
            <span
              className='third'
              style={{ width: `${props.data.first.deviation}%` }}
            ></span>
          </div>
          <div className='box-detail'>
            <div className='box-detail-item'>
              <span className='color program'></span>
              <label className='label'>برنامه</label>
              <span className='col border-dot'></span>
              <span className='value'>
                {props.data.first.program}
                {props.unit}
              </span>
            </div>
            <div className='box-detail-item'>
              <span className='color real'></span>
              <label className='label'>واقعی</label>
              <span className='col border-dot'></span>
              <span className='value'>
                {props.data.first.real}
                {props.unit}
              </span>
            </div>
            <div className='box-detail-item'>
              <span className='color deviation'></span>
              <label className='label'>انحراف</label>
              <span className='col border-dot'></span>
              <span className='value'>
                {props.data.first.deviation}
                {props.unit}
              </span>
            </div>
          </div>
        </div>
        <div className='title-password col-12 mt-3 mb-2'>
          <span className='IranSans_Bold IranSans_Bold_FA'>
            آخرین {props.label} تجمعی
          </span>
          <div className='line'></div>
        </div>
        <div className='main-detail-SituationBox'>
          <div className='line-detail-SituationBox'>
            <span
              className='first'
              style={{ width: `${props.data.first.program}${props.unit}` }}
            ></span>
            <span
              className='second'
              style={{ width: `${props.data.first.real}${props.unit}` }}
            ></span>
            <span
              className='third'
              style={{ width: `${props.data.first.deviation}${props.unit}` }}
            ></span>
          </div>
          <div className='box-detail'>
            <div className='box-detail-item'>
              <span className='color program'></span>
              <label className='label'>برنامه</label>
              <span className='col border-dot'></span>
              <span className='value'>
                {props.data.first.program}
                {props.unit}
              </span>
            </div>
            <div className='box-detail-item'>
              <span className='color real'></span>
              <label className='label'>واقعی</label>
              <span className='col border-dot'></span>
              <span className='value'>
                {props.data.first.real}
                {props.unit}
              </span>
            </div>
            <div className='box-detail-item'>
              <span className='color deviation'></span>
              <label className='label'>انحراف</label>
              <span className='col border-dot'></span>
              <span className='value'>
                {props.data.first.deviation}
                {props.unit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LastSituationBox
