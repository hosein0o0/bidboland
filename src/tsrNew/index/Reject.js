import React, { useEffect, useState, useRef } from "react";
import Loading from "../../layout/loading";
import axios from "axios";
import Notification from "../../notification/notification";
import Message from "../../notification/Message";
import StaticData from '../../staticData'
import handleString from "../../handleString";
const Reject = props => {
    const [load, setLoad] = useState(true)
    const [txt, setTxt] = useState('')
    const { state, handleRefs } = props
    const { reject_id, token } = state
    const myElm = useRef()
    useEffect(() => {
        handleRefs(`_reject_${reject_id}`, myElm?.current)
        fetchData()
    }, [myElm])
    const fetchData = () => {
        const url = `${StaticData.domainIp}/tsr_v1/showRejectReason/${reject_id}`
        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: token ? `Bearer ${token}` : null
            }
        })
            .then(async response => {
                setLoad(false)
                if (response.status === 200) {
                    setTxt(response.data)
                }
                else {
                    Notification.notify(Message.text(response.status), 'error')
                }
            })
            .catch(err => {
                setLoad(false)
                if (err.response) {
                    Notification.notify(Message.text(err.response.status), 'error')
                }
            })
    }
    return (
        <div className="backGroundPopup">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-10 m-auto">
                <div className="box-wellcome" ref={myElm}>
                    {load ?
                        <LoadingBox />
                        :
                        <>
                            <div className="title-wellcome">
                                <h3>دلیل رد شدن TSR {reject_id}</h3>
                            </div>
                            <div className="main-text">
                                <p className="text">
                                    {handleString(txt)}
                                </p>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
const LoadingBox = () => {
    return (
        <div className="row justify-content-center">
            <Loading className='table d-flex justify-content-center' />
            <span className="d-block mt-2">
                در حال بارگزاری اطلاعات
            </span>
        </div>
    )
}
export default Reject