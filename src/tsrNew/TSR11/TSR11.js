import React, { Component } from "react";
import Form from '../../Form/Form'
import API from "./API";
import handleString from "../../handleString";
import TOCC from '../TOCC'
import Cookies from 'js-cookie'
import ButtonSubmit from "./ButtonSubmit";
import Sign from "../sign/Sign";
import CCDisabled from "../CCDisabled";
import BoxText from "../ShowTsr/BoxText";
import Dispatch from "../Dispatch/Dispatch";
export default class TSR11 extends Component {
    constructor(props) {
        super(props);
        this.API = new API(this)
        this.state = {
            notification_cc: [],
            token: Cookies.get('token'),
        }
    }
    componentDidMount() {
        this.fetchData()
    }
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps
            this.fetchData()
        }
    }
    fetchData = () => {
        const { fetchDataAPI } = this.API
        fetchDataAPI()
    }
    handleListForm = () => {
        const { handleListFormAPI } = this.API
        const result = handleListFormAPI()
        return result
    }
    handleState = obj => {
        this.setState(obj)
    }
    OnFocus = name => {
        this.setState({ foucs: name })
    }
    OnBlur = () => {
        this.setState({ foucs: '' })
    }
    handleChange = e => {
        this.setState({ [e.target.name]: handleString(e.target.value) })
    }
    handleDisabledElm = () => {
        const { handleDisabledAPIElm } = this.API
        const result = handleDisabledAPIElm()
        return result
    }
    handleDisabled = () => {
        const { handleDisabledAPI } = this.API
        let _result = handleDisabledAPI()
        return _result
    }
    render() {
        const { status_copy } = this.state
        const { handlCreate, ShowSign, handleCheckUpdate } = this.API
        const canCreate = handlCreate(11),
            canCreateSubmit = !this.handleDisabledElm() && canCreate,
            // canSign = ShowSign(),
            canUpdate = handleCheckUpdate(11)
        const sign_1 = ShowSign() ? true : false
        const sign_2 = handleCheckUpdate(11) ? false : true
        const sign_3 = canCreateSubmit ? false : true
        const canSign = sign_1 && sign_2 && sign_3
        return (
            <div className='form row justify-content-start'>
                <div className='w-100 row justify-content-start m-0'>
                    <BoxText
                        {...this}
                        id={11}
                        status={status_copy}
                        txt='فرم توسط مسئول درخواست خدمات فنی تکمیل و یا دستگردانی (انتخاب کارشناس) می‌گردد.'
                    />
                    <Dispatch
                        {...this}
                        filter1='user_unit'
                        filter2='مهندسی عمومی و پروژه ها'
                        canCreate={canCreate}
                    />
                    <Form {...this} itemForm={this.handleListForm()} />
                    {canCreateSubmit && <TOCC {...this} />}
                    {canCreateSubmit && <ButtonSubmit {...this} />}
                    {canSign && <Sign {...this} status={status_copy} />}
                    {canUpdate && <ButtonSubmit {...this} update={true} />}
                    <CCDisabled {...this} />
                </div>
            </div>
        )
    }
}