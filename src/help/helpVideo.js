import React from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
function HelpVideo(props){
    return(
        <div className='help' onClick={()=>props.handlePopUpVideo(!props.video)}>
            <div className='poster'>
                <img src='img/login-bg.jpg'/>
                <div className='play-pause'>
                    <PlayArrowIcon className='w-100 h-100' />
                </div>
            </div>
            <div className='detail-help col'>
                <h4 className='title-detail'>آموزش کار با سیستم</h4>
                <span className='duration-help'>8 دقیقه</span>
                <span className='d-flex justify-content-end main-link-help'>
                    <a className='link-help' href='#'>
                        مشاهده فیلم
                        <ArrowBackIosIcon />
                    </a>
                </span>
            </div>
        </div>
    )
}
export default HelpVideo