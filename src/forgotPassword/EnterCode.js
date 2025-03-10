import React, { useState } from 'react'
import Loading from '../layout/loading'
import OtpInput from 'react-otp-input';
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
function GetEmail(props) {
    const [Code, setCode] = useState('')
    const [Disabled, setDisabled] = useState(false)
    const [loading, setloading] = useState(false)
    function handleSubmit() {
        if (Code !== '') {
            setDisabled(true)
            setloading(true)
            let datareg = new FormData()
            datareg.append('email', props.email)
            datareg.append('code', Code)
            axios({
                method: 'post',
                url: `${StaticData.domainIp}/checkForgetCode`,
                data: datareg,
                config: {
                    headers: {
                        'Authorization': `Bearer ${props.token ? props.token : null}`
                    },
                    "processData": false,
                    "contentType": "application/json",
                    "mimeType": "multipart/form-data"
                }
            })
                .then((response) => {
                    setDisabled(false)
                    setloading(false)
                    if (response.status === 200) {
                        props.handleState('code', Code)
                        props.handleState('Level', 3)
                    } else {
                        setDisabled(false)
                        setloading(false)
                        if (response.status === 320) {
                            Notification.notify(Message.text(916), 'error');
                        } else if (response.status === 214) {
                            Notification.notify(Message.text(917), 'error');
                        } else {
                            Notification.notify(Message.text(response.status), 'error');
                        }
                    }
                })
                .catch((err) => {
                    setDisabled(false)
                    setloading(false)
                    if (err.response) {
                        if (err.response.status === 320) {
                            Notification.notify(Message.text(916), 'error');
                        } else if (err.response.status === 214) {
                            Notification.notify(Message.text(917), 'error');
                        } else {
                            Notification.notify(Message.text(err.response.status), 'error');
                        }
                    }
                })
        }else {
            Notification.notify(Message.text(99), 'error');
        }
    }
    return (
        <div className='box-login'>
            <div className='title-login'>
                <h3 className='IranSans_Bold'>لطفا کد ارسالی را وارد نمایید</h3>
            </div>
            <div className='form-login'>
                <div className='field-form'>
                    <label>کد</label>
                    <div className='otp ltr'>
                        <OtpInput
                            value={Code}
                            onChange={(otp) => setCode(otp)}
                            numInputs={6}
                            separator={<span> - </span>}
                        />
                    </div>
                </div>
                <div className='submit-form'>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        tabIndex={3}
                        disabled={Disabled}
                    >
                        ثبت اطلاعات
                        {loading ?
                            <Loading />
                            : ''}
                    </button>
                </div>
            </div>
        </div>
    )
} export default GetEmail