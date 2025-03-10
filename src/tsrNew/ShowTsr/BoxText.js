import React from "react";
import handleCheckText from "../../handleCheckText";
import handleString from "../../handleString";
const BoxText = props => {
    const { txt, id, state, status, API } = props
    const { handlCreate } = API
    const parentState = props.props.state || {}
    const { handleNameDispatch } = props.props.API
    const { dispatch_lastName, dispatch_firstName } = handleNameDispatch()
    const { select } = parentState
    const show1 = select === id
    const show2 = status === 'create' || handlCreate ? handlCreate(id) : false
    const FName = state[dispatch_firstName],
        LName = state[dispatch_lastName]
    const show3 = handleCheckText(FName) ? false : true
    const show4 = handleCheckText(LName) ? false : true
    const show = show1 && show2 && show3 && show4
    if (show) {
        return (
            <div className='col-12 my-2'>
                <div className='message-info'>
                    <p className='m-0'>
                        {handleCheckText(txt) ? handleString(txt) :
                            'فرم توسط رئیس واحد تکمیل و یا دستگردانی (انتخاب کارشناس) می گردد.'
                        }
                    </p>
                </div>
            </div>
        )
    } else return ''
}
export default BoxText