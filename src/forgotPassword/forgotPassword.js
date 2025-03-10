import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
// import axios from 'axios'
import Cookies from 'js-cookie'
// import Notification from '../notification/notification'
// import Message from '../notification/Message'
import NotificationContainer from '../notification/NotificationCotainer'
import GetEmail from './GetEmail'
import EnterCode from './EnterCode'
import EnterNewPassword from './EnterNewPassword'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            token: Cookies.get('token') ? Cookies.get('token') : null,
            Level: 1,
            email: '',
            code: '',
            password: '',
        }
    }
    componentDidMount() {
        document.title = `${StaticData.Title} - رمز عبور خود را فراموش کرده اید`
        this.CheckState()
        document.onkeydown = (event) => {
            if (event.keyCode === 13 && event.key === 'Enter') {
                if ((this.state.userName !== '' && this.state.password !== '') || this.state.disabled) {
                    this.handleSubmit()
                }
            }
        }
    }
    CheckState = () => {
        if (Cookies.get('Level')) {
            this.setState({ Level: parseInt(Cookies.get('Level')) })
        }
        if (Cookies.get('email')) {
            this.setState({ email: Cookies.get('email') })
        }
        if (Cookies.get('code')) {
            this.setState({ code: Cookies.get('code') })
        }
        if (Cookies.get('password')) {
            this.setState({ password: Cookies.get('password') })
        }
    }
    handleState = (name, value) => {
        this.setState({ [name]: value })
        Cookies.set(name, value)
    }
    handleShow = () => {
        if (this.state.Level === 1) {
            return <GetEmail
                handleState={(name, value) => this.handleState(name, value)}
                token={this.state.token}
            />
        } else if (this.state.Level === 2 && this.state.email !== '') {
            return <EnterCode
                email={this.state.email}
                handleState={(name, value) => this.handleState(name, value)}
                token={this.state.token}
            />
        } else if (this.state.Level === 3 && this.state.email !== '' && this.state.code !== '') {
            return <EnterNewPassword
                email={this.state.email}
                handleState={(name, value) => this.handleState(name, value)}
                token={this.state.token}
                code={this.state.code}
            />
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
        else return (
            <div className='main'>
                <NotificationContainer />
                <div className='Login row m-0'>
                    <div className='col-xl-8 col-lg-8 col-md-8 col-12 h-100 p-0 main-box-login'>
                        <div className='main-login'>
                            <div className='col-xl-6 col-lg-8 col-md-10 col-12'>
                                {this.handleShow()}
                            </div>
                        </div>
                        <div className='copy-right-login'>
                            <span>
                                ©تمامی حقوق محفوظ است | سامانه یکپارچه تصمیم ساز مدیریت پروژه دارا - نسخه {StaticData.Name}
                            </span>
                        </div>
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4 col-12 pl-0 pr-0 h-100'>
                        <div className='main-logo-login'>
                            <img className='background-login' src='/img/login-bg.jpg' alt='background-logo' />
                            <div className='logo'>
                                <img src='/img/logo-white.svg' alt='logo' />
                            </div>
                            <div className='product-rev'>
                                <span>شرکت گسترش اندیشه دارا</span>
                                <span>REV.2021DARA01.1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}