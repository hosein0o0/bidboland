import React from 'react'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import TransmissionRegistrationTraining from './TransmissionRegistrationTraining.mp4'
function PopUpVideo(props){
    return (
        <div className='backGroundPopup'>
            <div className='col-xl-8 col-lg-8 col-md-8 col-12 mb-5'>
                <div className='box-wellcome video'>
                    <div className='close' onClick={()=>props.close(false)}>
                    <CloseRoundedIcon />
                    </div>
                    <video controls width="100%">
                        <source src={TransmissionRegistrationTraining} type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    )
}
export default PopUpVideo